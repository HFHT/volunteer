
export const dateDiff = (date1: string | Date, date2: string | Date): number | undefined => {
    // Return the number of days between date1 and date2
    console.log('timeDiff', date1, date2)
    if (date1 === undefined || date2 === undefined) return undefined
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const difference = Number(d1) - Number(d2)
    console.log(difference)
    return difference / (1000 * 60 * 60 * 24)
}