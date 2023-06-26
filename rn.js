import path from "path";
import fs from "fs/promises";

const rename = async (dir, oldName, newName) => {
  try {
    const wrongFilename = path.resolve(dir, oldName);
    const correctFilename = path.resolve(dir, newName);

    await fs.rename(wrongFilename, correctFilename);
  } catch (error) {
    console.log("FS operation failed");
  }
};

export { rename };
