export const listItems = (array) => {
  let result = "";
  if (array.length > 1) {
    array.forEach((item, i) => {
      if (array.length - 1 > i) {
        result += item;
        result += ", ";
      } else {
        result += item;
      }
    });
    return result;
  } else {
    return array[0];
  }
};
