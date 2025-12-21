interface NameObject {
    firstName: {
        legal: string,
        preferred?: string | null
    },
    middleName?: string | null,
    lastName: string
}

export function getShortName(
    name: NameObject
): string {
    const initial = (value?: string | null) => value?.charAt(0) ?? ""
    
    return `${initial(name.firstName.legal)}${initial(name.middleName)} ${name.lastName}`
}