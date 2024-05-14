export const getRandomHeight = () => {
  const heights = [180, 200, 250];
  return heights[Math.floor(Math.random() * heights.length)];
};
