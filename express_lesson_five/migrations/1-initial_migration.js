'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "actor", deps: []
 * addIndex "PRIMARY" to table "actor"
 * addIndex "idx_actor_last_name" to table "actor"
 *
 **/

var info = {
    "revision": 1,
    "name": "initial_migration",
    "created": "2020-11-09T22:28:36.073Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "actor",
            {
                "actor_id": {
                    "type": Sequelize.SMALLINT.UNSIGNED,
                    "field": "actor_id",
                    "primaryKey": true,
                    "allowNull": false,
                    "autoIncrement": true
                },
                "first_name": {
                    "type": Sequelize.STRING(45),
                    "field": "first_name",
                    "allowNull": false
                },
                "last_name": {
                    "type": Sequelize.STRING(45),
                    "field": "last_name",
                    "allowNull": false
                },
                "last_update": {
                    "type": Sequelize.DATE,
                    "field": "last_update",
                    "defaultValue": Sequelize.Literal,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "addIndex",
        params: [
            "actor",
            [{
                "name": "actor_id"
            }],
            {
                "indexName": "PRIMARY",
                "indicesType": "UNIQUE"
            }
        ]
    },
    {
        fn: "addIndex",
        params: [
            "actor",
            [{
                "name": "last_name"
            }],
            {
                "indexName": "idx_actor_last_name"
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
