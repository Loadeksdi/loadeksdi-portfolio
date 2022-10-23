<script lang="ts">
	import Chat from '$lib/Chat.svelte';
	import Footer from '$lib/Footer.svelte';
</script>

<main class="flex-1 flex flex-col justify-center text-center gap-4 mx-10">
	<h1 class="text-3xl font-bold underline">Contact</h1>
	<h2>In case you need to get in touch with me, here are the possibilities you have.</h2>
	<Chat />
	<h2 class="text-2xl font-bold text-left">Check my social media</h2>
	<div class="flex flex-col text-1xl font-bold underline justify-center text-left gap-2">
		<div>
			<a href="mailto:nicolas.load@gmail.com"><i class="fa fa-1x fa-envelope mr-2" />Send me an email</a>
		</div>
		<div>
			<a href="https://github.com/Loadeksdi" target="_blank" rel="noreferrer"
				><i class="fa-1x fa-brands fa-github mr-2" />Check my different repositories on GitHub</a
			>
		</div>
		<div>
			<a href="https://www.linkedin.com/in/nicolas-orvain/" target="_blank" rel="noreferrer"
				><i class="fa-1x fa-brands fa-linkedin mr-2" />Connect with me on LinkedIn</a
			>
		</div>
	</div>
</main>
<Footer />
