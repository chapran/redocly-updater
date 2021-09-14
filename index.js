#!/usr/bin/env node
const fs = require("fs").promises;
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { createBranch, commitAndPushUpdates } = require("./lib/git");

async function update() {
  const { p, v, remoteName } = yargs(hideBin(process.argv)).argv;

  await createBranch(p);
  const jsonPath = `${process.cwd()}/package.json`; // TODO: change to regular npm i command

  const pckgJson = require(jsonPath);

  if (!pckgJson.dependencies) {
    pckgJson.dependencies = {};
  }

  pckgJson.dependencies[p] = v;

  await fs.writeFile(jsonPath, JSON.stringify(pckgJson, null, 2));

  await commitAndPushUpdates(p, v, remoteName)
}

update();
