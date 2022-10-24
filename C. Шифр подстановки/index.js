/**
 *
 * @typedef Replace
 *
 * @property {string} from
 * @property {string} to
 */

/**
 *
 * @param {string} message
 * @param {Replace[]} replaces
 * @returns {string}
 */

function decode(message, replaces) {
  let left = 0;
  let decodedText = '';
  let current = '';

  function findAvailableReplaces(string) {
    return replaces
      .filter((replace) => {
        const regex = new RegExp(replace.from);
        return regex.test(string);
      })
      .sort((a, b) => {
        const regexA = new RegExp(a.from);
        const regexB = new RegExp(b.from);
        return string.match(regexB).index - string.match(regexA).index;
      });
  }

  while (left < message.length) {
    current = message.slice(left);
    const availableReplaces = findAvailableReplaces(current);

    if (!availableReplaces.length) {
      decodedText += current;
      current = '';
      break;
    }

    const replace = availableReplaces.pop();
    const shift = current.indexOf(replace.from) + replace.from.length;
    left = left + shift;
    current = current.slice(0, shift);
    decodedText += current.replace(replace.from, replace.to);
    current = '';
  }

  return decodedText;
}

module.exports = { decode };

const test1 = decode('Aa', [{ from: 'a', to: 'b' }]);
console.log(test1, test1 === 'Ab');

const test2 = decode('ab', [{ from: 'a', to: 'b' }]);
console.log(test2, test2 === 'bb');

const test3 = decode('ab', [
  { from: 'a', to: 'ba' },
  { from: 'b', to: 'r' },
]);
console.log(test3, test3 === 'bar');

const test4 = decode('ab', [
  { from: 'b', to: 'bar' },
  { from: 'ab', to: 'foo' },
]);
console.log(test4, test4 === 'foo');

const test5 = decode('abb', [
  { from: 'b', to: 'bar' },
  { from: 'ab', to: 'foo' },
]);
console.log(test5, test5 === 'foobar');

const test6 = decode('ab', [
  { from: 'a', to: 'bar' },
  { from: 'ab', to: 'foo' },
]);
console.log(test6, test6 === 'foo');

const test7 = decode('ababa', [
  { from: 'a', to: 'bar' },
  { from: 'ab', to: 'foo' },
]);
console.log(test7, test7 === 'foofoobar');

const test8 = decode('ab', []);
console.log(test8, test8 === 'ab');

const test9 = decode('ab', [{ from: 'a', to: '' }]);
console.log(test9, test9 === 'b');
