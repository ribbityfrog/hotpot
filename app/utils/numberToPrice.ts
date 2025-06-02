export default function numberToPrice(num: number | undefined | null, cents: boolean = false) {
    if (num === undefined || num === null) return '-'

    const convertedNum = num / (cents ? 100 : 1)

    return convertedNum.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 })
}
