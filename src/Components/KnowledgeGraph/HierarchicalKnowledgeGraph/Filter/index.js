import React, { useRef, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import { Autocomplete, Fade, Popper, TextField, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { BiChevronsDown, BiChevronsUp } from "react-icons/bi";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { OpenInFull } from "@mui/icons-material";
const Filter = ({ data, selectedNode, setSelectedNode }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={"position-relative w-100"} style={{ zIndex: 1 }}>
      <Stack
        className={`position-absolute w-100 ${!open && "shadow-sm"}`}
        style={{
          background: "rgba(248,249,250, 0.95)",
          backdropFilter: "blur(1px)",
        }}
      >
        <Popper
          id={"pop"}
          open={open}
          anchorEl={ref.current}
          transition
          className={"w-100 pt-1"}
          style={{ zIndex: 1 }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Stack
                className={`w-100 pt-2 ${open && "shadow-sm"}`}
                style={{
                  background: "rgba(248,249,250, 0.95)",
                  backdropFilter: "blur(1px)",
                }}
              >
                <Container className={"px-4"}>
                  <Stack
                    direction={"horizontal"}
                    className={"flex-wrap mb-2"}
                    gap={2}
                  >
                    <Autocomplete
                      id="find-course-auto-complete"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Find Course"
                          placeholder="Courses"
                        />
                      )}
                      getOptionLabel={(option) => option.name}
                      onChange={(e, value) => {
                        setSelectedNode(value === null ? undefined : value);
                      }}
                      value={
                        selectedNode === undefined
                          ? null
                          : selectedNode.type === "course"
                          ? selectedNode
                          : null
                      }
                      renderOption={(props, option) => (
                        <li {...props}>
                          {option.collapsed ? (
                            <OpenInFull sx={{ pr: 1 }} />
                          ) : (
                            <CloseFullscreenIcon sx={{ pr: 1 }} />
                          )}
                          {option.name}
                        </li>
                      )}
                      options={data["nodes"].filter(
                        (node) => node.type === "course"
                      )}
                      className={"flex-grow-1"}
                      style={{ width: 250 }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                    />
                    <Autocomplete
                      id="find-topic-auto-complete"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Find Topic"
                          placeholder="Topics"
                        />
                      )}
                      getOptionLabel={(option) => option.name}
                      onChange={(e, value) => {
                        setSelectedNode(value === null ? undefined : value);
                      }}
                      value={
                        selectedNode === undefined
                          ? null
                          : selectedNode.type === "topic"
                          ? selectedNode
                          : null
                      }
                      renderOption={(props, option) => (
                        <li {...props}>
                          {option.collapsed ? (
                            <OpenInFull sx={{ pr: 1 }} />
                          ) : (
                            <CloseFullscreenIcon sx={{ pr: 1 }} />
                          )}
                          {option.name}
                        </li>
                      )}
                      options={data["nodes"].filter(
                        (node) => node.type === "topic"
                      )}
                      className={"flex-grow-1"}
                      style={{ width: 250 }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                    />
                    <Autocomplete
                      id="find-video-auto-complete"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Find Video"
                          placeholder="Video"
                        />
                      )}
                      getOptionLabel={(option) =>
                        option.name + " (" + option.id + ")"
                      }
                      onChange={(e, value) => {
                        setSelectedNode(value === null ? undefined : value);
                      }}
                      value={
                        selectedNode === undefined
                          ? null
                          : selectedNode.type === "video"
                          ? selectedNode
                          : null
                      }
                      renderOption={(props, option) => (
                        <li {...props}>
                          {option.collapsed ? (
                            <OpenInFull sx={{ pr: 1 }} />
                          ) : (
                            <CloseFullscreenIcon sx={{ pr: 1 }} />
                          )}
                          {option.name}
                        </li>
                      )}
                      options={data["nodes"].filter(
                        (node) => node.type === "video"
                      )}
                      className={"flex-grow-1"}
                      style={{ width: 250 }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                    />
                  </Stack>
                </Container>
                <hr className={"m-0 p-0"} />
              </Stack>
            </Fade>
          )}
        </Popper>
        <Tooltip title={`${open ? "Hide" : "Show"} Filters`} followCursor>
          <Stack onClick={toggleDrawer} style={{ cursor: "pointer" }}>
            <Container className={"px-3 py-1 bg-transparent"}>
              <Stack
                className={"justify-content-between bg-transparent"}
                direction={"horizontal"}
              >
                <span className={"fs-5"}>Filter</span>
                <IconButton ref={ref} color={"primary"}>
                  {open && <BiChevronsUp />}
                  {!open && <BiChevronsDown />}
                </IconButton>
              </Stack>
            </Container>
          </Stack>
        </Tooltip>
        {!open && <hr className={"m-0 p-0"} />}
      </Stack>
    </div>
  );
};
export default Filter;
