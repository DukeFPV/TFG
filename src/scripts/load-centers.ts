import { db } from "@/lib/db"
import { healthCenters } from "@/lib/db/schema"
import * as fs from "fs"
import * as path from "path"
import { parse } from "csv-parse"

async function loadHealthCenters() {
  const csvPath = path.join(
    process.cwd(),
    "src/data/20241220_Centros_de_Atencion_Primaria.csv",
  )

  const parser = fs.createReadStream(csvPath).pipe(
    parse({
      delimiter: ",",
      columns: true,
      skip_empty_lines: true,
      quote: '"',
      escape: "\\",
      relax_quotes: true,
      relax_column_count: true,
      trim: true,
      on_record: (record) => {
        if (record.Nombre) {
          record.Nombre = record.Nombre.replace(/["]+/g, "").trim()
        }
        return record
      },
    }),
  )

  for await (const record of parser) {
    try {
      await db.insert(healthCenters).values({
        name: record.Nombre,
        region: record["Comunidad Autónoma"],
        province: record.Provincia,
        municipality: record.Municipio,
        locality: record.Localidad,
        address: record.Direccion,
        postalCode: record["Código Postal"],
        phone: record.Telefono,
        healthZone: record["Zona Básica"],
        healthArea: record["Área de Salud"],
        managementType: record["Modalidad Gestión"],
        managementDependency: record["Dependencia de Gestión"],
        centerType: record["Tipo de Centro"],
        teachingAccreditation: record["Acreditación Docente"] === "SI",
      })
    } catch (error) {
      console.error(`Error inserting record: ${record.Nombre}`, error)
    }
  }
}

loadHealthCenters()
  .then(() => console.log("Health centers loaded successfully"))
  .catch(console.error)
