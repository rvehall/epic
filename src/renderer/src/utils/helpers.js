const convertKeyValueToObject = (keyPairs) => {
  return [...keyPairs].reduce((data, pair) => {
    const key = pair.keyItem;
    const value = pair.valueItem;

    if (key === '') return data;
    return {
      ...data,
      [key]: value,
    };
  }, {});
};

const isEmpty = (value) => {
  for (let prop in value) {
    if (value.hasOwnProperty(prop)) return false;
  }
  return true;
}

function deepEqual(x, y) {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
      ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}

export { convertKeyValueToObject, isEmpty, deepEqual };
