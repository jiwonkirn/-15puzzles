const boardState = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,15,14]
console.log(boardState)
function randomBox(arr) {
  // 랜덤으로 박스 배치
  const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  arr.forEach((item, index) => {
    let random = Math.floor(Math.random() * numArr.length)
    arr[index] = numArr[random]
    numArr.splice(random, 1)
  })

  // 랜덤으로 배치된 박스에서 반전쌍의 갯수 구하기
  let reversalPair = 0;

  for (let i = 0; i < 16; i+=4) {
    for (let j = i; j < i + 4; j++) {
      for (let k = j + 1; k < j + 4; k++) {
        if (arr[j] > arr[k]) {
          reversalPair++
        }
      }
    }
  }

  console.log(`반전쌍은 ${reversalPair}개 입니다.`)

  // 0의 위치 구하기
  let zeroPosition = 0;

  arr.forEach((item, index) => {
    if (item === 0) {
      zeroPosition += Math.floor(index / 4) + 1
    }
  })

  console.log(`빈 곳은 ${zeroPosition}줄에 있습니다.`)

  // 조건에 부합하지 않을 경우 함수 재실행
  if (zeroPosition % 2 === 1 && reversalPair % 2 === 0) {
    return randomBox(arr);
  } else if (zeroPosition % 2 === 0 && reversalPair % 2 === 1) {
    return randomBox(arr);
  } else {
    return arr;
  }

}

// 보드의 현 상태를 그리는 함수
const gameBoard = document.querySelector('.game-board')

function drawBorad() {
  gameBoard.querySelectorAll('.col').forEach((colEl, colIndex) => {
      colEl.setAttribute('data-idx', boardState[colIndex])
  })
}

drawBorad()

// 재시작 버튼 동작
const restart = document.querySelector('.btn-restart')

restart.addEventListener('click', e => {
  document.querySelector('.win').classList.remove('view')
  randomBox(boardState)
  drawBorad()
})

// 클릭했을 때 움직이게 하는 함수
const gameTable = gameBoard.querySelectorAll('.col')

gameTable.forEach((colEl, colIndex) => {
  colEl.addEventListener('click', e => {

    let dataIdx = parseInt(colEl.getAttribute('data-idx'))

    // console.log(`지금 클릭한 인덱스는 ${dataIdx}입니다.`)
    // console.log(boardState)

    for(let i = 0; i < 16; i++) {
      // console.log(`${i+1}는 ${boardState[i]}인덱스에`)
    }
    let thisItem = boardState.indexOf(dataIdx)
    let rightItem = boardState.indexOf(dataIdx + 1)
    let leftItem = boardState.indexOf(dataIdx - 1)
    let topItem = boardState.indexOf(dataIdx - 4)
    let bottomItem = boardState.indexOf(dataIdx + 4)

    if (rightItem === 15) {
      boardState.splice(thisItem, 1, dataIdx + 1)
      boardState.splice(rightItem, 1, dataIdx)
      drawBorad()
    } else if (leftItem === 15) {
      boardState.splice(thisItem, 1, dataIdx - 1)
      boardState.splice(leftItem, 1, dataIdx)
      drawBorad()
    } else if (topItem === 15) {
      boardState.splice(thisItem, 1, dataIdx - 4)
      boardState.splice(topItem, 1, dataIdx)
      drawBorad()
    } else if (bottomItem === 15) {
      boardState.splice(thisItem, 1, dataIdx + 4)
      boardState.splice(bottomItem, 1, dataIdx)
      drawBorad()
    }

    let score = 0;

    for (let i = 0; i < 15; i++) {
      if(parseInt(gameTable[i].getAttribute('data-idx')) + 1 === parseInt(gameTable[i].textContent)) {
        score++
      } else score = 0
    }

    if (score === 15) {
      document.querySelector('.win').classList.add('view')
    }

  })
})


