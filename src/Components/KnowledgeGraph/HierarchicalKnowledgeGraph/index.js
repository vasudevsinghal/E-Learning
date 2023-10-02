import React, { useEffect, useState } from "react";
import { fetchKg } from "../utils";
import { adaptHierarchicalDataToKnowledgeGraph } from "./utils";
import { Spinner, Stack } from "react-bootstrap";
import GeneralHierarchicalKnowledgeGraph from "./GenericHeirarchicalKnowledgeGraph";
import NodeDetails from "../NodeDetails";
import { useMediaQuery } from "@mui/material";
import Legend from "./Legend";
import Filter from "./Filter";

const API_SLUG = "/api/knowledgeGraph/hierarchical";

const HierarchicalKnowledgeGraph = () => {
  const [adaptedData, setAdaptedData] = useState(undefined);
  const [selectedNode, setSelectedNode] = useState(undefined);
  const expand = useMediaQuery("(max-width:768px) and (min-height:800px)");

  useEffect(() => {
    fetchKg(API_SLUG, (data) => {
      const _adaptedData = adaptHierarchicalDataToKnowledgeGraph(data);
      setAdaptedData(_adaptedData);
    });
    // eslint-disable-next-line
  }, []);

  const getDisplayField = (nodeType) => {
    switch (nodeType) {
      case "topic":
        return ["type", "name", "completion", "Total Videos"];
      case "course":
        return [
          "type",
          "name",
          "Professor Email",
          "completion",
          "Total Videos",
        ];
      case "video":
        return ["type", "name", "course name", "topics", "url", "completion"];
      default:
        return ["type", "name", "completion"];
    }
  };
  const onSetSelectedNode = (node) => {
    if (node === undefined || node === null) {
      setSelectedNode(undefined);
      return;
    }
    setAdaptedData((prevNodes) => ({
      nodes: prevNodes.nodes.map((node2) => {
        if (node2.id === node.id) {
          return {
            ...node2,
            collapsed: !node2.collapsed,
          };
        } else {
          return { ...node2 };
        }
      }),
      links: prevNodes.links,
    }));
    setSelectedNode({ ...node, collapsed: false });
  };
  return (
    <div className={`w-100 d-flex flex-column`}>
      <Stack
        className={
          "position-absolute w-100 gap-2 p-2 align-items-end justify-content-between flex-md-row flex-column"
        }
        style={{ bottom: 0, height: "calc(100vh - 151px)" }}
      >
        <Legend className={`rounded-1 ${expand && "w-100"}`} />
        {selectedNode !== undefined && (
          <NodeDetails
            selectedNode={selectedNode}
            displayFields={getDisplayField(selectedNode?.type)}
            className={`rounded-1 ${expand && "w-100"}`}
          />
        )}
      </Stack>

      {adaptedData !== undefined && (
        <Filter
          data={adaptedData}
          selectedNode={selectedNode}
          setSelectedNode={onSetSelectedNode}
        />
      )}
      {adaptedData === undefined ? (
        <Spinner
          animation="border"
          role="status"
          style={{ position: "absolute", top: "50%", left: "50%" }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div
          className={"border border-1 w-100 overflow-hidden"}
          style={{ height: "calc(100vh - 105px)" }}
        >
          <GeneralHierarchicalKnowledgeGraph
            data={adaptedData}
            displayOnNodeHover={[
              "type",
              "name",
              "course name",
              "completion",
              "collapsed",
            ]}
            onNodeClick={(node) => {
              setSelectedNode(node);
            }}
            selectedNode={selectedNode}
          />
        </div>
      )}
    </div>
  );
};

export default HierarchicalKnowledgeGraph;
