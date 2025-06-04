export function getProperty(property: string, el: HTMLElement = document.documentElement): string {
    return getComputedStyle(el).getPropertyValue(property)
}

export function setProperty(property: string, value: string, el: HTMLElement = document.documentElement): void {
    el.style.setProperty(property, value)
}
