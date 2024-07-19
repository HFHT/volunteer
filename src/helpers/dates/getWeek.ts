
export function getWeek(date:string) {
    const d = new Date(date)
    var onejan = new Date(d.getFullYear(), 0, 1);
    // @ts-ignore
    return Math.ceil((((d - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}
