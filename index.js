const discord = require('discord.js');
const config = require('./config.json');

const command = require('./command.js');
const firstMessage = require('./first-message.js');
const privateMessage = require('./private-message.js');

const client = new discord.Client();

client.on('ready', () => {
	console.log('Bot is ready!');

	// ---> Commands <--- //
	command(client, ['ping', 'test'], (message) => {
		message.channel.send('Pong!');
	});
	command(client, 'servers', message => {
		client.guilds.cache.forEach((guild) => {
			message.channel.send(`${guild.name} has a total of ${guild.memberCount} members!`);
		});
	});
	command(client, ['cc', 'clearchannel'], message => {
		if(message.member.hasPermission('ADMINISTRATOR')) {
			message.channel.messages.fetch().then((results) => {
				message.channel.bulkDelete(results);
			});
		}
	});
	command(client, 'status', message => {
		// Updates the status to the default status
		client.user.setPresence({
			activity: {
				name: 'auf !sbs help',
				type: 2
			}
		});
		
		message.channel.send('Successfully updated my status!');
	});

	command(client, 'embed', message => {
		const embed = new discord.MessageEmbed()
			.setTitle('Example Embed')
			.setColor(0x0047BB)
			.setURL('https://twitch.tv/gmasterhd')
			.setAuthor(message.author.username)

		message.channel.send(embed);
	});
});

client.login(config.token);
