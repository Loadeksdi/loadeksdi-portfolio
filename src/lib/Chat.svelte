<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	let socket: WebSocket;
	onMount(() => {
		socket = new WebSocket('wss://discord-bridge.loadeksdi.com/');
		socket.addEventListener('open', () => {
			console.log('Opened');
		});
		socket.onmessage = (event) => {
			chat += `[${new Date().toLocaleString()}] Loadeksdi: ${JSON.parse(event.data).text}\n`;
		};
	});
	let placeholder: string = 'Your nickname';
	let maxlength: number = 16;
	let value: string = '';
	let chat: string = '';
	let logged: boolean = false;
	let type: string = 'nickname';
	let nickname: string;
	const id: string = crypto.randomUUID();
	const updateChat = function (): void {
		if (!logged) {
			logged = true;
			type = 'message';
			placeholder = 'Send a message';
			maxlength = 2000;
			chat += `You successfully logged in as ${value}!\n`;
			nickname = value;
			value = '';
		} else {
			socket.send(JSON.stringify({ id, text: value, nickname }));
			chat += `[${new Date().toLocaleString()}] ${nickname}: ${value}\n`;
			value = '';
		}
	};
</script>

<section class="text-left">
	<h2 class="text-2xl font-cursive text-yellow-200">Chat with me</h2>
	<form on:submit|preventDefault={updateChat}>
		<fieldset>
			<label for="chat">Chat</label>
			<textarea id="chat" name="chat" class="w-full h-28" readOnly bind:value={chat} />
			<div class="flex place-content-between">
				<label for={type} class="mx-2">{type.charAt(0).toUpperCase() + type.slice(1)}</label>
				<input
					type="text"
					id={type}
					name={type}
					{maxlength}
					{placeholder}
					required
					class="w-full rounded mr-0.5"
					bind:value
				/>
				<button type="submit" class="rounded px-3 py-0.5 bg-yellow-200">Send</button>
			</div>
		</fieldset>
	</form>
</section>
