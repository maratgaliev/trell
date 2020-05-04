const CLI = require('clui');
const git = require('simple-git/promise');
const Spinner = CLI.Spinner;

module.exports = {
  getCommits: async (workingDir) => {
    const status = new Spinner('Loading data, please wait...');
    status.start();
    try {
      let statusSummary = null;
      try {
        // TODO: temporary set commits count
        statusSummary = await git(workingDir).log({n: 5});
      }
      catch (e) {
        console.log('Error reading git commits history')
      }
      return statusSummary;
    } finally {
      status.stop();
    }
  },
};