let boardState = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 'X']
];

// blank의 좌표
let x = 0; y = 0;

// 상태로부터 화면을 그리는 함수
function drawBoard() {
  document.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
    rowEl.querySelectorAll('.col').forEach((colEl, colIndex) => {
      // blank의 좌표 알아내는 법
      if (boardState[rowIndex][colIndex] === 'X') {
        x = colIndex
        y = rowIndex
      }
      // 퍼즐판에 boardState의 숫자를 넣어줌
      colEl.textContent = boardState[rowIndex][colIndex];
      // 만약, colEl이 X라면 'blank'class를 넣어줌
      if (boardState[rowIndex][colIndex] === 'X') {
        colEl.classList.add("blank");
      } else {
        colEl.classList.remove("blank");
      }
    })
  })
};

drawBoard()

// 자바스크립트 파일입니다.
document.querySelector('h1').addEventListener('click', e => {
  alert('Hello World!');
});

// 클릭할 때 일어나는 변화 (방법 1: 배열 이용)
document.querySelectorAll('.row').forEach((rowEl, rowIndex) => {
  rowEl.querySelectorAll('.col').forEach((colEl, colIndex) => {
    colEl.addEventListener('click', e => {
      if (rowIndex === y) {
        boardState[rowIndex].splice(x, 1);
        boardState[rowIndex].splice(colIndex, 0, "X");
        drawBoard();
      } else if (colIndex === x && rowIndex < y) {
        for (let i = 0; i < y - rowIndex; i++) {
          boardState[y - i].splice(colIndex, 1, boardState[y - 1 - i][colIndex]);
        }
        boardState[rowIndex].splice(colIndex, 1, "X");
        drawBoard();
      } else if (colIndex === x && rowIndex > y) {
        for (let i = 0; i < rowIndex - y; i++) {
          boardState[y + i].splice(colIndex, 1, boardState[y + 1 + i][colIndex]);
        }
        boardState[rowIndex].splice(colIndex, 1, "X");
        drawBoard();
      }
    })
  })
})





