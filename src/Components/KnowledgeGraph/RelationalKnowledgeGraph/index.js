import React, { useEffect, useState } from "react";
import {
  adaptVideosDataToGenericData,
  applyFilter,
  getDefaultFilter,
  getFullFilter,
  makeColorLegend,
} from "./utils";
import GenericKnowledgeGraph from "./GenericKnowledgeGraph";
import { Spinner, Stack } from "react-bootstrap";
import Filter from "./Filter";
import NodeDetails from "../NodeDetails";
import ColorLegend from "./ColorLegend";
import { useMediaQuery } from "@mui/material";
import { deepEqual, fetchKg } from "../utils";

const DISPLAY_ON_HOVER = ["name", "topics"];
const API_SLUG = "/api/knowledgeGraph/videos";
const Index = () => {
  const [rawData, setRawData] = useState(undefined);
  const [adaptedData, setAdaptedData] = useState(undefined);
  const [filtered, setFiltered] = useState(undefined);
  const [colors, setColors] = useState(undefined);
  const [selectedNode, setSelectedNode] = useState(undefined);
  const [filter, setFilter] = useState(undefined);
  const [fullFilter, setFullFilter] = useState(undefined);
  const expand = useMediaQuery("(max-width:768px) and (min-height:800px)");

  useEffect(() => {
    fetchKg(API_SLUG, (data) => {
      setRawData(data);
      const _adaptedData = adaptVideosDataToGenericData(data);
      setAdaptedData(_adaptedData);
      setFilter(getDefaultFilter(_adaptedData));
      setFullFilter(getFullFilter(_adaptedData));
      setFiltered(applyFilter(_adaptedData, getDefaultFilter(_adaptedData)));
      setColors(makeColorLegend(_adaptedData));
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFiltered(undefined);
    const prev = setTimeout(() => {
      if (adaptedData !== undefined && filter !== undefined) {
        let newFiltered = applyFilter(adaptedData, filter);
        setFiltered(newFiltered);
        setSelectedNode((prev) =>
          prev === undefined
            ? undefined
            : newFiltered.nodes.find((node) => node.id === prev.id) || undefined
        );
      }
    }, 500);
    return () => {
      return clearTimeout(prev);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    if (colors === undefined || deepEqual(colors, makeColorLegend(adaptedData)))
      return;
    setFiltered(undefined);
    const prev = setTimeout(() => {
      const adaptedData = adaptVideosDataToGenericData(rawData, colors);
      setAdaptedData(adaptedData);
      setFiltered(applyFilter(adaptedData, filter));
      const colorLegend = makeColorLegend(adaptedData);
      setSelectedNode((prev) =>
        prev === undefined
          ? undefined
          : adaptedData.nodes.find((node) => node.id === prev.id) || undefined
      );
      setColors(colorLegend);
    }, 500);
    return () => {
      return clearTimeout(prev);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  const onNodeSelect = (node) => {
    setSelectedNode(node === null ? undefined : node);
  };

  return (
    <div className={`w-100 d-flex flex-column`}>
      <Stack
        className={
          "position-absolute w-100 gap-2 p-2 align-items-end justify-content-between flex-md-row flex-column"
        }
        style={{ bottom: 0, height: "calc(100vh - 151px)" }}
      >
        {colors !== undefined && (
          <ColorLegend
            colors={colors}
            className={`rounded-1 ${expand && "w-100"}`}
            setColors={setColors}
          />
        )}
        {selectedNode !== undefined && (
          <NodeDetails
            selectedNode={selectedNode}
            displayFields={filter.showFields}
            className={`rounded-1 ${expand && "w-100"}`}
          />
        )}
      </Stack>

      {filter !== undefined && (
        <Filter
          fullFilter={fullFilter}
          filter={filter}
          setFilter={setFilter}
          selectedNode={selectedNode}
          setSelectedNode={onNodeSelect}
          filteredNodes={filtered === undefined ? [] : filtered["nodes"]}
        />
      )}
      {filtered === undefined ? (
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
          <GenericKnowledgeGraph
            data={filtered}
            displayOnNodeHover={DISPLAY_ON_HOVER}
            onNodeClick={onNodeSelect}
            selectedNode={selectedNode}
          />
        </div>
      )}
    </div>
  );
};

export default Index;
