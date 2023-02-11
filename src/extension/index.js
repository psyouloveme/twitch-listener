const {requireService} = require('nodecg-io-core');

function onJoin(nodecg, client) {
	nodecg.log.info('ok setting up');

	const twitchChannel = nodecg.Replicant('twitchChannel');

	nodecg.log.info(`Connected to twitch channel "${twitchChannel.value}"`);

	client.onMessage((chan, user, message, _msg) => {
		const emotes = _msg.parseEmotes();
		const parsedEmotes = emotes.map(curr => {
			if (curr.type === 'emote') {
				return {
					...curr,
					displayInfo: curr.displayInfo.getUrl({
						animationSettings: 'default',
						backgroundType: 'dark',
						size: '1.0'
					})
				};
			}

			return {
				...curr
			};
		});

		if (chan.toLowerCase() === twitchChannel.value.toLowerCase()) {
			nodecg.sendMessage(
				'ChatReceived',
				{user, message, msgobj: parsedEmotes},
				err => {
					if (err) {
						console.error(err);
					}
				}
			);
		}
	});

	function sendChatMessage(msg) {
		client.say(twitchChannel.value, msg);
	}

	nodecg.listenFor('SendChatMessage', sendChatMessage);

	nodecg.listenFor('DisconnectTwitch', () => {
		const twitchConnected = nodecg.Replicant('twitchConnected');
		if (twitchConnected.value) {
			nodecg.log.info('Disconnecting twitch');
			const twitchConnected = nodecg.Replicant('twitchConnected');
			twitchConnected.value = false;
			nodecg.unlisten('SendChatMessage', sendChatMessage);
			client.part(twitchChannel.value);
		}
	});

	const twitchConnected = nodecg.Replicant('twitchConnected');
	twitchConnected.value = true;
}

function joinChannel(nodecg, client, channel) {
	nodecg.log.info('actually doing join to ', channel);

	if (channel) {
		let channelToJoin = channel;
		if (!channelToJoin.startsWith('#')) {
			channelToJoin = '#' + channelToJoin;
		}

		nodecg.log.info('doing it for real', channel);

		client
			.join(channelToJoin)
			.then(() => onJoin(nodecg, client))
			.catch(reason => {
				nodecg.log.error(`Couldn't connect to twitch: ${reason}.`);
				const twitchConnected = nodecg.Replicant('twitchConnected');
				twitchConnected.value = false;
			});
	}
}

function setupTwitchChat(nodecg, client) {
	nodecg.log.info('Setting up Twitch Chat service.');
	const twitchChannel = nodecg.Replicant('twitchChannel');

	if (twitchChannel.value) {
		nodecg.log.info('Read existing channel, starting wtih ', twitchChannel.value);
		joinChannel(nodecg, client, twitchChannel.value);
	}

	nodecg.listenFor('ConnectTwitch', () => {
		const twitchConnected = nodecg.Replicant('twitchConnected');
		if (!twitchConnected.value && twitchChannel.value) {
			nodecg.log.info('got connect channel, connecting to ', twitchChannel.value);
			joinChannel(nodecg, client, twitchChannel.value);
		}
	});
	nodecg.log.info('Done setting up Twitch Chat service.');
}

function teardownTwitchChat(nodecg) {
	nodecg.log.info('Tearing down Twitch Chat service.');
	const twitchConnected = nodecg.Replicant('twitchConnected');
	twitchConnected.value = false;
	nodecg.log.info('Done tearing down Twitch Chat service.');
}

module.exports = function (nodecg) {
	nodecg.Replicant('twitchChannel', {
		defaultValue: ''
	});
	nodecg.Replicant('twitchConnected', {
		defaultValue: false
	});
	nodecg.log.info('Twitch extension starting.');

	const twitchChat = requireService(nodecg, 'twitch-chat');

	twitchChat.onAvailable(async tcClient => {
		setupTwitchChat(nodecg, tcClient);
	});

	twitchChat.onUnavailable(async () => teardownTwitchChat(nodecg));
};
