const path = require("path");
const nodegit = require("nodegit");

const DEFAULT_REMOTE_NAME = "origin";

const getRepo = () =>
  nodegit.Repository.open(path.resolve(process.cwd(), ".git"));

const createCommitMessage = (name, version) =>
  `Bump ${name} to version ${version}`;

const getBranchName = (name) => `bump-${name}`;

module.exports.createBranch = async (package) => {
  console.log("Creating new git branch...");

  const repo = await getRepo();

  // Create a new branch on head
  const commit = await repo.getHeadCommit();
  const branchRef = await repo.createBranch(
    getBranchName(package),
    commit,
    0
  );
  await repo.checkoutBranch(branchRef);
};

module.exports.commitAndPushUpdates = async (package, version, remoteName) => {
  console.log("Committing updates...");

  const repo = await getRepo();
  const index = await repo.refreshIndex();

  await index.addByPath("package.json");
  await index.addByPath('package-lock.json');
  await index.write();
  const oid = await index.writeTree();

  const parent = await repo.getHeadCommit();
  const author = await repo.defaultSignature();
  const committer = await repo.defaultSignature();

  await repo.createCommit(
    "HEAD",
    author,
    committer,
    createCommitMessage(package, version),
    oid,
    [parent]
  );

  const remote = await repo.getRemote(remoteName || DEFAULT_REMOTE_NAME);
  const ref = `refs/heads/${getBranchName(package)}`;
  await remote.push([`${ref}:${ref}`], {
    callbacks: {
      credentials: (url, userName) => nodegit.Cred.sshKeyFromAgent(userName),
    },
  });
};

module.exports.deleteBranch = async (package) => {
  console.log('Removing the local branch...')
  const branch = getBranchName(package);

  const repo = await getRepo();
  const masterRef = await repo.getBranch('master');
  await repo.checkoutBranch(masterRef);

  const updateBranchRef = await repo.getBranch(branch)
  await updateBranchRef.delete()
}
