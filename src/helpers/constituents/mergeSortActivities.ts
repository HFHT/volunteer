
export function mergeSortActivities(constituentActivities: any, activities: settingsT | undefined) {
    console.log('mergeSortActivities', constituentActivities, activities)
    if (!activities) return undefined
    if (!constituentActivities) return activities.a
    return constituentActivities.concat(activities.a)
}
