import { generateRandomColorPair } from "../utils";

export const adaptVideosDataToGenericData = (data, courseToColor?) => {
  const newData = {};
  courseToColor = courseToColor || {};
  newData["nodes"] = data["nodes"].map((e) => {
    if (!Object.keys(courseToColor).includes(e["course"]["title"])) {
      const newColors = generateRandomColorPair();
      courseToColor[e["course"]["title"]] = {
        true: newColors[0],
        false: newColors[1],
      };
    }
    const color = courseToColor[e["course"]["title"]][e["watched"]];
    const topics = new Set(e["topics"]);
    topics.delete("");
    return {
      ...e,
      id: e["_id"],
      color: color,
      url: `${window.location.origin}/course/${e["course"]["_id"]}/video/${e["_id"]}`,
      course: e["course"]["title"],
      enrolled: e["course"]["enrolled"],
      topics: [...topics],
    };
  });
  newData["links"] = data["links"].map((e) => ({
    ...e,
    source: e["source"],
    target: e["target"],
    weight: e["weight"],
  }));
  return newData;
};

export const makeColorLegend = (newData) => {
  const legend = {};
  for (const node in newData["nodes"]) {
    const key = newData["nodes"][node]["course"];
    legend[key] = newData["nodes"][node]["watched"]
      ? {
          true: newData["nodes"][node]["color"],
          ...legend[key],
        }
      : {
          ...legend[key],
          false: newData["nodes"][node]["color"],
        };
  }

  return legend;
};

export const getDefaultFilter = (data) => {
  return {
    showFields: [
      "course",
      "enrolled",
      "watched",
      "url",
      "videoNumber",
      "lectureNumber",
      "duration",
      "topics",
    ],
    courses: data["nodes"]
      .filter((e) => e["enrolled"])
      .map((e) => e["course"])
      .filter((v, i, a) => a.indexOf(v) === i),
    topics: data["nodes"]
      .map((e) => e["topics"])
      .flat()
      .filter((v, i, a) => a.indexOf(v) === i),
    watched: [true, false],
  };
};

export const getFullFilter = (data) => {
  return {
    showFields: [
      "course",
      "enrolled",
      "watched",
      "url",
      "videoNumber",
      "lectureNumber",
      "duration",
      "topics",
    ],
    courses: data["nodes"]
      .map((e) => e["course"])
      .filter((v, i, a) => a.indexOf(v) === i),
    topics: data["nodes"]
      .map((e) => e["topics"])
      .flat()
      .filter((v, i, a) => a.indexOf(v) === i),
    watched: [true, false],
  };
};

export const applyFilter = (data, filter) => {
  const nodes = data["nodes"].filter((e) => {
    return (
      filter["courses"].includes(e["course"]) &&
      filter["topics"].filter((t) => e["topics"].includes(t)).length > 0 &&
      filter["watched"].includes(e["watched"])
    );
  });
  const filteredNodeSet = new Set(nodes.map((n) => n["id"]));

  const links = data["links"].filter((e) => {
    if (typeof e["source"] === "string" && typeof e["target"] === "string") {
      return (
        filteredNodeSet.has(e["source"]) && filteredNodeSet.has(e["target"])
      );
    }
    return (
      filteredNodeSet.has(e["source"]["id"]) &&
      filteredNodeSet.has(e["target"]["id"])
    );
  });
  return {
    nodes: nodes,
    links: links,
  };
};
