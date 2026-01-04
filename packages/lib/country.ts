export type Country = {
    country: string,
    countryCode: string,
    nationality: string
}

type SupportedCountries = "australia" | "england" | "sri_lanka" | "japan" | "india"

const countryMap: Record<SupportedCountries, Country> = {
    australia: {
        country: "Australia",
        countryCode: "AU",
        nationality: "Australian"
    },
    england: {
        country: "England",
        countryCode: "GB",
        nationality: "English"
    },
    sri_lanka: {
        country: "Sri Lanka",
        countryCode: "SL",
        nationality: "Sri Lankan"
    },
    japan: {
        country: "Japan",
        countryCode: "JP",
        nationality: "Japanese"
    },
    india: {
        country: "India",
        countryCode: "IN",
        nationality: "Indian"
    }
}

function isSupportedCountry(
    value: string
): value is SupportedCountries {
    return value in countryMap
}

export function getCountryDataFromCountryString(
    country: string
): Country {
    const key = country
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")

    if (!isSupportedCountry(key)) {
        throw new Error(`Unsupported country: ${country}`)
    }
    
    return countryMap[key]
}