export const completionGradient = [
  [255, 64, 64],
  [64, 255, 64],
];

export const completionGradientRgb = completionGradient.map(
  (color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`
);

export const adaptHierarchicalDataToKnowledgeGraph = (data) => {
  const response = { nodes: [], links: [] };
  const nodeMap = {};

  const topics = new Set(getTopics(data));
  topics.forEach((topic) => {
    nodeMap[topic] = {
      type: "topic",
      id: topic,
      name: topic,
      courses: new Set(),
      "Total Videos": 0,
      "Watched Videos": 0,
    };
  });

  data["ongoingCourses"].forEach((course) => {
    nodeMap[course["_id"]] = {
      type: "course",
      id: course["_id"],
      name: course["name"],
      "Professor Email": course["creator"][0]["email"],
      "Total Videos": 0,
      "Watched Videos": 0,
    };

    const courseTopics = new Set();

    course["videos"].forEach((video) => {
      nodeMap[video["_id"]] = {
        type: "video",
        id: video["_id"],
        name: video["name"],
        "Watched Videos": video["watched"] ? 1 : 0,
        "Total Videos": 1,
        topics: video["topics"],
        course: course["_id"],
        "course name": course["name"],
        url: `${window.location.origin}/course/${course["_id"]}/video/${video["_id"]}`,
      };
      nodeMap[course["_id"]]["Total Videos"] +=
        nodeMap[video["_id"]]["Total Videos"];
      nodeMap[course["_id"]]["Watched Videos"] +=
        nodeMap[video["_id"]]["Watched Videos"];
      if (topics.has(video["name"])) {
        response.links.push({
          source: video["name"],
          target: video["_id"],
        });
        nodeMap[video["name"]]["Total Videos"] +=
          nodeMap[video["_id"]]["Total Videos"];
        nodeMap[video["name"]]["Watched Videos"] +=
          nodeMap[video["_id"]]["Watched Videos"];
        courseTopics.add(video["name"]);
      } else {
        video["topics"].forEach((topic) => {
          if (topics.has(topic)) {
            response.links.push({
              source: topic,
              target: video["_id"],
            });
            nodeMap[topic]["Total Videos"] +=
              nodeMap[video["_id"]]["Total Videos"];
            nodeMap[topic]["Watched Videos"] +=
              nodeMap[video["_id"]]["Watched Videos"];
            courseTopics.add(topic);
            nodeMap[topic]["courses"].add(course["_id"]);
          }
        });
      }
    });
    courseTopics.forEach((value) => {
      response.links.push({
        source: course["_id"],
        target: value,
      });
    });
  });
  Object.values(nodeMap).forEach((value) => {
    value["completion"] = `${Math.round(
      (value["Watched Videos"] / value["Total Videos"]) * 100,
      2
    )}%`;
    value["color"] = pickHex(
      completionGradient[1],
      completionGradient[0],
      value["Watched Videos"] / value["Total Videos"]
    );
    response.nodes.push(value);
  });
  response.nodes.forEach((node) => {
    node.collapsed = node.collapsed === undefined ? true : node.collapsed;
    node.parentLinks = [];
    node.childLinks = [];
    node.highlightLinks = new Set();
    node.highlightNodes = new Set();
  });

  const nodesById = Object.fromEntries(
    response.nodes.map((node) => [node.id, node])
  );

  response.links.forEach((link) => {
    const source =
      typeof link.source === "string" ? nodesById[link.source] : link.source;
    const target =
      typeof link.target === "string" ? nodesById[link.target] : link.target;
    source.childLinks.push(link);
    target.parentLinks.push(link);

    source.highlightNodes.add(target.id);
    target.highlightNodes.add(source.id);

    source.highlightLinks.add(source.id + target.id);
    target.highlightLinks.add(source.id + target.id);

    if (target.type === "video") {
      target.highlightNodes.add(target.course);
      nodesById[target.course].highlightNodes.add(target.id);
    }
  });
  return response;
};

export const getTopics = (data) => {
  const moreTopics = new Set();
  data["ongoingCourses"].forEach((course) => {
    course["videos"].forEach((video) => {
      video["topics"].forEach((topics) => {
        moreTopics.add(topics);
      });
    });
  });
  data["ongoingCourses"].forEach((course) => {
    course["videos"].forEach((video) => {
      let covered = false;
      video["topics"].forEach((topics) => {
        covered = covered || moreTopics.has(topics);
      });
      if (!covered) moreTopics.add(video["name"]);
    });
  });
  return [...moreTopics].sort();
};

export const getPrunedTree = (data, nodesById) => {
  const visibleNodes = [];
  const visibleLinks = [];

  const visibleLinkSet = new Set();
  const visibleNodeSet = new Set();

  const insertNodeIfAbsent = (node) => {
    if (!visibleNodeSet.has(node.id)) {
      visibleNodes.push(node);
      visibleNodeSet.add(node.id);
    }
  };

  const insertLinkIfAbsent = (link) => {
    const source =
      typeof link.source === "string" ? link.source : link.source.id;
    const target =
      typeof link.target === "string" ? link.target : link.target.id;

    if (!visibleLinkSet.has(source + target)) {
      visibleLinks.push({ source: link.source, target: link.target });
      visibleLinkSet.add(source + target);
    }
  };

  data["nodes"].forEach((node) => {
    if (!node.collapsed || node.type === "course") {
      insertNodeIfAbsent(node);
      if (node.collapsed) return;
      node.childLinks.forEach((link) => {
        const target =
          typeof link.target === "string" ? link.target : link.target.id;
        insertLinkIfAbsent(link);
        insertNodeIfAbsent(nodesById[target]);
      });

      const curNodes = [node];
      while (curNodes.length !== 0) {
        const curNode = curNodes.pop();
        curNode.parentLinks.forEach((link) => {
          const source =
            typeof link.target === "string" ? link.source : link.source.id;
          insertLinkIfAbsent(link);
          insertNodeIfAbsent(nodesById[source]);
          if (nodesById[source].type !== "course")
            curNodes.push(nodesById[source]);
        });
      }
    }
  });
  return { nodes: visibleNodes, links: visibleLinks };
};

function pickHex(color1, color2, weight) {
  const w1 = weight;
  const w2 = 1 - w1;
  return `rgb(${Math.round(color1[0] * w1 + color2[0] * w2)}, 
  ${Math.round(color1[1] * w1 + color2[1] * w2)}, 
  ${Math.round(color1[2] * w1 + color2[2] * w2)})`;
}
