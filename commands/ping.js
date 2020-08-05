exports.ping = (message) => {

	const ping = Date.now() - message.createdTimestamp + ' ms';
	message.channel.send('Your ping is ' + ping);

};