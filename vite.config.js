import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
    base: '/memory-game',
    plugins: [sveltekit()],
};

export default config;
