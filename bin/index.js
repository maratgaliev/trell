#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const datefns = require('date-fns');
const interactions = require('../lib/interactions');
const Haikunator = require('haikunator');

const figlet = require('figlet');
const board = require('../lib/board');
const repo = require('../lib/repo');

var haikunator = new Haikunator({
  defaults: {
    tokenLength: 0
  }
})

clear();

console.log(
  chalk.yellow(
    figlet.textSync('TRELL', { horizontalLayout: 'full' })
  )
);

const run = async () => {
  const workingDir = await interactions.askGitDetails();
  repo.getCommits(workingDir.repo).then(status => {
    const descr = status.all.map((val) => { return val.message }).join('\n');
    const commits = await interactions.askCommitsChoose(options);

    board.createRelease(datefns.format(new Date(), 'dd.MM.yyyy') + " - " + haikunator.haikunate(), descr);
  });
};

run();

