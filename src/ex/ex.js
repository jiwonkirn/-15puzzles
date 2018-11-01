// 퍼즐의 숫자를 저장하는 배열 선언
const boardState = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
const newArr = new Array(16)

// 랜덤 박스 배치 및 게임 진행 가능 여부 판단을 위한 반전쌍 판별 함수
function randomBox(arr) {
  // 랜덤으로 박스 배치
  const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  arr.forEach((item, index) => {
    let random = Math.floor(Math.random() * numArr.length)
    arr[index] = numArr[random]
    numArr.splice(random, 1)
  })

  arr.forEach((item, index) => {
      newArr.splice(item, 1, index+1)
  })
  // newArr.splice(newArr.indexOf(16), 1)

  let reversalPair = 0;
  for (let i = 0; i < 15; i++) {
    for (let j = i + 1; j < 15; j++) {
      if (newArr[i] > newArr[j]) reversalPair++
    }
  }

  console.log(`현재의 반전쌍은 ${reversalPair}개 입니다.`)

  // 0의 위치 구하기
  let zeroPosition = 0;

  arr.forEach((item, index) => {
    if (index === 15) {
      zeroPosition += Math.floor(item / 4) + 1
    }
  })

  console.log(`현재 빈칸의 위치는 ${zeroPosition}번째 열입니다.`)

  // 조건에 부합하지 않을 경우 함수 재실행
  if (zeroPosition % 2 === 1 && reversalPair % 2 === 0) {
    return randomBox(arr);
  } else if (zeroPosition % 2 === 0 && reversalPair % 2 === 1) {
    return randomBox(arr);
  } else {
    return arr;
  }
};

const box2 = document.querySelector('.box2')
const box3 = document.querySelector('.box3')
function drawBoard() {
  box2.querySelectorAll('.column').forEach((colEl, colIndex) => {
    colEl.textContent = boardState[colIndex] + 1;
    if(colEl.textContent === '16') colEl.style.backgroundColor = '#fff';
    else colEl.style.backgroundColor = '#69c6ab'
  })
  box3.querySelectorAll('.column').forEach((colEl, colIndex) => {
    if(colIndex !== 16) {
      colEl.textContent = newArr[colIndex];
      if(colEl.textContent === '16') colEl.style.backgroundColor = '#fff';
      else colEl.style.backgroundColor = '#00b3e3'
    }
  })
}

const mix = document.querySelector('.mix')

mix.addEventListener('click', e => {
  randomBox(boardState)
  drawBoard()
})
