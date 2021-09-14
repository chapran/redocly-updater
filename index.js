#!/usr/bin/env node
const fs = require("fs").promises;

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

async function update() {
  const { p, v } = yargs(hideBin(process.argv)).argv;
  const jsonPath = `${process.cwd()}/package.json`;

  const pckgJson = require(jsonPath);

  if (!pckgJson.dependencies) {
    pckgJson.dependencies = {};
  }

  pckgJson.dependencies[p] = v;

  await fs.writeFile(jsonPath, JSON.stringify(pckgJson, null, 2));
}

update();
