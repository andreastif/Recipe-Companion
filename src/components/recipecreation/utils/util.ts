export const getRandomHeight = () => {
    const heights = [150, 200, 250, 300, 350, 400];
    return heights[Math.floor(Math.random() * heights.length)];
};
