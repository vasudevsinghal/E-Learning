import React, { useState } from "react";
import { Stack } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import { BiChevronsDown, BiChevronsUp } from "react-icons/bi";
import { MuiColorInput } from "mui-color-input";

const Index = ({ colors, className, setColors }) => {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const onColorChange = (color, key, watched) => {
    setColors((prev) => {
      return { ...prev, [key]: { ...prev[key], [watched]: color } };
    });
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
          className={"px-2 pb-2"}
          style={{
            maxHeight: "calc(90vh - 140px)",
            maxWidth: "calc(100vw - 16px)",
          }}
        >
          {Object.keys(colors).map(
            (k) =>
              k !== "name" && (
                <Stack direction={"vertical"} key={k}>
                  <b style={{ marginBottom: 1, marginTop: 3 }}>{k}:</b>
                  {Object.keys(colors[k]).map((w) => (
                    <Stack
                      direction={"horizontal"}
                      className={"justify-content-between ps-1"}
                      key={`${k} ${w}`}
                    >
                      <MuiColorInput
                        value={colors[k][w]}
                        label={w === "true" ? "Watched" : "Not Watched"}
                        sx={{ mt: 1 }}
                        size={"small"}
                        fullWidth={true}
                        onChange={(value) => {
                          onColorChange(value, k, w);
                        }}
                        isAlphaHidden={true}
                      />
                    </Stack>
                  ))}
                </Stack>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
