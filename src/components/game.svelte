<script lang="ts">
    import { onMount } from 'svelte';
    import themes from '../utils/themes';
    import cards from '../utils/cards';
    import { settings, moves, view, board } from '../utils/store';
    import type { BoardCell } from '../utils/store';
    import { rand, sleep } from '../utils/functions';

    const grid = parseInt($settings.size as string, 10) ** 2;
    let theme = $settings.theme as string;
    let image = (themes as Record<string, any>)[theme];

    let flip = { first: null, second: null } as { first: string | null, second: string | null };

    onMount(() => {
        let cardKeys = Object.keys((cards as Record<string, any>)[theme]).slice(0, grid / 2);

        for (let i = 0; i < grid; i += 1) {
            if (!$board[i]) {
                const cell = rand(0, cardKeys.length - 1);
                const cardKey = cardKeys[cell];

                board.add(i, {
                    key: cardKey,
                    bg: (cards as Record<string, any>)[theme][cardKey],
                    open: false,
                    show: false,
                    matched: false,
                });

                if ($board.filter((cell) => cell.key === cardKey).length === 2) {
                    cardKeys.splice(cardKeys.indexOf(cardKey), 1);
                }
            }
        }
    });
  
    function handleFlip(cell: BoardCell, index: number): () => void {
        return async (): Promise<boolean> => {
            if (!flip.first) {
                flip.first = cell.key;
                board.updateByIndex(index, { open: true, show: true });

                return true;
            }

            if (!flip.second) {
                moves.set($moves + 1);

                flip.second = cell.key;
                board.updateByIndex(index, { open: true, show: true });

                await sleep(500);

                if (flip.first === flip.second) {
                    board.updateByKeys([cell.key], { matched: true });
                    flip = { first: null, second: null };

                    return true;
                }

                board.updateByKeys([flip.first, flip.second], { open: false });
                await sleep(500);
                board.updateByKeys([flip.first, flip.second], { show: false });

                flip = { first: null, second: null };

                return true;
            }

            return false;
        }
    }
</script>

{#if grid === $board.length}
    <section class="__{$settings.size}">
        {#each Array(grid) as _, i}
            <button
                type="button"
                on:click={handleFlip($board[i], i)}
                class:__flipped={$board[i].open}
                disabled={$board[i].open}
            >
                <header style="background: url('{image}') no-repeat center center / contain"></header>
                <footer style={$board[i].show ? `background: url('${$board[i].bg}') no-repeat center center / contain` : undefined}></footer>
            </button>
        {/each}
    </section>
{/if}

<style lang="scss">
    section {
        display: grid;
        gap: .5rem;

        &.__4 {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(4, 1fr);

            > button {
                width: 138px;
                height: 138px;
            }
        }

        &.__6 {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(6, 1fr);

            > button {
                width: 100px;
                height: 100px;
            }
        }

        > button {
            cursor: pointer;
            display: block;
            position: relative;

            &:hover > header {
                transform: rotateY(0deg) translateX(0) translateY(-3px);
            }

            &:disabled {
                cursor: not-allowed;
            }

            > header, > footer {
                border-radius: 9px;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                transition: transform .5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                transform-style: preserve-3d;
                border-radius: 9px;
                position: absolute;
                inset: 0;
                transform-origin: center center;
            }

            > header {
                transform: rotateY(0deg) translateX(0);
            }

            > footer {
                transform: rotateY(-180deg) translateX(50%);
            }

            &.__flipped {
                > header {
                    transform: rotateY(-180deg) translateX(50%);
                }

                > footer {
                    transform: rotateY(0deg) translateX(0);
                }
            }
        }
    }
</style>
