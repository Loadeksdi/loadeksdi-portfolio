<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	interface User {
		name: string;
		uuid: string;
	}

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
	let type: string = 'nickname';
	let user: Writable<User | null>;
	let storedUser: User | null = null;
	const firstUpdate = (nickname: string) => {
		type = 'message';
		placeholder = 'Send a message';
		maxlength = 2000;
		chat += `You successfully logged in as ${nickname}!\n`;
	};
	if (browser) {
		const storedUserString: string | null = localStorage.getItem('user');
		if (storedUserString) {
			storedUser = JSON.parse(storedUserString);
			if (storedUser) {
				firstUpdate(storedUser.name);
			}
		}
		user = writable(storedUser);
		user.subscribe((value) => {
			if (!value) {
				return;
			}
			storedUser = value;
			localStorage.setItem('user', JSON.stringify(value));
		});
	}
	const updateChat = () => {
		if (!storedUser) {
			firstUpdate(value);
			value = '';
			user.set({ name: value, uuid: crypto.randomUUID() });
		} else {
			socket.send(JSON.stringify({ id: storedUser.uuid, text: value, nickname: storedUser.name }));
			chat += `[${new Date().toLocaleString()}] ${storedUser.name}: ${value}\n`;
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
