import fs from "fs/promises";
import path from "path";

async function getDirList(dir) {
  try {
    const res = await fs.readdir(dir);
    const type = res.map((el) => {
      const type = path.parse(path.join(dir, el)).ext ? "files" : "directory";
      return { name: el, type: type };
    });

    return type;
  } catch (error) {
    console.error("ls ___ ", error);
  }
}

export { getDirList };
