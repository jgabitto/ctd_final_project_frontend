const calcMidpoint = (lat1, lon1, lat2, lon2) => {

  let dLon = (lon2 - lon1) * (Math.PI / 180);

  //convert to radians
  let newLat1 = lat1 * (Math.PI / 180)
  let newLat2 = lat2 * (Math.PI / 180)
  let newLon1 = lon1 * (Math.PI / 180)

  let Bx = Math.cos(newLat2) * Math.cos(dLon);
  let By = Math.cos(newLat2) * Math.sin(dLon);
  let lat3 = Math.atan2(Math.sin(newLat1) + Math.sin(newLat2), Math.sqrt((Math.cos(newLat1) + Bx) * (Math.cos(newLat1) + Bx) + By * By));
  let lon3 = newLon1 + Math.atan2(By, Math.cos(newLat1) + Bx);

  return { latitude: lat3 / (Math.PI / 180), longitude: lon3 / (Math.PI / 180) };
}

export default calcMidpoint;