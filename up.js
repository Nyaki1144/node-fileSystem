import path from "path";

function levlUp(dir) {
  const dirSep = dir.split(path.sep);
  if (dirSep.length !== 1) {
    dirSep.pop();
  }
  return path.join(...dirSep);
}

export { levlUp };
