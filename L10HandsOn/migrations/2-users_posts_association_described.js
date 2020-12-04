'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "userUserId" to table "posts"
 * changeColumn "UserId" on table "posts"
 * changeColumn "UserId" on table "posts"
 * changeColumn "UserId" on table "posts"
 * changeColumn "UserId" on table "posts"
 *
 **/

var info = {
    "revision": 2,
    "name": "users_posts_association_described",
    "created": "2020-12-04T18:30:25.390Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "posts",
            "userUserId",
            {
                "type": Sequelize.INTEGER,
                "field": "userUserId",
                "onUpdate": "CASCADE",
                "onDelete": "SET NULL",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "posts",
            "UserId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "users",
                    "key": "UserId"
                },
                "allowNull": true,
                "field": "UserId"
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
