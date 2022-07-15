<script lang="ts">
    import { afterUpdate, onMount } from 'svelte';
    import { timerFormat } from '../utils/functions';
    import { board, moves, view, timer } from '../utils/store';

    let interval: NodeJS.Timeout;
    let lapse = new Date(1970, 0, 1);

    onMount(() => {
        const date = lapse;
        interval = setInterval(() => {
            date.setSeconds(date.getSeconds() + 1);
            lapse = date;
        }, 1000);
    });

    afterUpdate(() => {
        if ($board.length > 0 && $board.every((card) => card.matched)) {
            console.log('done', lapse.getTime());

            view.set('result');
            timer.set(lapse.getTime());
            clearInterval(interval);
        }
    });
</script>

<aside class:__show={$view === 'game'}>
    <span>Moves:</span> <strong>{$moves}</strong><br />
    <span>Time:</span> <time>{timerFormat(lapse.getTime())}</time>
</aside>

<style lang="scss">
    aside {
        font-size: 1.3rem;
        opacity: 0;
        text-align: right;
        transform: translateY(3rem);
        transition: all .2s cubic-bezier(0.215, 0.610, 0.355, 1);

        > strong, time {
            font-weight: 700;
        }

        &.__show {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
