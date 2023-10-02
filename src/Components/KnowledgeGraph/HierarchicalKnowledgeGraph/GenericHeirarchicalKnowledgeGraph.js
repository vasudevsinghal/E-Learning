import React, { useEffect, useMemo, useRef } from "react";
import { fitString } from "../utils";
import { getPrunedTree } from "./utils";
import ForceGraph2D from "react-force-graph-2d";
import { useTheme } from "@mui/material/styles";
import * as d3 from "d3-force";

const NODE_RADIUS = 10;

const GeneralHierarchicalKnowledgeGraph = (props) => {
  const { data, displayOnNodeHover, onNodeClick, selectedNode } = props;
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const fgRef = useRef();
  const theme = useTheme();

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

  const nodesById = useMemo(() => {
    return Object.fromEntries(data.nodes.map((node) => [node.id, node]));
  }, [data]);

  const [prunedTree, setPrunedTree] = React.useState(
    getPrunedTree(data, nodesById)
  );

  useEffect(() => {
    setPrunedTree(getPrunedTree(data, nodesById));
  }, [data, nodesById]);

  const paintRing = (node, ctx) => {
    // add ring just for highlighted nodes
    if (node.type === "course") {
      ctx.beginPath();
      ctx.moveTo(node.x, node.y - 2 * NODE_RADIUS * 1.2);
      ctx.lineTo(
        node.x + NODE_RADIUS * Math.sqrt(3) * 1.2,
        node.y + NODE_RADIUS * 1.2
      );
      ctx.lineTo(
        node.x - NODE_RADIUS * Math.sqrt(3) * 1.2,
        node.y + NODE_RADIUS * 1.2
      );
      ctx.fillStyle = node.id === selectedNode.id ? "black" : "darkred";
      ctx.fill();
    } else if (node.type === "topic") {
      ctx.beginPath();
      ctx.rect(
        node.x - NODE_RADIUS * 1.2,
        node.y - NODE_RADIUS * 1.2,
        2 * NODE_RADIUS * 1.2,
        2 * NODE_RADIUS * 1.2
      );
      ctx.fillStyle = node.id === selectedNode.id ? "black" : "darkred";
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(node.x, node.y, NODE_RADIUS * 1.2, 0, 2 * Math.PI, false);
      ctx.fillStyle = node.id === selectedNode.id ? "black" : "darkred";
      ctx.fill();
    }
  };

  useEffect(() => {
    const fg = fgRef.current;
    if (fg === undefined) return;
    fg.d3Force(
      "collide",
      d3
        .forceCollide()
        .radius(NODE_RADIUS * 1.25)
        .strength(1)
    );
    fg.d3Force("link").strength(0.0125);
  });
  // const handleNodeCollapse = useCallback((node) => {
  //   node.collapsed = !node.collapsed; // toggle collapse state
  //   setPrunedTree(getPrunedTree());
  // }, []);

  return (
    <ForceGraph2D
      ref={fgRef}
      dagMode={"td"}
      dagLevelDistance={200}
      graphData={prunedTree}
      nodeCanvasObject={(node, ctx, globalScale) => {
        if (
          selectedNode &&
          (selectedNode.highlightNodes.has(node.id) ||
            node.id === selectedNode.id)
        ) {
          paintRing(node, ctx);
        }
        const label = node.name;
        const fontSize = 7 / Math.sqrt(globalScale);
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = node.color;
        if (node.type === "course") {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y - 2 * NODE_RADIUS);
          ctx.lineTo(node.x + NODE_RADIUS * Math.sqrt(3), node.y + NODE_RADIUS);
          ctx.lineTo(node.x - NODE_RADIUS * Math.sqrt(3), node.y + NODE_RADIUS);
          ctx.fill();
        } else if (node.type === "topic") {
          ctx.beginPath();
          ctx.rect(
            node.x - NODE_RADIUS,
            node.y - NODE_RADIUS,
            2 * NODE_RADIUS,
            2 * NODE_RADIUS
          );
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(node.x, node.y, NODE_RADIUS, 0, 2 * Math.PI, false);
          ctx.fill();
        }

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = theme.palette.getContrastText(node.color);
        ctx.fillText(fitString(ctx, label, 2 * NODE_RADIUS), node.x, node.y);
      }}
      nodeRelSize={0}
      autoPauseRedraw={false}
      linkWidth={(link) => {
        const source =
          typeof link.source === "string" ? link.source : link.source.id;
        const target =
          typeof link.target === "string" ? link.target : link.target.id;
        return selectedNode?.highlightLinks.has(source + target) ? 4 : 0;
      }}
      linkDirectionalParticles={4}
      linkDirectionalParticleWidth={(link) => {
        const source =
          typeof link.source === "string" ? link.source : link.source.id;
        const target =
          typeof link.target === "string" ? link.target : link.target.id;
        return selectedNode?.highlightLinks.has(source + target) ? 4 : 0;
      }}
      nodePointerAreaPaint={(node, color, ctx) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_RADIUS, 0, 2 * Math.PI, false);
        ctx.fill();
      }}
      nodeLabel={(node) =>
        node.id === selectedNode?.id
          ? `Click to ${node.collapsed ? "expand" : "collapse"}`
          : `<div>${displayOnNodeHover
              .filter((v) => Object.keys(node).includes(v))
              .map((k) => `<div><b>${k}:</b> ${node[k]}</div>`)
              .join("")}<div>Double Click To ${
              node.collapsed ? "Expand" : "Collapse"
            }...</div></div>`
      }
      onNodeClick={(node) => {
        if (selectedNode?.id === node.id) {
          node.collapsed = !node.collapsed;
          setPrunedTree(getPrunedTree(data, nodesById));
        }
        onNodeClick(node);
      }}
      width={dimensions === undefined ? undefined : dimensions.width}
      height={dimensions === undefined ? undefined : dimensions.height}
      minZoom={0.5}
      maxZoom={10}
    />
  );
};

export default GeneralHierarchicalKnowledgeGraph;
