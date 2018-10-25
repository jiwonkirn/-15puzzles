// 자바스크립트 파일입니다.
document.querySelector('h1').addEventListener('click', e => {
  alert('Hello World!');
});

const boardState = [
  [1,2,3,4],
  [5,6,7,8],
  [9,10,11,12],
  [13,14,15,0]
]

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

// 보드의 현 상태를 그리는 함수
function drawBorad() {
  board.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
    rowEl.querySelectorAll('.col').forEach((colEl, colIndex) => {
      if (boardState[rowIndex][colIndex] !== 0) {
        colEl.textContent = boardState[rowIndex][colIndex]
      } else {
        colEl.textContent = null;
      }
    })
  })
}

const restart = document.querySelector('.btn-restart')

restart.addEventListener('click', e => {
  randomBox(boardState)
  drawBorad()
})

// 클릭했을 때 위치를 바꾸는 함수
board.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
  rowEl.querySelectorAll('.col').forEach((colEl, colIndex) => {
    colEl.addEventListener('click', e => {
      // if (board[rowIndex][colIndex - 1].textContent === null) {

      // }
    })
  })
})
