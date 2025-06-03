export function getProperty(property: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(property)
}

export function setProperty(property: string, value: string): void {
    document.documentElement.style.setProperty(property, value)
}
