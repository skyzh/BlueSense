export function roundDigit(x: number, digit: number): number {
    const base = Math.pow(10, digit)
    return Math.round(x * base) / base
}
