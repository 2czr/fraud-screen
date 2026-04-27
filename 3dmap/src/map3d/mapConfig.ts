const Depth = 6;

const getColorByValue = (value: number): string => {
  if (value > 40000) return "#ff4d4f";
  if (value > 20000) return "#ff6600";
  if (value > 10000) return "#ffa940";
  if (value > 5000) return "#00aaff";
  if (value > 2000) return "#0066cc";
  return "#1E6BF8";
};

export const mapConfig = {
  mapDepth: Depth,
  mapTransparent: true,
  mapOpacity: 0.85,
  mapColor: "#1E6BF8",
  mapHoverColor: "#ffa940",
  mapColorGradient: ["#42A0F9", "#1E6BF8", "#0B388A", "#132354"],
  mapSideColor1: "#3F9FF3",
  mapSideColor2: "#266BF0",
  topLineColor: 0x41c0fb,
  topLineWidth: 3,
  topLineZIndex: Depth + 0.5,
  label2dZIndex: Depth + 2,
  spotZIndex: Depth + 0.2,
  getColorByValue,
};

export { getColorByValue };