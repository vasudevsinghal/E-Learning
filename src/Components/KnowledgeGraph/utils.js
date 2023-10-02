import axios from "axios";
import BACKEND_URL from "../../url";

export const isValidUrl = (urlString) => {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

export const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const deepEqual = (x, y) => {
  const ok = Object.keys,
    tx = typeof x,
    ty = typeof y;
  return x && y && tx === "object" && tx === ty
    ? ok(x).length === ok(y).length &&
        ok(x).every((key) => deepEqual(x[key], y[key]))
    : x === y;
};

export const changeTreesToGraph = (data, adapter, idKey = "_id"): GraphData => {
  const nodes: NodeObject[] = [];
  const links: LinkObject[] = [];
  data = data instanceof Array ? data : [data];

  for (const roots in data) {
    if (!Object.keys(data[roots]).includes(idKey)) {
      throw Error("Invalid Root Node, required field: " + idKey);
    }
    const dfs = [adapter(data[roots])];
    while (dfs.length !== 0) {
      const cur = dfs.pop();
      let newNode = undefined;
      newNode = { id: cur[idKey] };
      for (const key in cur) {
        const val = cur[key];
        if (val instanceof Array) {
          for (const linkIndex in val) {
            const link = adapter(val[linkIndex]);
            if (link instanceof Object && Object.keys(link).includes(idKey)) {
              dfs.push(val[linkIndex]);
              links.push({
                source: newNode.id,
                target: link[idKey],
                name: key,
              });
            } else {
              nodes.push({ id: link, name: link });
              links.push({ source: newNode.id, target: link });
            }
          }
        } else {
          newNode[key] = val;
        }
      }
      nodes.push(newNode);
    }
  }
  return {
    nodes: nodes,
    links: links,
  };
};

export const binarySearch = ({ max, getValue, match }) => {
  let min = 0;

  while (min <= max) {
    let guess = Math.floor((min + max) / 2);
    const compareVal = getValue(guess);

    if (compareVal === match) return guess;
    if (compareVal < match) min = guess + 1;
    else max = guess - 1;
  }

  return max;
};

export const fitString = (ctx, str, maxWidth) => {
  let width = ctx.measureText(str).width;
  const ellipsis = "…";
  const ellipsisWidth = ctx.measureText(ellipsis).width;
  if (width <= maxWidth || width <= ellipsisWidth) {
    return str;
  }

  const index = binarySearch({
    max: str.length,
    getValue: (guess) => ctx.measureText(str.substring(0, guess)).width,
    match: maxWidth - ellipsisWidth,
  });

  return str.substring(0, index) + ellipsis;
};

const generatedColors = new Set();

function generateRandomColor(red, green, blue) {
  if (red === undefined) {
    red = Math.floor(Math.random() * 64);
  }
  if (green === undefined) {
    green = Math.floor(Math.random() * 64);
  }
  if (blue === undefined) {
    blue = Math.floor(Math.random() * 64);
  }
  return `rgb(${red},${green},${blue})`;
}

export function generateRandomColorPair() {
  let color1 = generateRandomColor(255);
  let color2 = generateRandomColor(undefined, 255);

  while (generatedColors.has(color1)) {
    color1 = generateRandomColor(255);
  }
  while (generatedColors.has(color2)) {
    color2 = generateRandomColor(undefined, 255);
  }

  generatedColors.add(color1);
  generatedColors.add(color2);

  return [color2, color1];
}

export const fetchKg = async (apiSlug, onFetched) => {
  try {
    const fetchedResult = await axios.get(`${BACKEND_URL}${apiSlug}`);
    if (fetchedResult.data !== undefined && fetchedResult.data.success) {
      const data = fetchedResult.data["kg"];
      onFetched(data);
    } else {
      console.error("Failed To Load Data, Returned: ", fetchedResult.data);
    }
  } catch (err) {
    console.log(err);
  }
};
