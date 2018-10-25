let boardState = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0]
];

// blank의 좌표
let x = 0; y = 0;

// move 값
let move = 0;

const board = document.querySelector('.game-board')

function randomBox(arr) {
  // 랜덤으로 박스 배치
  const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  for (let item of arr) {
    for (let i = 0; i < 4; i++) {
      let randomIndex = Math.floor(Math.random() * numArr.length);
      item[i] = numArr[randomIndex];
      numArr.splice(randomIndex, 1);
    }
  }

  // 0의 위치 알아내기
  let whereIsZero = 0;

  arr.forEach((item, index) => {
    if (item.some(item => item === 0)) {
      whereIsZero = index + 1;
    }
  });

  console.log(`빈 곳이 위치한 곳은 ${whereIsZero}열 입니다.`);

  // 반전쌍 구하기
  let reversalPair = 0;

  arr.forEach((item, index) => {
    item.forEach((innerItem, innerIndex) => {
      for (let i = innerIndex + 1; i < 4; i++) {
        if (innerItem > item[i]) {
          reversalPair++;
        }
      }
    });
  });

  console.log(`반전쌍의 개수는 ${reversalPair}개 입니다.`);

  // 조건에 부합하지 않을 경우 함수 재실행
  if (whereIsZero % 2 === 1 && reversalPair % 2 === 0) {
    return randomBox(arr);
  } else if (whereIsZero % 2 === 0 && reversalPair % 2 === 1) {
    return randomBox(arr);
  } else {
    return arr;
  }
}

// 상태로부터 화면을 그리는 함수
function drawBoard() {
  // 정답 판별
  isAnswer()
  // move 값 변화
  const moveEl = document.querySelector('.moveEl')
  moveEl.textContent = move

  document.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
    rowEl.querySelectorAll('.col').forEach((colEl, colIndex) => {
      // blank의 좌표 알아내는 법
      if (boardState[rowIndex][colIndex] === 0) {
        x = colIndex
        y = rowIndex
      }
      // 퍼즐판에 boardState의 숫자를 넣어줌
      colEl.textContent = boardState[rowIndex][colIndex];
      // 만약, colEl이 X라면 'blank'class를 넣어줌
      // if (boardState[rowIndex][colIndex] === 0) {
      //   colEl.classList.add("blank");
      // } else {
      //   colEl.classList.remove("blank");
      // }
    })
  })
};

// 클릭할 때 일어나는 변화 (방법 1: 배열 이용)
// document.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
//   rowEl.querySelectorAll('.col').forEach((colEl, colIndex) => {
//     colEl.addEventListener('click', e => {
//       if (rowIndex === y) {
//         boardState[rowIndex].splice(x, 1);
//         boardState[rowIndex].splice(colIndex, 0, 0);
//         move += 1
//         drawBoard();
//       } else if (colIndex === x && rowIndex < y) {
//         for (let i = 0; i < y - rowIndex; i++) {
//           boardState[y - i].splice(colIndex, 1, boardState[y - 1 - i][colIndex]);
//         }
//         boardState[rowIndex].splice(colIndex, 1, 0);
//         move += 1
//         drawBoard();
//       } else if (colIndex === x && rowIndex > y) {
//         for (let i = 0; i < rowIndex - y; i++) {
//           boardState[y + i].splice(colIndex, 1, boardState[y + 1 + i][colIndex]);
//         }
//         boardState[rowIndex].splice(colIndex, 1, 0);
//         move += 1
//         drawBoard();
//       }
//     })
//   })
// })

document.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
  rowEl.querySelectorAll('.col').forEach((colEl, colIndex) => {
    let blankRow
    let blankCol
    if(colEl.classList.contains('col-blank')) {
      blankRow = rowIndex
      blankCol = colIndex
    }
    colEl.addEventListener('click', e => {
      // if(colEl.parentElement.childNodes[blankRow].childNodes[blankCol].classList.contains('col-blank')) {
      //   console.log('blank')
      // }
      // console.log(colEl.parentElement.parentElement.children)
      for(let i=0; i < colEl.parentElement.parentElement.children.length; i++) {
        if(colEl.parentElement.parentElement.children[i].children[colIndex].classList.contains('col-blank')) {
          console.log(colEl.parentElement.parentElement.children[i])
        }
      }
      // console.log(colEl.parentElement.childNodes)
    })
  })
})

// 타이머 기능
let timeUp
const timeEl = document.querySelector('.timeEl')
function setIntervalAndExcute() {
  // 타이머 값 초기화
  timeEl.textContent = `00:00:00`
  let sec = 0, min = 0, hour = 0
  // 1000밀리초마다 timer함수를 실행하는 timeUp 함수를 설정
  timeUp = setInterval(timer, 1000)

  // 타이머 값의 상태를 변화시키는 함수 정의
  function timer() {
    sec = parseInt(sec)
    min = parseInt(min)
    hour = parseInt(hour)
    sec += 1
    if(sec < 10) {
      sec = '0' + sec
    } else if(sec === 60) {
      min += 1
      sec = '0' + 0
    }
    if(min < 10) {
      min = '0' + min
    } else if(min === 60) {
      hour += 1
      min = '0' + 0
    }
    if(hour === 0 || hour < 10) {
      hour = '0' + hour
    }
    // 타이머 값의 상태를 화면에 그려준다.
    timeEl.textContent = `${hour}:${min}:${sec}`
  }
  return timeUp
}

// 정답 판별 함수
function isAnswer() {
  let answer = true
  const newArr = new Array()
  //boardState의 값을 새로운 1차원 배열에 넣어준다.
  for(let i=0; i < boardState.length; i++) {
    for(let j=0; j < boardState[i].length; j++) {
      newArr.push(boardState[i][j])
    }
  }
  // 새로 만든 1차원 배열을 순회하면서 값이 1~15 순서대로 나오는지 확인한다.
  // 순서대로 나오지 않으면 answer를 false로 변경
  for(let k=0; k < newArr.length-1; k++) {
    if(newArr[k] !== k+1) {
      answer = false
    }
  }
  // 만약 answer가 false로 변하지 않고 계속 true라면 정답화면 출력
  if(answer) {
    console.log('정답입니다!')
  } else {
    console.log('오답입니다ㅠㅠ')
  }

  // console.log(newArr)
}
// 재시작 버튼을 눌렀을 때
const restart = document.querySelector('.btn-restart')
restart.addEventListener('click', e => {
  move = 0;
  clearInterval(timeUp) // 기존에 돌고 있던 타이머 인터벌 종료
  setIntervalAndExcute()  // 타이머 인터벌이 들어있는 함수 재실행
  randomBox(boardState)
  drawBoard()
})


setIntervalAndExcute()
drawBoard()

