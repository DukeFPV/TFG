export interface Step {
  id: number
  text: string
  image?: string
}

const stepsSergas: Step[] = [
  {
    id: 1,
    text: `**Paso 1** Debes seguir estos pasos:\n\n1. Ve al sitio web: [https://sergas.es](https://sergas.es)\n2. Haz clic en el botón 'Cita atención primaria' como se muestra en la imagen siguiente.\n\nCuando termines, escribe 'siguiente' para seguir.`,
    image: "medico-paso-1.png",
  },
  {
    id: 2,
    text: "**Paso 2** Ahora, selecciona el idioma que quieres para los siguientes pasos y haz clic en continuar:\n\nPara continuar, puedes escribir 'siguiente' para continuar.",
    image: "medico-paso-2.png",
  },
  {
    id: 3,
    text: "**Paso 3** En este paso te pregunta un teléfono al que los profesionales sanitarios pueden llamar si la consulta que necesitas es telefónica:\n\nDespués de esto, haz clic en 'Continuar' para avanzar al siguiente paso.",
    image: "medico-paso-3.png",
  },
  {
    id: 4,
    text: "**Paso 4** Ahora te pregunta si quieres añadir al calendario de Google la cita, como recordatorio. No pasa nada si no sabes lo que hace esto, simplemente haz clic en 'Continuar':\n\nCuando termines, escribe 'siguiente' para seguir.",
    image: "medico-paso-4.png",
  },
  {
    id: 5,
    text: "**Paso 5** Al igual que el paso anterior, si no sabes cómo funcionan los recordatorios por correo electrónico, selecciona la primera opción para que no te envíen el correo y pincha en 'Continuar':\n\nCuando termines, escribe 'siguiente' para seguir.",
    image: "medico-paso-5.png",
  },
  {
    id: 6,
    text: "**Paso 6** Este paso sirve si el dispositivo electrónico desde donde estás haciendo los pasos los vas a utilizar para pedir citas en el futuro. Con esto consigues no tener que repetir los pasos desde el principio.\n\nSelecciona 'Sí, recordar todos los pacientes' si vas a utilizar este dispositivo. Si no sabes con certeza qué es lo que te pide, selecciona 'No, nunca recordar...' y haz clic en 'Continuar':\n\nCuando avances, escribe 'siguiente' para seguir.",
    image: "medico-paso-6.png",
  },
  {
    id: 7,
    text: "**Paso 7** Este paso es donde te pide que te identifiques de varias formas: la primera es que selecciones la tarjeta que sea como la que posees, las otras formas de identificación (certificado digital, É-Saúde, Otradocumentación) solo se deben elegir si posees estos datos o formas de identificarte.\n\nLo normal es elegir entre una de las dos tarjetas que se usan en el SERGAS:\n\nSelecciona la tarjeta que tengas y escribe 'siguiente' para continuar.",
    image: "medico-paso-7.png",
  },
  {
    id: 8,
    text: "**Paso 8** En este paso debes introducir los datos de la tarjeta sanitaria que posees, fíjate en los datos que te piden de identificador y los dígitos de la parte inferior:\n\nCuando completes los datos escribe 'siguiente' para seguir.",
    image: "medico-paso-8.png",
  },
  {
    id: 9,
    text: "**Paso 9** Ya estamos listos para pedir una cita, pincha sobre 'Solicitud de cita':\n\nDe nuevo, cuando termines, escribe 'siguiente' para seguir.",
    image: "medico-paso-9.png",
  },
  {
    id: 10,
    text: "**Paso 10** En este paso de la solicitud debes indicar en qué servicio necesitas la cita. Como puedes ver, hay diferentes opciones para elegir, pero nos vamos a centrar en la primera opción, que es la de 'Medicina de familia' o lo que es lo mismo, el médico de cabecera. Hacemos clic sobre ese apartado:\n\nEscribe 'siguiente' para seguir.",
    image: "medico-paso-10.png",
  },
  {
    id: 11,
    text: "**Paso 11** Ya estamos pidiendo una cita, ahora nos pregunta qué necesitamos del médico de cabecera: consulta, recetas o la IT, que es la incapacidad temporal para personas trabajadoras:\n\nLo más común es consulta de alguna dolencia o para solicitar recetas. Pincha sobre la que necesites y a continuación escribe 'siguiente' para seguir.",
    image: "medico-paso-11.png",
  },
  {
    id: 12,
    text: "**Paso 12** En este paso nos sale un calendario con los días disponibles para solicitar la cita:\n\nPincha sobre el día que mejor te convenga, escribe 'siguiente' para seguir.",
    image: "medico-paso-12.png",
  },
  {
    id: 13,
    text: "**Paso 13** Continuamos eligiendo la hora que mejor nos convenga, también nos indica qué profesional nos va a atender ese día:\n\nPincha sobre la hora que necesites y escribe 'siguiente' para continuar.",
    image: "medico-paso-13.png",
  },
  {
    id: 14,
    text: "**Paso 14** Este último paso nos permite ver un resumen de lo que estamos solicitando: Paciente, tipo de cita, fecha, hora, profesional que ese día nos va a atender, el centro de salud donde se presta el servicio. Podemos elegir si queremos cita presencial o por teléfono. Por ejemplo, para renovar recetas, posiblemente con una cita telefónica sea suficiente. El último apartado nos permite introducir el teléfono por si es diferente al que pusimos en el paso 3:\n\nSelecciona el tipo de cita que mejor te venga y pincha sobre 'Confirmar cita'.",
    image: "medico-paso-14.png",
  },
  {
    id: 15,
    text: "**Paso 15** ¡Conseguido! Esta pantalla es un resumen de tu cita: tipo de servicio, fecha y hora, profesional que te atenderá, el centro de salud, con el teléfono del centro de salud por si necesitas hacer alguna gestión sobre la cita o aclarar alguna duda:\n\nHaz clic en 'Aceptar' para salir de esta pantalla.",
    image: "medico-paso-15.png",
  },
  {
    id: 16,
    text: "**Final 🤩🥇** ¡Listo! Has completado el proceso para pedir una cita médica. En la pantalla principal, si pinchas sobre citas pendientes podrás ver las próximas citas que tienes. Si necesitas más ayuda, no dudes en preguntar:\n\nRecuerda que con mis indicaciones se puede cometer algún error. En caso necesario, no dudes en ponerte en contacto con tu centro de salud.",
    image: "medico-paso-16.png",
  },
]

export default stepsSergas
