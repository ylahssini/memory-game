<script lang="ts">
    import { board, moves, view, timer, settings } from '../utils/store';
    import { timerFormat } from '../utils/functions';

    const scale = ((parseInt($settings.size as string, 10) ** 2) * 1.5) + 2;
    const result = ($timer - new Date(1970, 0, 1).getTime()) / 1000;

    let title = 'Not bad! You can do better';
    if (scale >= result) title = 'Bravo, you\'re fast!';
    if ((scale * 2) < result) title = 'Oh man! you\'re very slow';

    function handleSettings() {
        view.set('settings');
        moves.set(0);
        timer.set(0);
        board.reset();
        settings.setSize(null);
        settings.setTheme(null);
    }

    function handleTry() {
        view.set('game');
        moves.set(0);
        timer.set(0);
        board.reset();
    }
</script>

<section>
    <h2>{title}</h2>
    <p>Check your score</p>

    <div>
        <h3>
            <strong>{$moves}</strong>
            <small>Moves</small>
        </h3>
        <h3>
            <time>{timerFormat($timer)}</time>
            <small>Time</small>
        </h3>
    </div>

    <footer>
        <button type="button" class="btn" on:click={handleSettings}>Go to settings</button>
        <button type="button" class="btn" on:click={handleTry}>Try again</button>
    </footer>
</section>

<style lang="scss">
    h2 {
        display: block;
        font-weight: 700;
        font-size: 3rem;
        text-align: center;
        padding: 3rem 0 0;
    }

    p {
        font-size: 1.35rem;
        padding: 0 0 3rem;
        text-align: center;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5rem;
        background-color: white;
        padding: 3rem 10rem;
        border-radius: 9px;
    }

    h3 {
        color: #555;
        font-size: 1.25rem;
        font-weight: 400;
        text-align: center;
    }

    strong, time {
        color: var(--dark);
        display: block;
        font-weight: 700;
        font-size: 3rem;
    }

    footer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        padding-top: 2rem;
    }
</style>
