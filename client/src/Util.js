const shotTypes = ["neutral", "topspin", "slice"];
const directions = [
  "farLeft",
  "left",
  "somewhatLeft",
  "middle",
  "somewhatRight",
  "right",
  "farRight",
];
const depths = [
  "deep",
  "somewhatDeep",
  "normal",
  "somewhatShort",
  "short",
  "veryShort",
];

export const filterAndBuildData = (text) => {
  const data = [];
  // Filter textarea
  try {
    let lines = text.split("\n");
    lines = lines.filter((line) => line.length > 0);
    if (!lines.length) throw new Error("Wrong input");
    lines.forEach((line) => {
      line = line.split(",");

      line.forEach((attr, idx) => {
        line[idx] = attr.replace(/\s/g, "");
      });
      // Build data
      const [shotType, direction, depth] = line;
      if (
        !shotTypes.includes(shotType) ||
        !directions.includes(direction) ||
        !depths.includes(depth)
      ) {
        throw new Error("Wrong input");
      }
      data.push({
        shotType,
        direction,
        depth,
      });
    });
  } catch (e) {
    return null;
  }
  return data;
};
