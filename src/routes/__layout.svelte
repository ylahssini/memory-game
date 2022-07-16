<script lang="ts">
	import { fly } from 'svelte/transition';
	import Monitor from '../components/monitor.svelte';
	import Controls from '../components/controls.svelte';
	import { view } from '../utils/store';
	import '../assets/styles/app.css';
</script>

<svelte:head>
	<title>Memory game | created by Youssef Lahssini</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Baloo+Paaji+2:wght@400;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<main>
	<header>
		<h1>Memory<br />Game</h1>
		{#if $view === 'game'}
			<div in:fly={{ duration: 500, y: 100 }} out:fly={{ duration: 500, x: 50 }}>
				<Controls />
			</div>
			<div in:fly={{ duration: 500, y: 100 }} out:fly={{ duration: 500, x: 50 }}>
				<Monitor />
			</div>
		{/if}
	</header>
	<section>
		<slot />
	</section>
	<footer>
		<p>
			&copy; All rights reserved. Created by <a href="https://ylahssini.vercel.app" target="_blank"
				>Youssef Lahssini</a
			>
		</p>
		<p>
			Code source in <a href="https://github.com/ylahssini/memory-game" target="_blank">Github</a>
		</p>
	</footer>
</main>

<style lang="scss">
	:global(.btn) {
		background-color: #fff;
		border: 2px solid var(--dark);
		border-radius: 9px;
		color: var(--dark);
		cursor: pointer;
		display: block;
		font-size: 1.4rem;
		font-weight: 700;
		padding: 1rem 2rem;
		transition: all 0.3s ease-out;
		width: fit-content;

		&:hover {
			background-color: var(--dark);
			color: #fff;
		}

		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;

			&:hover {
				background-color: #fff;
				color: var(--dark);
			}
		}
	}

	main {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		grid-template-rows: 90px 2.7fr 0.1fr;
		grid-template-areas: 'header' 'content' 'footer';
		width: 800px;
	}

	header {
		grid-area: header;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding: 0 0 0.7rem;
		border-bottom: 3px solid var(--dark);
		overflow: hidden;

		> div:nth-of-type(1) {
			margin-left: auto;
			margin-right: 1rem;
		}
	}

	h1 {
		font-size: 3rem;
		font-weight: 700;
		letter-spacing: -3px;
		line-height: 2.1rem;
	}

	section {
		border-radius: 8px;
		grid-area: content;
		width: 100%;
		height: 70vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	footer {
		grid-area: footer;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 0.7rem;
		border-top: 1px solid var(--dark);
	}
</style>
