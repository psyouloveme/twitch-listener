const twitchConnected = nodecg.Replicant('twitchConnected');
const twitchChannel = nodecg.Replicant('twitchChannel');

function onDisconnect() {
	nodecg.sendMessage('DisconnectTwitch');
}

function onConnect() {
	let channelName = document.getElementById('channelName').value;
	if (channelName && !channelName.startsWith('#')) {
		channelName = '#' + channelName;
		document.getElementById('channelName').value = channelName;
	}

	twitchChannel.value = channelName;
	nodecg.sendMessage('ConnectTwitch');
}

function setTwitchStatus(isConnected) {
	console.log('setting twitch staths to', isConnected);

	if (isConnected) {
		document.getElementById('twitch-status').innerText = 'Connected';
		document.getElementById('submitDisconnect').removeAttribute('disabled');
		document.getElementById('submitConnect').setAttribute('disabled', 'true');
		document.getElementById('channelName').setAttribute('readonly', 'true');
		document.getElementById('channelName').setAttribute('disabled', 'true');
	} else {
		document.getElementById('twitch-status').innerText = 'Disconnected';
		document.getElementById('submitConnect').removeAttribute('disabled',);
		document.getElementById('submitDisconnect').setAttribute('disabled', 'true');
		document.getElementById('channelName').removeAttribute('readonly');
		document.getElementById('channelName').removeAttribute('disabled',);
	}
}

NodeCG.waitForReplicants(twitchConnected).then(() => {
	console.log('got connected replicant', twitchConnected.value);
	setTwitchStatus(twitchConnected.value === true);

	NodeCG.waitForReplicants(twitchChannel).then(() => {
		console.log('got channel replicant', twitchChannel.value);
		document.getElementById('channelName').value = twitchChannel.value;

		twitchChannel.on('change', nextVal => {
	    console.log('channel changed to', nextVal);
			document.getElementById('channelName').value = nextVal;
		});
	});

	twitchConnected.on('change', nextVal => {
	    console.log('connected changed to', nextVal);
		setTwitchStatus(nextVal);
	});

	document.getElementById('submitConnect').addEventListener('click', () => {
		onConnect();
	});
	document.getElementById('submitDisconnect').addEventListener('click', () => {
		onDisconnect();
	});
});

