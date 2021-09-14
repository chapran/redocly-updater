const { Bitbucket } = require("bitbucket");

const clientOptions = {
  baseUrl: "https://api.bitbucket.org/2.0",
  request: {
    timeout: 2000,
  },
  auth: {
    token: ''
  }
};

const bitbucket = new Bitbucket(clientOptions);

module.exports.createPR = () => // TODO: does not work
  bitbucket.pullrequests.create({
    repo_slug: "rand-proj",
    workspace: "andriy_chapran",
    _body: {
      title: "Bump bla",
      source: {
        branch: {
          name: "bump-react",
        },
      },
      destination: {
        branch: {
          name: "master",
        },
      },
    },
  });

module.exports.createPR();
