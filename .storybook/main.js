module.exports = {
    stories: [
        '../packages/**/*.stories.mdx',
        '../packages/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', {
        name: '@storybook/addon-docs',
        options: {
            transcludeMarkdown: true
        }
    },
        'storybook-addon-themes',
        '@storybook/addon-interactions',
        '@storybook/addon-mdx-gfm'
    ],
    features: {
        buildStoriesJson: true,
        interactionsDebugger: true,
        storyStoreV7: true
    },
    framework: {
        name: '@storybook/html-vite',
        options: {}
    },
    docs: {
        autodocs: true
    },
    core: {
        builder: '@storybook/builder-vite'
    }
};