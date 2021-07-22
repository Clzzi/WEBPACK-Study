// /*
//   1. 원의 넓이를 구하는 공식
//   2. PI의 정의
//   3. 공식을 통해 결과 얻기
// */

/*
  묘듈을 사용한다면
  1. 코드의 재사용성 증가
  2. 코드의 관리 편함
  3. 코드를 모듈화하는 기준이 명확해짐
*/

// // const { getCircleArea } = require("./mathUtil"); // commonJS 표준
// import { getCircleArea } from "./mathUtil"; // ESM 표준

// const result = getCircleArea(2);
// console.log(result);

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const { getCircleArea, getSqaureArea } = require("./mathUtil");
const { logInput, logFigure, logResult, logFigureError } = require("./log");

rl.question("원하는 도형을 작성해주세요, ( 정사각형, 원 ) : ", (figure) => {
  console.log(logFigure(figure));

  switch (figure) {
    case "정사각형":
      rl.question("변의 길이를 입력해주세요 : ", (input) => {
        console.log(logInput(input));
        console.log(logResult(figure, getSqaureArea(input)));
        rl.close();
      });
      break;
    case "원":
      rl.question("반지름의 길이를 입력해주세요 : ", (input) => {
        console.log(logInput(input));
        console.log(logResult(figure, getCircleArea(input)));
        rl.close();
      });
      break;
    default:
      console(logFigureError);
      rl.close();
  }
});
