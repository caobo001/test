module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'webapp',
      script: 'server.js',
      instances: 4,
      exec_mode: 'cluster',
      autorestart: true,
      min_uptime: '60s',
      max_memory_restart: '500M',
      max_restarts: 15,
      restart_delay: 4000,
      env: {
        'NODE_ENV': 'production'
      }
    }
  ]
}
