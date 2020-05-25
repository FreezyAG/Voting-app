const Sequelize = require ("sequelize");

const sequelize = require ('../util/database');

const Ballot = sequelize.define('ballot', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    inSupport: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    against: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    totalVotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    votersDesignation: {
        type: Sequelize.STRING,
        defaultValue: 'all'
    }
});

module.exports = Ballot;