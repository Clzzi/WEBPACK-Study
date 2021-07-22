const PI = 3.14;
const getCircleArea = (r) => r * r * PI;
const getSqaureArea = (d) => d * d;

// 하나씩 내보내는건 유실우려가 있다, 한번에 내보내자
// common JS 표준
module.exports = {
  PI,
  getCircleArea,
  getSqaureArea,
};

// exports.Pi = PI;
// exports.getCircleArea = getCircleArea;

// ESM 표준
// export { PI, getCircleArea, getSqaureArea };
