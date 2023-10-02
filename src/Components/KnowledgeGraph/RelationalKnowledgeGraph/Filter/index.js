import React, { useRef, useState } from "react";
import { Container, Stack } from "react-bootstrap";
import {
  Autocomplete,
  Checkbox,
  Fade,
  Popper,
  TextField,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { BiChevronsDown, BiChevronsUp } from "react-icons/bi";

const Index = ({
  fullFilter,
  filter,
  setFilter,
  selectedNode,
  setSelectedNode,
  filteredNodes,
}) => {
  const [open, setOpen] = useState(false);
  const small = useMediaQuery("(min-width:576px)");
  const medium = useMediaQuery("(min-width:768px)");
  const large = useMediaQuery("(min-width:992px)");

  const nTags = () => {
    let n = 1;
    if (small) n += 1;
    if (medium) n += 1;
    if (large) n += 1;
    return n;
  };

  const ref = useRef();

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };
  const onFilterChange = (which, value) => {
    setFilter((prev) => ({ ...prev, [which]: value }));
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
                <Container className={"px-3"}>
                  <Stack
                    direction={"horizontal"}
                    className={"flex-wrap mb-2"}
                    gap={2}
                  >
                    <Autocomplete
                      id="find-video-auto-complete"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Find Video"
                          placeholder="Videos"
                        />
                      )}
                      getOptionLabel={(option) =>
                        option.name + " (" + option.id + ")"
                      }
                      onChange={(e, value) => {
                        setSelectedNode(value);
                      }}
                      value={selectedNode === undefined ? null : selectedNode}
                      renderOption={(props, option) => (
                        <li {...props}>{option.name}</li>
                      )}
                      options={filteredNodes}
                      className={"flex-grow-1"}
                      style={{ width: 400 }}
                    />
                    <Autocomplete
                      className={"flex-grow-1"}
                      style={{ width: 400 }}
                      multiple
                      limitTags={nTags()}
                      id="show-fields-auto-complete"
                      options={fullFilter.showFields}
                      defaultValue={fullFilter.showFields}
                      value={filter.showFields}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Show Fields"
                          placeholder="Field"
                        />
                      )}
                      disableCloseOnSelect={true}
                      onChange={(e, value) => {
                        onFilterChange("showFields", value);
                      }}
                    />
                    <Autocomplete
                      className={"flex-grow-1"}
                      style={{ width: 400 }}
                      multiple
                      limitTags={nTags()}
                      id="course-auto-complete"
                      options={fullFilter.courses}
                      defaultValue={fullFilter.courses}
                      value={filter.courses}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Courses"
                          placeholder="Course"
                        />
                      )}
                      disableCloseOnSelect={true}
                      onChange={(e, value) => {
                        onFilterChange("courses", value);
                      }}
                    />
                    <Autocomplete
                      className={"flex-grow-1"}
                      style={{ width: 400 }}
                      multiple
                      limitTags={nTags()}
                      id="watched-auto-complete"
                      options={fullFilter.watched}
                      defaultValue={fullFilter.watched}
                      value={filter.watched}
                      getOptionLabel={(option) => (option ? "True" : "False")}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option ? "True" : "False"}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Watched"
                          placeholder="Watched"
                        />
                      )}
                      disableCloseOnSelect={true}
                      onChange={(e, value) => {
                        onFilterChange("watched", value);
                      }}
                    />
                    <Autocomplete
                      className={"flex-grow-1"}
                      style={{ width: 400 }}
                      multiple
                      openOnFocus={true}
                      id="topics-auto-complete"
                      options={fullFilter.topics}
                      defaultValue={fullFilter.topics}
                      value={filter.topics}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Topics"
                          placeholder="Topics"
                        />
                      )}
                      limitTags={nTags()}
                      disableCloseOnSelect={true}
                      onChange={(e, value) => {
                        onFilterChange("topics", value);
                      }}
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
                  {open ? <BiChevronsUp /> : <BiChevronsDown />}
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
export default Index;
