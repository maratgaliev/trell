#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const datefns = require('date-fns');
const interactions = require('../lib/interactions');
const Haikunator = require('haikunator');
const inquirer = require('inquirer');
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
  let comments = Array();
  let statuses = Array();
  
  comments.push(new inquirer.Separator(' = COMMITS = '));
  
  repo.getCommits(workingDir.repo).then(status => {
    statuses = status.all.map((val) => { return `${val.message} (${datefns.format(datefns.parseISO(val.date), 'dd.MM.yyyy')}) | ${val.hash.substring(0,7)} | ${val.author_name} (${val.author_email})` });
    statuses.forEach(element => comments.push({ name: element }));

    const commitsAnswers = interactions.askCommitsChoose(statuses);
    commitsAnswers.then((data) => {
      const descr = data.commits.join('\n');
      board.createRelease(datefns.format(new Date(), 'dd.MM.yyyy') + " - " + haikunator.haikunate(), descr);
    });
  });
};

run();

