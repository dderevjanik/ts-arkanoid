/**
 * Clear whole screen
 */
export const clearScreen = (g: CanvasRenderingContext2D, w: number, h: number) => {
    g.clearRect(0, 0, w, h);
};
