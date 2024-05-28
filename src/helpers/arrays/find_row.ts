// Returns the array element of the record that contains the _id passed as a parameter
export const find_row = (property: any, _id: number | string, array: any): any | undefined => {
    if (!array) return undefined
    return array.find((a: any) => a && (a[property] === _id));
};