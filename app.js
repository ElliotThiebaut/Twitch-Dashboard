const client = new tmi.Client({
	options: { debug: true },
	connection: { reconnect: true },
	identity: {
		username: USERNAME,
		password: TWITCH_TOKEN
	},
	channels: [ 'ponce' ]
});

client.connect();

let numberMessage = 0;
let seconds = 0;
let msgPerSec = 0;
let msgPerMin = 0;

client.on('message', (channel, tags, message, self) => {
	// Ignore echoed messages.
	if (self) return;

	let node = document.createElement('li');
	node.innerHTML = `<span class="chat-username">${tags.username}</span> : ${message}`;

	chatList.appendChild(node);

	numberMessage++;
	numberOfMessage.innerHTML = numberMessage;
	channelName.innerHTML = channel;

	msgPerSec = (numberMessage / seconds).toFixed(2);
	msgPerMin = (msgPerSec * 60).toFixed(2);
	MessagePerSec.innerHTML = msgPerSec;
	messagePerMin.innerHTML = msgPerMin;

	chat.scrollTop = chat.scrollHeight;
});

setInterval(function() {
	seconds++;
}, 1000);
