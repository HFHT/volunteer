// Returns a string of length "bl" which includes the passed barcode "bc"
export const barCode = (bc: string | number, bl: number = 9) => {
    console.log(bc, bl);
    return ('0000000000' + bc.toString()).slice(-bl);
};