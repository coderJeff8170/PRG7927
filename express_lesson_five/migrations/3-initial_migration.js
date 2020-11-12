'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "DOB" from table "actor"
 * changeColumn "actor_id" on table "actor"
 * changeColumn "actor_id" on table "actor"
 *
 **/

var info = {
    "revision": 3,
    "name": "initial_migration",
    "created": "2020-11-12T02:20:05.956Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["actor", "DOB"]
    },
    {
        fn: "changeColumn",
        params: [
            "actor",
            "actor_id",
            {
                "type": Sequelize.INTEGER.UNSIGNED,
                "field": "actor_id",
                "primaryKey": true,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "actor",
            "actor_id",
            {
                "type": Sequelize.INTEGER.UNSIGNED,
                "field": "actor_id",
                "primaryKey": true,
                "allowNull": false
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
