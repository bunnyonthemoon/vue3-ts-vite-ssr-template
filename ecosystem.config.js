module.exports = {
    apps: [
        {
            name: 'battle',
            script: 'node ./dist/server/server/index.js',
            automation: true,
            env: {
                NODE_ENV: 'production',
                SERVER_BUILD: 'true',
            },
            env_development: {
                NODE_ENV: 'development',
                SERVER_BUILD: 'true',
            },
        },
    ],
}
