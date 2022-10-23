<script lang="ts">
	import Chat from '$lib/Chat.svelte';
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import Fa from 'svelte-fa';
	import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
	import { faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons';
</script>

<Navbar />
<main class="flex-1 flex flex-col justify-center text-center gap-4 mx-10 font-sans">
	<h1 class="text-3xl font-cursive font-bold">Contact</h1>
	<p>In case you need to get in touch with me, here are the possibilities you have.</p>
	<Chat />
	<h2 class="text-2xl font-cursive text-left text-yellow-200">Other ways to talk with me</h2>
	<div class="flex flex-col text-1xl justify-center text-left gap-2">
		<div>
			<a href="mailto:nicolas.load@gmail.com"><Fa icon={faEnvelope} size="2x" />Send me an email</a>
		</div>
		<div>
			<a href="https://www.linkedin.com/in/nicolas-orvain/" target="_blank" rel="noreferrer"
				><Fa icon={faLinkedin} size="2x" />Connect with me on LinkedIn</a
			>
		</div>
		<div>
			<span><Fa icon={faDiscord} size="2x" />Talk with me on Discord: Ｌｏａｄ#7314</span>
		</div>
	</div>
</main>
<Footer />
