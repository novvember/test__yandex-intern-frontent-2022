const { getHashByData, fetchData } = require('./utils');

module.exports = async function (urls, retryCount) {
  function checkHash(data, hashSum) {
    return new Promise((res) => {
      getHashByData(data, (hash) => {
        if (hash === hashSum) res(true);
        res(false);
      });
    });
  }

  async function getData(url) {
    let count = 0;
    let data;
    let hashSum;
    let isValid = false;

    while (count < retryCount) {
      try {
        ({ data, hashSum } = await fetchData(url));
        isValid = await checkHash(data, hashSum);
        if (!isValid) throw new Error('Corrupted data');
        break;
      } catch (err) {
        count++;
      }
    }

    return isValid ? data : null;
  }

  return Promise.all(urls.map(getData)).then((arr) =>
    arr.filter((value) => value !== null),
  );
};
