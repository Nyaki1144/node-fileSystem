import stream from "stream/promises";
import fs from "fs";

const copy = async (oldDir, newDir) => {
  console.log(oldDir, "oldDir");
  console.log(newDir, "newDir");
  try {
    await stream.pipeline(
      fs.createReadStream(oldDir),
      fs.createWriteStream(newDir)
    );
  } catch (error) {
    console.log(error.message);
    console.log("FS operation failed");
  }
};

export { copy };
