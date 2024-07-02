
export function getDistance(pos1: { lat: number, lng: number }, pos2: { lat: number, lng: number }, precision = 2) {
    // export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    console.log(pos1, pos2)
    const R = 3959; // Earth's radius in miles
    // const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(pos2.lat - pos1.lat);
    const dLon = deg2rad(pos2.lng - pos1.lng);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(pos1.lat)) * Math.cos(deg2rad(pos2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return Number(distance.toFixed(precision));
}

function deg2rad(deg: number) {
    return deg * (Math.PI / 180);
}
