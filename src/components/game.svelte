<script lang="ts">
    import { onMount } from 'svelte';
    import themes from '../utils/themes';
    import cards from '../utils/cards';
    import { settings } from '../utils/store';

    let grid = Math.pow(parseInt($settings.size as string, 10), 2);
    let theme = $settings.theme as string;
    // @ts-ignore
    let image = themes[theme];

    function randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onMount(() => {
        const exactNumber = grid / 2;

        // @ts-ignore
        let cardKeys = Object.keys(cards[theme]).slice(0, exactNumber);

        const board: any[] = [];
        for (let i = 0; i < grid; i += 1) {
            if (!board[i]) {
                const cell = randomNumber(0, cardKeys.length - 1);
                const cardKey = cardKeys[cell];

                board[i] = { open: false, key: cardKey };

                if (board.filter((cell) => cell.key === cardKey).length === 2) {
                    cardKeys.splice(cardKeys.indexOf(cardKey), 1);
                }
            }
        }
    });
</script>

<section class="__{$settings.size}">
    {#each Array(grid) as i}
        <button type="button">
            <header style="background: url('{image}') no-repeat center center / contain"></header>
            <footer></footer>
        </button>
    {/each}
</section>

<style lang="scss">
    section {
        display: grid;
        gap: .5rem;
        
        &.__4 {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(4, 1fr);

            > li {
                width: 138px;
                height: 138px;
            }
        }

        &.__6 {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(6, 1fr);

            > li {
                width: 100px;
                height: 100px;
            }
        }

        > button {
            position: relative;

            &:hover > header {
                box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
                transform: rotateY(0deg) translateX(0) translateY(-3px);
            }

            > header, > footer {
                border-radius: 9px;
                width: 100%;
                height: 100%;
                box-shadow: 0 0 0 rgba(0, 0, 0, 0.2);
                backface-visibility: hidden;
                transition: transform .3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow .3s ease-out;
                transform-style: preserve-3d;
                border-radius: 9px;
                cursor: pointer;
                position: absolute;
                inset: 0;
                transform-origin: center center;
            }

            > header {
                transform: rotateY(0deg) translateX(0) translateY(0);
            }

            > footer {
                transform: rotateY(-180deg) translateX(50%);
            }
        }
    }
</style>
