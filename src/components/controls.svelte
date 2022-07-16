<script lang="ts">
    import { afterUpdate, onMount } from 'svelte';
    import { view, settings } from '../utils/store';
    import audio from '../utils/audio';
    import { sleep } from '../utils/functions';

    let player: HTMLAudioElement | null = null;
    let paused = false;

    onMount(() => {
        player = new Audio((audio as Record<string, any>)[$settings.theme as string]);
        player.loop = true;
        player.volume = 1;
        player.play();
    });

    afterUpdate(async () => {
        if ($view === 'result' && player) {
            for (let i of Array(10)) {
                player.volume -= 0.1;
                await sleep(200);
            }

            player.pause();
            player = null;
        }
    });

    function handlePlay() {
        player?.play();
        paused = false;
    }

    function handlePause() {
        player?.pause();
        paused = true;
    }
</script>

<div>
    <button type="button" on:click={handlePlay} disabled={!paused}>
        <span></span>
        <strong>Play</strong>
    </button>
    <button type="button" on:click={handlePause} disabled={paused}>
        <span></span>
        <strong>Pause</strong>
    </button>
</div>

<style lang="scss">
    div {
        display: flex;
        justify-content: end;
        align-items: center;

        > button {
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

                &:hover > span, &:disabled > span {
                    border-color: transparent transparent transparent var(--primary);
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

                &:hover > span, &:disabled > span {
                    &:before, &:after {
                        background-color: var(--primary);
                    }
                }
            }

            &:disabled {
                cursor: default;

                > strong {
                    color: var(--primary);
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
                color: var(--primary);
            }
        }
    }
</style>
