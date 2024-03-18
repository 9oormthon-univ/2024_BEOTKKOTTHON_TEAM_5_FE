/**
 * 두 점 사이의 거리를 미터 단위로 계산합니다.
 * @param {number} lat1 - 위도1
 * @param {number} lon1 - 경도1
 * @param {number} lat2 - 위도2
 * @param {number} lon2 - 경도2
 * @returns {number} 두 점 사이의 거리 (미터)
 */
export const calculateDistanceInMeter = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Radius of the earth in meters

  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
