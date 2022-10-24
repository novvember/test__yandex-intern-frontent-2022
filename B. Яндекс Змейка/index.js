/**
 * @param {string[]} field - описание поля в виде массива строк
 * @param {string} moves - строка со всеми движениями змейки
 * @returns {[number[], number]}
 */
function solution(field, moves) {
  const FOOD = 'YANDEX';
  moves = moves.split(' ');

  let size = 3;
  let [x, y] = [0, 2];

  function move(direction, length) {
    for (let i = 0; i < length; i++) {
      step(direction);
    }
  }

  function step(direction) {
    if (direction === 'U') x--;
    else if (direction === 'D') x++;
    else if (direction === 'L') y--;
    else if (direction === 'R') y++;

    if (FOOD.includes(field[x][y])) size++;
  }

  while (moves.length) {
    const direction = moves.shift();
    const length = moves.shift();
    move(direction, length);
  }

  return [[x, y], size];
}

const field = [
  'ooo------Y--AND------',
  '-----EXY--A--N---D--E',
  '-X-----Y--A-N---D----',
  '------EXY----A---N---',
  '--DE--X---------YA---',
  '-----ND---EXY--AN--D-',
  '----E-----X-Y----A--N',
  'D-----E-XY---AN---D--',
  'E--------------------',
  '-------X---Y------A-N',
  '----D-EX----------YA-',
  '--N-DEX--Y-A--N-----D',
  'E------X--Y----------',
];

const moves = `R 12 D 2 R 2 U 1 R 2`;

console.log(solution(field, moves)); // [[1,18],9]
