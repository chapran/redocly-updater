#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const child_process = require("child_process");

const {
  createBranch,
  commitAndPushUpdates,
  deleteBranch,
} = require("./lib/git");

async function update() {
  const { p, v, remoteName } = yargs(hideBin(process.argv)).argv;

  await createBranch(p);
  child_process.execSync(`npm install ${p}@${v}`, { stdio: [0, 1, 2] }); // TODO: handle error if version or project does not exist

  await commitAndPushUpdates(p, v, remoteName); // TODO: handle error if branch cannot be pushed
  await deleteBranch(p);
  // TODO: add PR creation
}

update();
