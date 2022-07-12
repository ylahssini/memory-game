<script lang="ts">
    import images from '../utils/themes';
    import { settings, view } from '../utils/store';
    import type { SizeValues, ThemeValues } from '../utils/store';

    let themes = [
        { value: 'marvel', label: 'Marvel', bg: `url(${images.marvel}) no-repeat center top #f13333` },
        { value: 'dc', label: 'DC', bg: `url(${images.dc}) no-repeat center top #fff` },
        { value: 'starwars', label: 'Star wars', bg: `url(${images.starwars}) no-repeat center top #070809` },
        { value: 'nintendo', label: 'Nintendo', bg: `url(${images.nintendo}) no-repeat center top #fff` },
    ];

    let sizes = [4, 6];

    function handleTheme(event: Event) {
        settings.setTheme((event.target as HTMLInputElement).value as ThemeValues);
    }

    function handleSize(event: Event) {
        settings.setSize((event.target as HTMLInputElement).value as SizeValues);
    }

    function handlePlay() {
        view.set('game');
    }
</script>

<div>
    <p>Choose the theme of the game</p>
    <ul>
        {#each themes as theme}
            <li>
                <input
                    type="radio"
                    name="theme"
                    value={theme.value}
                    id={theme.value}
                    checked={$settings.theme === theme.value}
                    on:change={handleTheme}
                >
                <label for="{theme.value}">
                    <span>{theme.label}</span>
                    <span style="background: {theme.bg}"></span>
                </label>
            </li>
        {/each}
    </ul>

    <p>Choose the size of grid</p>
    <ul>
        {#each sizes as size }
            <li>
                <input
                    type="radio"
                    name="size"
                    value="{size}"
                    id="{size}x{size}"
                    checked={$settings.size === size.toString()}
                    on:change={handleSize}
                >
                <label for="{size}x{size}">
                    <span>{size}x{size}</span>
                    <span>
                        <span>
                            {#each Array(size * size) as _ }
                                <i style="width: calc(100% / {size})"></i>
                            {/each}
                        </span>
                    </span>
                </label>
            </li>
        {/each}
    </ul>

    <button type="button" disabled={!$settings.theme && !$settings.size} on:click={handlePlay}>
        Start playing
    </button>
</div>

<style lang="scss">
    input {
        display: none;
    }

    p {
        font-size: 1.15rem;
        padding: 0 0 2rem;
        text-align: center;
    }

    ul {
        margin: 0 0 3rem;
        display: flex;
        align-items: center;
        gap: 1.5rem;

        > li {
            > label {
                display: block;
                position: relative;
                width: 140px;
                height: 140px;

                &:hover {
                    > span:nth-of-type(1) {
                        box-shadow: 0 0 25px 2px rgba(0, 0, 0, 0.11);
                    }
                }

                > span {
                    display: block;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    transition: transform .5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow .3s ease-out;
                    transform-style: preserve-3d;
                    border-radius: 9px;
                    cursor: pointer;
                    position: absolute;
                    inset: 0;
                    transform-origin: center center;
                }

                > span:nth-of-type(1) {
                    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
                    background-color: #fff;
                    font-size: 1.35rem;
                    font-weight: 700;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transform: rotateY(0deg) translateX(0);
                    text-align: center;
                }

                > span:nth-of-type(2) {
                    transform: rotateY(-180deg) translateX(50%);
                }
            }

            > input {
                display: none;

                &:checked + label {
                    > span:nth-of-type(1) {
                        transform: rotateY(-180deg) translateX(50%)
                    }

                    > span:nth-of-type(2) {
                        transform: rotateY(0deg) translateX(0);
                    }
                }
            }
        }

        &:nth-of-type(2) {
            margin: 0 auto;
            width: fit-content;

            input {
                & + label > span:nth-of-type(2) {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    > span {
                        display: flex;
                        flex-wrap: wrap;
                        width: 70%;

                        > i {
                            display: block;
                            outline: 1px dashed rgb(201, 199, 199);
                            
                            &:after {
                                content: '';
                                display: block;
                                padding-top: 100%;
                            }
                        }
                    }
                }

                &:checked + label > span:nth-of-type(2) {
                    background-color: #161515;
                    color: #fff;
                    font-weight: 700;
                }
            }
        }
    }

    button {
        background-color: #fff;
        border: 2px solid var(--dark);
        border-radius: 9px;
        color: var(--dark);
        cursor: pointer;
        display: block;
        font-size: 1.4rem;
        font-weight: 700;
        padding: 1rem 2rem;
        margin: 3rem auto;
        transition: all .3s ease-out;
        width: fit-content;

        &:hover {
            background-color: var(--dark);
            color: #fff;
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;

            &:hover {
                background-color: #fff;
                color: var(--dark);
            }
        }
    }
</style>
