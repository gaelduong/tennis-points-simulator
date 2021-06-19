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
    const [shotType, direction, depth, opn_contact_dist] = line;
    data.push({
      shotType,
      direction,
      depth,
      opn_contact_dist,
    });
  });
  return data;
};
