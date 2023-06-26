import * as readline from "node:readline/promises";
import { stdin, stdout } from "process";
import path from "path";

import os from "os";
import { getUsername, isExist } from "./helpers.js";
import { getDirList } from "./ls.js";
import { levlUp } from "./up.js";
import { levlDown } from "./cd.js";
import { cat } from "./cat.js";
import { add } from "./add.js";
import { rename } from "./rn.js";
import { copy } from "./cp.js";

let homeDir = os.userInfo().homedir;
const username = getUsername(process.argv);

async function init() {
  console.log(`Welcome to the File Manager, ${username}!`);
  console.log(`You are currently in ${homeDir}`);

  const rl = readline.createInterface(stdin, stdout);

  rl.on("line", async (line) => {
    const [comand, ...arg] = [...line.split(" ")];
    if (comand === "cd") {
      const dir = await levlDown(line, homeDir);
      const tmpDir = dir;
      if (await isExist(dir)) {
        homeDir = dir;
        console.log(`You are currently in ${dir}`);
      } else {
        homeDir = tmpDir;
        console.log(`${dir} is not exist`);
        console.log(`You are currently in ${homeDir}`);
      }
    }

    if (comand === "add") {
      if (await isExist(homeDir)) {
        await add(homeDir, arg[0]);
        console.log(`You are currently in ${homeDir}`);
      } else {
        console.log(`${arg[0]} file is not exist`);
        console.log(`You are currently in ${homeDir}`);
      }
    }

    if (comand === "rn") {
      if (await isExist(homeDir)) {
        await rename(homeDir, arg[0], arg[1]);
        console.log(`You are currently in ${homeDir}`);
      } else {
        console.log(`${arg[0]} file is not exist`);
        console.log(`You are currently in ${homeDir}`);
      }
    }

    if (comand === "ls") {
      console.table(await getDirList(homeDir));
      console.log(`You are currently in ${homeDir}`);
    }

    if (comand === "copy") {
      const oldPath = path.join(homeDir, arg[0]);
      const newPath = path.join(arg[1], arg[0]);
      await copy(oldPath, newPath);
    }

    if (comand === "up") {
      homeDir = levlUp(homeDir);
      console.log(`You are currently in ${homeDir}`);
    }

    if (comand === "cat") {
      const str = path.join(homeDir, arg[0]);
      console.log(arg[0]);
      if (await isExist(str)) {
        await cat(str);
        console.log(`You are currently in ${homeDir}`);
      } else {
        console.log(`${arg[0]} file is not exist`);
        console.log(`You are currently in ${homeDir}`);
      }
    }

    if (comand === ".exit") {
      rl.close();
    }
  });

  rl.on("close", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  });
}

init();
