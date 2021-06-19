export const filterAndBuildData = (text) => {
  const data = [];
  // Filter textarea
  let lines = text.split("\n");
  lines.forEach((line) => {
    line = line.split(",");

    line.forEach((attr, idx) => {
      line[idx] = attr.replace(/\s/g, "");
    });
    // Build data
    const [direction, depth] = line;
    data.push({
      direction,
      depth,
    });
  });
  return data;
};
