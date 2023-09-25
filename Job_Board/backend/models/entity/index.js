const mysql = require("mysql2/promise");
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const db = {};

const sequelize = new Sequelize(
    process.env.DB,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: process.env.DIALECT,
    }
);
db.sequelize = sequelize;
db.Users = require("./Users")(sequelize, DataTypes);
db.Applications = require("./Applications")(sequelize, DataTypes);
db.Jobs = require("./Jobs")(sequelize, DataTypes);
db.sequelize.sync({ force: false }).then(() => {
    console.log("re-sync done");
});

module.exports = db;