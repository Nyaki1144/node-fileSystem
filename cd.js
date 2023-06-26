import path from "path";
import { getDirList } from "./ls.js";

async function levlDown(line, homeDir) {
  const arg = line.split(" ")[1];
  const directory = [];
  if (!path.isAbsolute(arg)) {
    const dir = await getDirList(homeDir);
    dir.forEach((el) => {
      if (el.type === "directory") directory.push(el.name);
    });

    if (directory.indexOf(arg)) {
      homeDir = path.join(homeDir, arg);
    }
  } else {
    homeDir = arg;
  }
  return homeDir;
}

export { levlDown };
