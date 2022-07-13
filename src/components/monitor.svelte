<script lang="ts">
    import { count, view } from '../utils/store';
</script>

<aside class:__show={$view === 'game'}>
    <span>Moves:</span> <strong>{$count}</strong><br />
    <span>Time:</span> <strong>00:00</strong>
</aside>

<style lang="scss">
    aside {
        font-size: 1.3rem;
        opacity: 0;
        text-align: right;
        transform: translateY(3rem);
        transition: all .2s cubic-bezier(0.215, 0.610, 0.355, 1);

        > strong {
            font-weight: 700;
        }

        &.__show {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
