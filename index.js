import * as readline from "node:readline/promises";
import { stdin, stdout } from "process";
import os from "os";
import { getUsername } from "./helpers.js";

const homeDir = os.userInfo().homedir;
const username = getUsername(process.argv);

function init() {
  console.log(`Welcome to the File Manager, ${username}!`);

  const rl = readline.createInterface(stdin, stdout);

  rl.on("line", (line) => {
    if (line === "cd") {
      console.log(username);
      rl.prompt();
    }

    if (line === ".exit") {
      rl.close();
    }
  });

  rl.on("close", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
}

init();
