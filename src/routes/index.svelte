<script lang="ts">
    import { fly } from 'svelte/transition';
    import Settings from '../components/settings.svelte';
    import { view } from '../store/store';
</script>

{#if $view === 'settings'}
    <div transition:fly={{ y: 150, duration: 500 }}>
        <Settings />
    </div>
{/if}
