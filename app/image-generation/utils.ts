/* eslint-disable no-magic-numbers */
export const getImageDimensions = (numberOfImages: number) => {
  if (numberOfImages === 1) {
    return {
      width: 500,
      height: 400,
    };
  }

  if (numberOfImages === 2) {
    return {
      width: 400,
      height: 300,
    };
  }

  if (numberOfImages === 3) {
    return {
      width: 350,
      height: 250,
    };
  }

  return {
    width: 300,
    height: 200,
  };
};
