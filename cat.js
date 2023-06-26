import { pipeline } from "stream/promises";
import { Writable } from "stream";

import fs from "fs";

async function cat(dir) {
  try {
    await pipeline(fs.createReadStream(dir), output());
  } catch (error) {
    console.log(error.message);
  }
}

function output() {
  return new Writable({
    decodeStrings: false,
    write(chunk, _, cb) {
      const textChunk = chunk.toString();
      console.log(textChunk);
      cb();
    },
  });
}

export { cat };
