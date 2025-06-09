export function getStoragesStartWith(prefix: string) {
    return Object.entries(localStorage).filter(([key]) => key.startsWith(prefix)).map(([, value]) => JSON.parse(value))
}
