/**
 * @param {number} N - целое число, количество сотрудников готовых к объединению
 * @param {number[]} staff - массив длины N с грейдами доступных сотрудников
 * @param {number} K - целое число, количество доступных клавиатур
 * @returns {number}
 */
function getA({ N, staff, K }) {
  const stats = new Array(25).fill(0);
  let maxGrade = 0;
  let count = K;

  for (let grade of staff) {
    stats[grade]++;
  }

  for (let i = stats.length - 1; i >= 0 && count > 0; i--) {
    maxGrade += i * Math.min(count, stats[i]);
    count -= stats[i];
  }

  return maxGrade;
}

console.log(getA({ N: 8, staff: [5, 13, 8, 4, 4, 15, 1, 9], K: 8 }));

console.log(
  getA({ N: 11, staff: [14, 8, 15, 19, 2, 21, 13, 21, 12, 10, 8], K: 5 }),
);

console.log(
  getA({
    N: 15,
    staff: [19, 20, 5, 10, 2, 20, 7, 9, 1, 3, 13, 14, 3, 3, 4],
    K: 1,
  }),
);

console.log(
  getA({ N: 12, staff: [22, 7, 24, 24, 11, 22, 24, 3, 9, 16, 2, 19], K: 7 }),
);

console.log(getA({ N: 7, staff: [10, 3, 21, 23, 6, 3, 8], K: 4 }));
