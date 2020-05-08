const CLI = require('clui');
const Configstore = require('configstore');
const Spinner = CLI.Spinner;

const interactions = require('./interactions');
const Trello = require("trello");

module.exports = {
  createRelease: async (name, description) => {
    const credentials = await interactions.askTrelloCredentials();
    var apiKey = process.env.TRELLO_API_KEY || credentials.key;
    var oauthToken = process.env.TRELLO_OAUTH_TOKEN || credentials.token;
    let trello = null;

    try {
      trello = new Trello(apiKey, oauthToken);
      const status = new Spinner('Loading data, please wait...');
      status.start();
  
      try {
        var boardsPromise = trello.getBoards('me');
        
        boardsPromise.then((data) => {
          const boards = data.filter(function (el) {
            return el.name === credentials.board;
          });
          if (boards.length) {
            var listsPromise = trello.getListsOnBoard(boards[0].id);
            listsPromise.then((data) => {
              const list = data.filter(function (el) {
                return el.name === credentials.list;
              });
              if (list.length) {
                
                var labelsPromise = trello.getLabelsForBoard(boards[0].id);
                var membersPromise = trello.getBoardMembers(boards[0].id);
                
                labelsPromise.then((labels) => {
                  const labelsArr = labels.filter(function (el) {
                    return el.color === credentials.label;
                  });

                  if (!labelsArr.length) {
                    console.log('Label not found')
                  }

                  membersPromise.then((membersData) => {
                    var extraParams = {
                      desc: description,
                      idMembers: membersData.map((val) => { return val.id }),
                      idLabels: labelsArr.length ? [labelsArr[0].id] : []
                    };
    
                    var cardPromise = trello.addCardWithExtraParams(name, extraParams, list[0].id);
    
                    cardPromise.then((data) => {
                      console.log('New release created: ' + data.shortUrl)
                    });
                  });
                  
                });
              } else {
                console.log('List not found')
              }
            });
          } else {
            console.log('Board not found')
          }
        });
      } finally {
        status.stop();
      }
    } catch(err) {
      console.log(err)
      console.log("Invalid credentials for Trello API")
    }
  }
};