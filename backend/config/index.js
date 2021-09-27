'use strict'
var config=require('./config.js');
const Sequelize = require('sequelize');

module.exports={
	name: 'rest-api',
	hostname: 'http://localhost:',
	version: '0.0.1',
	uri:new Sequelize(config.development.database, config.development.username, config.development.password, {
	  host: config.development.host,
	  dialect: config.development.dialect
	})
}