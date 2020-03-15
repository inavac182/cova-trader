/* tslint:disable */
function _mergeWithKeys(keys: string[] = [], objects) {
  if (objects.length === 0 || keys instanceof Array === false) {
    return {};
  }

  // only use objects for the merge, ignore null which is also typeof object
  objects = objects.filter(object => typeof object === 'object' && object);

  const base = {};

  objects.forEach(object => {
    keys.forEach(key => {
      if (object.hasOwnProperty(key)) {
        base[key] = object[key];
      }
    });
  });

  return base;
}

function _mergeWithoutKeys(keys: string[] = [], objects) {
  if (objects.length === 0 || keys instanceof Array === false) {
    return {};
  }

  // only use objects for the merge, ignore null which is also typeof object
  objects = objects.filter(object => typeof object === 'object' && object);

  // bracket notation lookup should be faster than repeated indexOf
  const omittedKeys = keys.reduce((holder, key) => {
    holder[key] = true;

    return holder;
  }, {});

  const base = {};

  objects.forEach(object => {
    Object.keys(object).forEach(key => {
      if (omittedKeys[key] !== true) {
        base[key] = object[key];
      }
    });
  });

  return base;
}

function _validKeys(keys) {
  if (Array.isArray(keys)) {
    // only use strings as keys, and make sure they're unique
    return keys.filter(
      (key, index, array) => typeof key === 'string' && array.indexOf(key) === index && key.length > 0
    );
  }

  return [];
}

function _flattenFields(refObject, delimiter = '_', flattenArrays = false, newObject = {}, prefix) {
  let label;
  let currentItem;

  if (typeof delimiter !== 'string' || delimiter.length > 5) {
    delimiter = '_';
  }

  flattenArrays = Boolean(flattenArrays);

  if (typeof refObject === 'object' && refObject) {
    Object.keys(refObject).forEach(key => {
      label = prefix ? `${prefix}${delimiter}${key}` : key;
      currentItem = refObject[key];

      if (
        currentItem !== null &&
        ((typeof currentItem === 'object' && Object.keys(currentItem).length > 0) || Array.isArray(currentItem))
      ) {
        if (Array.isArray(currentItem) && flattenArrays === false) {
          newObject[label] = currentItem.concat();
        } else {
          _flattenFields(currentItem, delimiter, flattenArrays, newObject, label);
        }
      } else {
        newObject[label] = currentItem;
      }
    });
  }

  return newObject;
}

// public exports
function allKeys() {
  return withoutKeys([]);
}

function withKeys(keys: string[] = []) {
  keys = _validKeys(keys);

  return {
    merge: function(...objects) {
      return _mergeWithKeys(keys, objects);
    },
  };
}

function withoutKeys(keys: string[] = []) {
  keys = _validKeys(keys);

  return {
    merge: function(...objects: any[]) {
      return _mergeWithoutKeys(keys, objects);
    },
  };
}

function flattenFields(refObject, delimiter = '_', flattenArrays = false) {
  return _flattenFields(refObject, delimiter, flattenArrays, {}, '');
}

export { allKeys, withKeys, withoutKeys, flattenFields };
