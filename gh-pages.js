// eslint-disable-next-line @typescript-eslint/no-var-requires
var ghpages = require('gh-pages');

ghpages.publish(
    'public',
    {
        branch: 'gh-pages',
        repo: 'https://github.com/ylahssini/memory-game.git',
        user: {
            name: 'ylahssini',
            email: 'ylahssini@gmail.com'
        },
        dotfiles: true
    },
    () => {
        console.log('Deploy Complete!');
    }
);