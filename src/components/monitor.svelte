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
            view.set('result');
            timer.set(lapse.getTime());
            clearInterval(interval);
        }
    });
</script>

<aside class:__show={$view === 'game'}>
    <div>
        <span>Moves:</span>
        <strong>{$moves}</strong>
    </div>
    <div>
        <span>Time:</span>
        <time>{timerFormat(lapse.getTime())}</time>
    </div>
</aside>

<style lang="scss">
    aside {
        font-size: 1.3rem;
        opacity: 0;
        text-align: right;
        transform: translateY(3rem);
        transition: all .2s cubic-bezier(0.215, 0.610, 0.355, 1);
        width: 125px;

        > div {
            display: flex;
            align-items: center;
            justify-content: space-between;

            > strong, time {
                font-weight: 700;
            }

            > strong:before {
                content: "0";
                display: inline;
                font-weight: 700;
            }
        }

        &.__show {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
