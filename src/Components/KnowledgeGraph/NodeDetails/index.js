import React, { useEffect, useState } from "react";
import { BiChevronsDown, BiChevronsUp } from "react-icons/bi";
import IconButton from "@mui/material/IconButton";
import { isValidEmail, isValidUrl } from "../utils";
import { useTheme } from "@mui/material/styles";

const Index = ({ selectedNode, displayFields, className }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    setOpen(true);
  }, [selectedNode]);

  return (
    <div
      style={{
        border: "solid black 1px",
        background: "rgba(255, 255, 255, 0.69)",
        backdropFilter: "blur(4px)",
        overflow: open ? "auto" : "hidden",
        textOverflow: "ellipsis",
        zIndex: 1,
      }}
      className={className}
    >
      <div
        className={"pt-2 fs-5 px-2 w-100 d-flex justify-content-between"}
        style={{ background: selectedNode["color"], cursor: "pointer" }}
        onClick={toggleOpen}
      >
        <b
          style={{
            color: theme.palette.getContrastText(selectedNode["color"]),
          }}
        >
          {selectedNode["name"]}
        </b>
        <IconButton>
          {open && (
            <BiChevronsDown
              color={theme.palette.getContrastText(selectedNode["color"])}
            />
          )}
          {!open && (
            <BiChevronsUp
              color={theme.palette.getContrastText(selectedNode["color"])}
            />
          )}
        </IconButton>
      </div>
      {open && (
        <div
          className={"px-2 pb-2"}
          style={{
            maxHeight: "calc(90vh - 140px)",
            maxWidth: "calc(100vw - 16px)",
          }}
        >
          {displayFields.map((k) => (
            <div key={k} style={{ width: "100%" }}>
              <b>{k}:</b>{" "}
              {isValidUrl(selectedNode[k].toLocaleString()) ? (
                <a
                  href={selectedNode[k].toLocaleString()}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  link
                </a>
              ) : isValidEmail(selectedNode[k].toLocaleString()) ? (
                <a href={"mailto:" + selectedNode[k].toLocaleString()}>
                  {selectedNode[k].toLocaleString()}
                </a>
              ) : (
                selectedNode[k].toLocaleString()
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
