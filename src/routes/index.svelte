<script lang="ts">
    import Settings from '../components/settings.svelte';
    import Game from '../components/game.svelte';
    import Result from '../components/result.svelte';
    import { view } from '../utils/store';
</script>

{#if $view === 'settings'}
    <div>
        <Settings />
    </div>
{/if}

{#if $view === 'game'}
    <div>
        <Game />
    </div>
{/if}

{#if $view === 'result'}
    <div>
        <Result />
    </div>
{/if}
