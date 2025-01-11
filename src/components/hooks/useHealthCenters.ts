import useSWR from "swr"
import { useMemo } from "react"

interface HealthCenter {
  id?: number // Añade el id si es necesario
  address: string
  municipality: string
  postalCode: string
  phone?: string
  name?: string
  province?: string
}

interface GroupedData {
  municipalities: Set<string>
  addresses: Set<string>
  postalCodes: Set<string>
  phones: Set<string>
  centers: HealthCenter[]
  getFilteredPhones: (filters: {
    province?: string
    municipality?: string
    address?: string
    postalCode?: string
  }) => { id: string; phone: string }[]
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Failed to fetch health centers")
  return res.json()
}

export function useHealthCenters() {
  const { data, error, isLoading } = useSWR("/api/health-centers", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const groupedData = useMemo<GroupedData | null>(() => {
    if (!data?.results) return null

    const result = {
      municipalities: new Set<string>(),
      addresses: new Set<string>(),
      postalCodes: new Set<string>(),
      phones: new Set<string>(),
      centers: [] as HealthCenter[],
      getFilteredPhones: (filters: {
        province?: string
        municipality?: string
        address?: string
        postalCode?: string
      }) => {
        return result.centers
          .filter((c: HealthCenter) => {
            if (!c.phone) return false

            const matchesProvince =
              !filters.province || c.province === filters.province
            const matchesMunicipality =
              !filters.municipality || c.municipality === filters.municipality
            const matchesAddress =
              !filters.address || c.address === filters.address
            const matchesPostalCode =
              !filters.postalCode || c.postalCode === filters.postalCode

            return (
              matchesProvince &&
              matchesMunicipality &&
              matchesAddress &&
              matchesPostalCode
            )
          })
          .map((c: HealthCenter) => ({
            id: `${c.province}-${c.municipality}-${c.address}-${c.phone}`,
            phone: c.phone || "",
            center: c,
          }))
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.phone === item.phone),
          )
      },
    }

    // Process centers and ensure unique entries
    const processedCenters = new Map<string, HealthCenter>()

    data.results.forEach((center: HealthCenter) => {
      const key = `${center.province}-${center.municipality}-${center.address}-${center.phone}`
      if (!processedCenters.has(key)) {
        result.municipalities.add(center.municipality)
        result.addresses.add(center.address)
        result.postalCodes.add(center.postalCode)
        if (center.phone) result.phones.add(center.phone)
        processedCenters.set(key, center)
      }
    })

    result.centers = Array.from(processedCenters.values())
    return result
  }, [data])

  return {
    groupedData,
    isLoading,
    error,
  }
}
