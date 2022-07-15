<script lang="ts">
import { afterUpdate, onMount } from 'svelte';

    import { view, settings } from '../utils/store';
    import audio from '../utils/audio';

    let player: HTMLAudioElement | null = null;

    onMount(() => {
        player = new Audio((audio as Record<string, any>)[$settings.theme as string]);
        player.loop = true;
        player.play();
    });

    afterUpdate(() => {
        if ($view === 'result' && player) {
            player.pause();
            player = null;
        }
    });

    function handlePlay() {
        player?.play();
    }

    function handlePause() {
        player?.pause();
    }
</script>

<div>
    <button type="button" on:click={handlePlay}>
        <span></span>
        <strong>Play</strong>
    </button>
    <button type="button" on:click={handlePause}>
        <span></span>
        <strong>Pause</strong>
    </button>
</div>

<style lang="scss">
    button {
        cursor: pointer;

        &:nth-of-type(1) {
            > span {
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 10.5px 0 10.5px 13px;
                border-color: transparent transparent transparent var(--dark);
                display: block;
                margin: 0 auto;
                transition: border-color .2s ease-out;
            }

            &:hover > span {
                border-color: transparent transparent transparent darkred;
            }
        }

        &:nth-of-type(2) {
            > span {
                display: flex;
                align-items: center;
                justify-content: space-between;
                max-width: 17px;
                margin: 0 auto;

                &:before, &:after {
                    background-color: var(--dark);
                    content: "";
                    display: block;
                    width: 5px;
                    height: 21px;
                    transition: background-color .2s ease-out;
                }
            }

            &:hover > span {
                &:before, &:after {
                    background-color: darkred;
                }
            }
        }

        > strong {
            color: var(--dark);
            font-size: .75rem;
            display: block;
            font-weight: 300;
            text-transform: uppercase;
            padding-top: .25rem;
            transition: color .2s ease-out;
        }

        &:hover > strong {
            color: darkred;
        }
    }
</style>
