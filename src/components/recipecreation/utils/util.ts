export const getRandomHeight = () => {
  const heights = [180, 200, 250, 300, 350, 400];
  return heights[Math.floor(Math.random() * heights.length)];
};
