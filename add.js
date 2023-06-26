import path from "node:path";
import fs from "fs/promises";

const add = async (filePath, fileName) => {
  try {
    await fs.writeFile(path.join(filePath, fileName), "", { flag: "wx" });
  } catch (error) {
    console.log("FS operation failed");
  }
};

export { add };
