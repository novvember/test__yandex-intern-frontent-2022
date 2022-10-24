function solution(text) {
  const lines = text.split('\n');

  let intro = [];
  let its = [];
  let end = [];

  let current = intro;
  let openedBrackets = 0;
  let closedBrackets = 0;

  function countBrackets(line) {
    const opened = line.match(/\{/g);
    const closed = line.match(/\}/g);
    if (opened) openedBrackets += opened.length;
    if (closed) closedBrackets += closed.length;
  }

  for (let line of lines) {
    if (current === intro) {
      current.push(line);
      if (/^\s*describe/.test(line)) current = its;
      continue;
    }

    if (current === its) {
      if (/^\s*it(\.skip)?\s*\(\s*\'/.test(line)) {
        its[its.length] = [];
        current = its[its.length - 1];
        current.push(line);
        countBrackets(line);
        continue;
      }

      if (/^\s*\}\s*\)/.test(line)) {
        current = end;
        current.push(line);
        continue;
      }
    }

    if (current === end) {
      current.push(line);
      continue;
    }

    current.push(line);
    countBrackets(line);
    if (openedBrackets - closedBrackets <= 0) current = its;
  }

  intro = intro.join('\n');
  its = its.map((it) => it.join('\n'));
  end = end.join('\n');

  console.log(typeof intro);

  const files = its.map((it) => [intro, it, end].join('\n'));

  return files;
}

const fileText = `// Some imports and comments
const component = require('./component');

describe('suite', function () {
it('test1', function () {
// Some test 1
});
it('test2', function () {
// Some test 2
});
it.skip('test3', function () {
// Some test 3
});
});`;

solution(fileText);
