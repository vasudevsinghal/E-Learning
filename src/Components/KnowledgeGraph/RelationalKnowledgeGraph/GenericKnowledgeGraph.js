import React, { useEffect, useMemo, useRef } from "react";
import { fitString } from "../utils";
import ForceGraph2D from "react-force-graph-2d";
import { useTheme } from "@mui/material/styles";
import * as d3 from "d3-force";

const GenericKnowledgeGraph = (props) => {
  const { data, displayOnNodeHover, onNodeClick, selectedNode } = props;
  const fgRef = useRef();
  const theme = useTheme();

  const idToIndex = useMemo(() => {
    const res = {};
    data.nodes.forEach((v, i) => {
      res[v.id] = i;
      v["neighbors"] = [];
      v["links"] = [];
    });
    return res;
    // eslint-disable-next-line
  }, [data]);
  const neighborData = useMemo(() => {
    data.links.forEach((link) => {
      const a =
        data.nodes[
          typeof link.source === "string"
            ? idToIndex[link.source]
            : idToIndex[link.source["id"]]
        ];
      const b =
        data.nodes[
          typeof link.target === "string"
            ? idToIndex[link.target]
            : idToIndex[link.target["id"]]
        ];
      a.neighbors.push(b);
      a.links.push(link);
    });
    return data;
    // eslint-disable-next-line
  }, [data]);

  const highlightNodes = useMemo(() => {
    if (
      selectedNode !== undefined &&
      neighborData.nodes[idToIndex[selectedNode.id]] !== undefined
    ) {
      const highlight = new Set(
        neighborData.nodes[idToIndex[selectedNode.id]].neighbors
      );
      highlight.add(selectedNode);
      return highlight;
    }
    return new Set();
    // eslint-disable-next-line
  }, [selectedNode, data]);
  const highlightLinks = useMemo(() => {
    if (
      selectedNode !== undefined &&
      neighborData.nodes[idToIndex[selectedNode.id]] !== undefined
    ) {
      return new Set(neighborData.nodes[idToIndex[selectedNode.id]].links);
    }
    return new Set();
    // eslint-disable-next-line
  }, [selectedNode, data]);

  const paintRing = (node, ctx) => {
    // add ring just for highlighted nodes
    ctx.beginPath();
    ctx.arc(node.x, node.y, 8 * 1.168, 0, 2 * Math.PI, false);
    ctx.fillStyle = node.id === selectedNode.id ? "black" : "darkred";
    ctx.fill();
  };

  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const onSizeChange = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", onSizeChange);
    return (_) => {
      window.removeEventListener("resize", onSizeChange);
    };
  });

  useEffect(() => {
    const fg = fgRef.current;
    if (fg === undefined) return;
    fg.d3Force("box", () => {
      const rectWidth = dimensions.width / 2;
      const rectHeight = dimensions.height / 2;
      data["nodes"].forEach((node) => {
        const x = node.x || 0,
          y = node.y || 0;
        if (Math.abs(x) > rectWidth + 2) {
          node.vx = -(Math.abs(x) / x) * (Math.abs(x) - rectWidth);
        }
        if (Math.abs(y) > rectHeight + 2) {
          node.vy = -(Math.abs(y) / y) * (Math.abs(y) - rectHeight);
        }
      });
    });
    fg.d3Force(
      "collide",
      d3
        .forceCollide()
        .radius(8 * 1.168)
        .strength(1)
    );
    fg.d3Force("charge", d3.forceManyBody().strength(-15));
    // fg.d3Force(
    //   "link",
    //   d3.forceLink().strength((link) => 5 * link.weight)
    // );
  });

  useEffect(() => {
    if (selectedNode !== undefined && fgRef.current !== undefined) {
      const fg = fgRef.current;
      if (fg === undefined) return;
      fg.centerAt(selectedNode.x, selectedNode.y, 500);
      // fg.zoom(2, 500);
    }
  }, [selectedNode]);
  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={neighborData}
      nodeCanvasObject={(node, ctx, globalScale) => {
        if (highlightNodes.has(node)) paintRing(node, ctx);
        const label = node.name;
        const fontSize = 6 / Math.sqrt(globalScale);
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = theme.palette.getContrastText(node.color);
        ctx.fillText(fitString(ctx, label, 15), node.x, node.y);
      }}
      nodeRelSize={0}
      autoPauseRedraw={false}
      linkWidth={(link) => (highlightLinks.has(link) ? 5 : 1)}
      linkDirectionalParticles={4}
      linkDirectionalParticleWidth={(link) =>
        highlightLinks.has(link) ? 4 : 0
      }
      nodePointerAreaPaint={(node, color, ctx) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI, false);
        ctx.fill();
      }}
      nodeCanvasObjectMode={(node) =>
        highlightNodes.has(node) ? "after" : "before"
      }
      nodeLabel={(node) =>
        `<div>${displayOnNodeHover
          .filter((v) => Object.keys(node).includes(v))
          .map((k) => `<div><b>${k}:</b> ${node[k]}</div>`)
          .join("")}</div>`
      }
      onNodeClick={(node) => {
        onNodeClick(node);
      }}
      width={dimensions === undefined ? undefined : dimensions.width}
      height={dimensions === undefined ? undefined : dimensions.height}
      minZoom={0.5}
      maxZoom={10}
      onZoom={({ x, y }) => {
        const fg = fgRef.current;
        if (fg !== undefined) {
          const rectWidth = dimensions.width / 2;
          const rectHeight = dimensions.height / 2;
          if (x !== 0 && Math.abs(x) > rectWidth) {
            fg.centerAt((rectWidth - 10) * (x / Math.abs(x)), y, 0);
          }
          if (y !== 0 && Math.abs(y) > rectHeight) {
            fg.centerAt(x, (rectHeight - 10) * (y / Math.abs(y)), 0);
          }
        }
      }}
    />
  );
};

export default GenericKnowledgeGraph;
