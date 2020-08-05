const {
	role,
	project,
	color,
} = require('../functions.js');

const roles = require('../roles.json').roles;

exports.printRoles = (message, embed) => {

	const BLACK = [0, 0, 0];
	let currentColor = BLACK;
	const userRoles = message.member.roles.member._roles;

	embed.setTitle('Your roles')
		.setThumbnail(message.author.avatarURL());

	for (let i = 0; i < 8; i++) {
		const tag = roles[i].tag;
		const id = role['ids'][tag];
		if (userRoles.includes(id) && role['projects'][tag] == undefined) {
			embed.addField(role['names'][tag], role['descriptions'][tag]);
			if (currentColor == BLACK) currentColor = color[role['colors'][tag]];
		}
		else if (userRoles.includes(id)) {
			let description = role['descriptions'][tag];
			role['projects'][tag].forEach(element => {
				if (userRoles.includes(project['ids'][element])) {
					description += '\n- ' + project['names'][element];
				}
			});
			embed.addField(role['names'][tag], description);
			if (currentColor == BLACK) currentColor = color[role['colors'][tag]];
		}
	}

	embed.setColor(currentColor);

	message.channel.send(embed);

};