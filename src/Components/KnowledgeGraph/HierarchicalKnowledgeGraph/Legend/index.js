import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import { BiChevronsDown, BiChevronsUp } from "react-icons/bi";
import { completionGradientRgb } from "../utils";

const Index = ({ className }) => {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

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
        className={
          "pt-2 fs-5 px-2 w-100 d-flex justify-content-between bg-danger text-bg-danger"
        }
        style={{ cursor: "pointer" }}
        onClick={toggleOpen}
      >
        <b>Legend</b>
        <IconButton>
          {open && <BiChevronsDown color={"white"} />}
          {!open && <BiChevronsUp color={"white"} />}
        </IconButton>
      </div>
      {open && (
        <div
          className={"px-2 pb-2 d-flex justify-content-center flex-column "}
          style={{
            minWidth: 256,
          }}
        >
          <b>Entity:</b>
          <div
            className={
              "d-flex flex-row justify-content-around align-items-center mt-2"
            }
          >
            <div className={"position-relative"}>
              <div
                style={{
                  width: 0,
                  borderLeft: "solid transparent 36px",
                  borderRight: "solid transparent 36px",
                  borderBottom: "solid gold 52px",
                }}
                className={"position-relative"}
              >
                <span
                  style={{
                    left: -22,
                    top: 27,
                    fontSize: "14px",
                  }}
                  className={"position-absolute"}
                >
                  Course
                </span>
              </div>
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                background: "lightgreen",
              }}
              className={"d-flex align-items-center justify-content-center"}
            >
              <span>Topic</span>
            </div>
            <div
              style={{
                width: 52,
                height: 52,
                background: "lightblue",
                borderRadius: "50%",
              }}
              className={"d-flex align-items-center justify-content-center"}
            >
              <span>Video</span>
            </div>
          </div>
          <b className={"mt-3"}>Completion:</b>
          <div
            className={
              "d-flex flex-row justify-content-center align-items-center"
            }
          >
            0%
            <div
              className={"mt-1 border border-dark rounded mx-2"}
              style={{
                height: 12,
                width: "100%",
                background: `linear-gradient(90deg, ${completionGradientRgb[0]}, ${completionGradientRgb[1]})`,
              }}
            />
            100%
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
