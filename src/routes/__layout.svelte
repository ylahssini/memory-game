<script lang="ts">
    import '../assets/styles/app.css';
</script>

<svelte:head>
    <title>Memory game | created by Youssef Lahssini</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Atma:wght@300;700&display=swap" rel="stylesheet" /> 
</svelte:head>

<main>
    <header>
        <h1>Memory Game</h1>
    </header>
    <section>
        <slot></slot>
    </section>
    <footer>
        <p>Created by <a href="https://ylahssini.vercel.app" target="_blank">Youssef Lahssini</a></p>
        <p>Code source in <a href="https://github.com/ylahssini/memory-game" target="_blank">Github</a></p>
    </footer>
</main>

<style lang="scss">
    main {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0;
        grid-template-rows: 0.2fr 2.7fr 0.1fr;
        grid-template-areas: "header" "content" "footer";
        height: 100vh;
    }

    header {
        grid-area: 'header';
    }

    section {
        grid-area: 'content';
    }

    footer {
        grid-area: 'footer';
    }
</style>
