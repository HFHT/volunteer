// Returns the array index of the record that contains the _id passed as a parameter
export const find_id = (property: any, _id: number | string, array: any) => {
    if (!array) return -1
    return array.findIndex((a: any) => a && (a[property] === _id));
};