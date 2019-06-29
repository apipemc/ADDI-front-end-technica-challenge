/**
 * Recursive function to extract a property from an object using a path given as
 * an array of strings or a dotted string.
 *
 * Ex. const value = deepGet(obj, ['path', 'to', 'property'])
 * Ex. const value = deepGet(obj, 'path.to.property')
 */
const deepGet = (obj, path) => {
  if (typeof path === 'string') {
    return deepGet(obj, path.split('.'));
  }

  if (obj == null) {
    return null;
  }

  if (path.length === 0) {
    return obj;
  }

  const [key, ...remaining] = path;
  return deepGet(obj[key], remaining);
};

export default deepGet;
