<script lang="ts">
    import marvel from '../assets/images/marvel.png';
    import dc from '../assets/images/dc.png';
    import starwars from '../assets/images/starwars.png';
    import nintendo from '../assets/images/nintendo.png';

    let themes = [
        { value: 'marvel', label: 'Marvel', image: marvel },
        { value: 'dc', label: 'DC', image: dc },
        { value: 'starwars', label: 'Star wars', image: starwars },
        { value: 'nintendo', label: 'Nintendo', image: nintendo },
    ]
</script>

<div>
    <p>Choose the theme of the game</p>
    <ul>
        {#each themes as theme}
            <li>
                <input type="radio" name="theme" value={theme.value} id={theme.value}>
                <label for="{theme.value}">
                    <img src={theme.image} alt="" />
                    <span>{theme.label}</span>
                </label>
            </li>
        {/each}
    </ul>

    <p>Choose the size of grid</p>
    <ol>
        <li><label><input type="radio" name="size" value="4"> <span>4x4</span></label></li>
        <li><label><input type="radio" name="size" value="6"> <span>6x6</span></label></li>
    </ol>
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
            > input {
                display: none;

                &:checked + label {
                    opacity: 1;
                    transform: translateY(-.65rem);
                    box-shadow: 0 0 40px -15px rgb(228, 82, 99);
                }
            }

            > label {
                box-shadow: 0 0 0 rgba(0, 0, 0, 0);
                background-color: #fff;
                text-align: center;
                border-radius: 9px;
                font-size: 1.35rem;
                overflow: hidden;
                opacity: 0.4;
                cursor: pointer;
                display: block;
                transform: translateY(0);
                transition: box-shadow .2s ease-out, opacity .3s ease-out, transform .3s ease-out;

                &:hover {
                    box-shadow: 0 0 25px 2px rgba(0, 0, 0, 0.11);
                    opacity: 1;
                }

                > span {
                    display: block;
                    padding: 1rem 0;
                }
            }
        }
    }

    ol {
        margin: 0 auto 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        width: fit-content;

        label {
            box-shadow: 0 0 0 rgba(0, 0, 0, 0);
            background-color: #fff;
            text-align: center;
            border-radius: 9px;
            font-size: 1.35rem;
            padding: 1rem;
            overflow: hidden;
            cursor: pointer;
            display: block;
            transition: box-shadow .2s ease-out;

            > input {
                display: none;
            }
        }
    }
</style>