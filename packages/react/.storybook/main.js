import { dirname, join } from "path";
module.exports = {
    stories: ['../src/**/*.stories.tsx'],

    addons: [
        getAbsolutePath("@storybook/preset-typescript")
    ],

    framework: {
        name: getAbsolutePath("@storybook/react-webpack5"),
        options: {}
    },

    docs: {
        autodocs: true
    }
}

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}