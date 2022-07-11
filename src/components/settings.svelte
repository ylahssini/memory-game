<script lang="ts">
    import marvel from '../assets/images/marvel.png';
    import dc from '../assets/images/dc.png';
    import starwars from '../assets/images/starwars.png';
    import nintendo from '../assets/images/nintendo.png';

    let themes = [
        { value: 'marvel', label: 'Marvel', bg: `url(${marvel}) no-repeat center top #f13333` },
        { value: 'dc', label: 'DC', bg: `url(${dc}) no-repeat center top #fff` },
        { value: 'starwars', label: 'Star wars', bg: `url(${starwars}) no-repeat center top #070809` },
        { value: 'nintendo', label: 'Nintendo', bg: `url(${nintendo}) no-repeat center top #fff` },
    ];

    let grids = [4, 6];

    let selectedTheme: string;
</script>

<div>
    <p>Choose the theme of the game</p>
    <ul>
        {#each themes as theme}
            <li>
                <input type="radio" name="theme" value={theme.value} id={theme.value} bind:group={selectedTheme}>
                <label for="{theme.value}">
                    <span>{theme.label}</span>
                    <span style="background: {theme.bg}"></span>
                </label>
            </li>
        {/each}
    </ul>

    <p>Choose the size of grid</p>
    <ul>
        {#each grids as grid }
            <li>
                <input type="radio" name="size" value="{grid}x{grid}" id="{grid}x{grid}">
                <label for="{grid}x{grid}">
                    <span>{grid}x{grid}</span>
                    <span>
                        <span>
                            {#each Array(grid * grid) as i }
                                <i style="width: calc(100% / {grid})"></i>
                            {/each}
                        </span>
                    </span>
                </label>
            </li>
        {/each}
    </ul>

    <button type="button">
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
                    transition: transform .5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow .3s ease-out;
                    transform-style: preserve-3d;
                    display: block;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    border-radius: 9px;
                    cursor: pointer;
                    position: absolute;
                    inset: 0;
                    transform-origin: center center;
                }

                > span:nth-of-type(1) {
                    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
                    background-color: #fff;
                    text-align: center;
                    font-size: 1.35rem;
                    overflow: hidden;
                    display: flex;
                    transform: rotateY(0deg) translateX(0);
                    justify-content: center;
                    align-items: center;
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
    }
</style>
