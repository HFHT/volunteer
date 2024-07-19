import { getWeek } from ".."

export function formatHistoryHours(hours: hoursT[] | undefined) {
    if (!hours) return undefined
    //@ts-ignore
    let sortedHours = hours?.sort((a, b): any => new Date(b.day) - new Date(a.day))
    let history: formatHistoryType[] | [] = []

    sortedHours.forEach((h: hoursT) => {
        const y = new Date(h.day).getFullYear()
        const w = getWeek(h.day)
        // Add year to formatted history
        let yIdx = history.findIndex((f: any) => f.year === y)
        yIdx === -1 && (history = [...history, ...[{ year: y, hours: 0, weeks: [] }]])
        yIdx = history.findIndex((f: any) => f.year === y)
        // Add week to formatted history
        let wIdx = history[yIdx].weeks.findIndex((e: any) => e.weekNo === w)
        wIdx === -1 && (
            history[yIdx].weeks = [...history[yIdx].weeks, ...[{ weekNo: w, hours: 0, rcds: [] }]]
        )
        wIdx = history[yIdx].weeks.findIndex((e: any) => e.weekNo === w)
        // Add day to formatted history
        history[yIdx].weeks[wIdx].rcds = [...history[yIdx].weeks[wIdx].rcds, ...[h]]
        // Update the weekly total of hours
        history[yIdx].weeks[wIdx].hours = history[yIdx].weeks[wIdx].hours + Number(h.dur)
        history[yIdx].hours = history[yIdx].hours + Number(h.dur)

    })

    return history
}