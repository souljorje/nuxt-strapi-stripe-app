import isPlainObject from 'lodash.isplainobject';
import addStrapiUrl from './addStrapiUrl';

// eslint-disable-next-line
const normalizeImage = data => {
  if (Array.isArray(data)) {
    const normalizedArray = data.map((item) => normalizeImage(item));
    return normalizedArray;
  }
  if (isPlainObject(data)) {
    const normalizedObject = Object.entries(data).reduce((acc, [key, value]) => {
      if (key.toLowerCase() === 'image' && isPlainObject(value)) {
        if (value.url) {
          acc[key] = addStrapiUrl(value.url);
        }
      } else {
        acc[key] = normalizeImage(value);
      }
      return acc;
    }, {});
    return normalizedObject;
  }
  return data;
};

export default normalizeImage;
