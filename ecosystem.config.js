module.exports = {
  apps: [
    {
      name: 'app',
      script: './src/server.js', //colocar aq o arquivo de inicialização, no caso o server.js
      instances: 'max',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
