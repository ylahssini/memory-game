<script lang="ts">
    import { fade } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import Settings from '../components/settings.svelte';
    import Game from '../components/game.svelte';
    import Result from '../components/result.svelte';
    import { view } from '../utils/store';

    let transition = { easing: quintOut, duration: 400 };
</script>

{#if $view === 'settings'}
    <div transition:fade={transition}>
        <Settings />
    </div>
{/if}

{#if $view === 'game'}
    <div transition:fade={transition}>
        <Game />
    </div>
{/if}

{#if $view === 'result'}
    <div transition:fade={transition}>
        <Result />
    </div>
{/if}

<style lang="scss">
    div {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
