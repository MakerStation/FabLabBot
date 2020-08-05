const roles = require('./roles.json').roles;
const projects = require('./projects.json').projects;
const colors = require('./colors.json').colors;

const role = {
	'ids': {},
	'names': {},
	'descriptions': {},
	'projects': {},
	'colors': {},
};

for (let i = 0; i < roles.length; i++) {
	role['ids'][roles[i].tag] = roles[i].id;
	role['names'][roles[i].tag] = roles[i].name;
	role['descriptions'][roles[i].tag] = roles[i].description;
	role['projects'][roles[i].tag] = roles[i].projects;
	role['colors'][roles[i].tag] = roles[i].color;
}

const project = {
	'ids': {},
	'names': {},
};

for (let i = 0; i < projects.length; i++) {
	project['ids'][projects[i].tag] = projects[i].id;
	project['names'][projects[i].tag] = projects[i].name;
}

const color = {};

for (let i = 0; i < colors.length; i++) {
	color[colors[i].tag] = colors[i].color;
}

exports.checkRole = (message, roleTag) => {
	if (message.member.roles.member._roles.includes(role['ids'][roleTag])) return true;
	else return false;
};

exports.wrongCommand = (message) => message.channel.send('The command doesn\'t exist');

exports.argumentMissing = (message) => message.channel.send('Missing argument');

exports.missingRole = (message) => message.channel.send('You don\'t have the permission to execute this command');

exports.role = role;
exports.project = project;
exports.color = color;