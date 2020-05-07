const inquirer = require('inquirer');

module.exports = {
  askTrelloCredentials: () => {
    const questions = [
      {
        name: 'token',
        type: 'input',
        message: 'Enter your Trello token:',
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your token';
          }
        }
      },
      {
        name: 'key',
        type: 'input',
        message: 'Enter your Trello key:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your key';
          }
        }
      },
      {
        name: 'board',
        type: 'input',
        message: 'Enter your Trello board name:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your board name';
          }
        }
      },
      {
        name: 'list',
        type: 'input',
        message: 'Enter your Trello list name:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your list name';
          }
        }
      }
    ];
    return inquirer.prompt(questions);
  },
  askGitDetails: () => {
    const questions = [
      {
        name: 'repo',
        type: 'input',
        message: 'Enter your project repo path:',
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your project repo path';
          }
        }
      },
    ];
    return inquirer.prompt(questions);
  },
  askCommitsChoose: (options) => {
    const questions = [
      {
        name: 'commits',
        type: 'checkbox',
        options,
        choices: [
          new inquirer.Separator(' = COMMITS = '),
          {
            name: 'Pepperoni'
          },
          {
            name: 'Ham'
          },
          {
            name: 'Ground Meat'
          },
          {
            name: 'Bacon'
          }
        ],
        validate: function(value) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter your project repo path';
          }
        }
      },
    ];
    return inquirer.prompt(questions);
  },
};