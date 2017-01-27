module.exports = {
  apps: [
    {
      name: 'ShiftPlanning',
      script: 'server.js',
      env: {
        PORT: 13337,
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'ShiftPlanning_beta',
      script: 'scripts/start.js',
      env: {
        PORT: 13338,
      },
      env_production: {
        NODE_ENV: 'development',
      },
    },
  ],

  deploy: {
    production: {
      user: 'semaphoreci',
      host: '130.226.142.200',
      port: '8022',
      ref: 'origin/master',
      repo: 'git@github.com:AnalogIO/ShiftPlanning_web.git',
      path: '/var/www/shiftplanning.cafeanalog.dk',
      'post-deploy':
        'NODE_ENV=production yarn && NODE_ENV=production npm run build && pm2 startOrGracefulReload ecosystem.config.js --env production',
    },
    beta: {
      user: 'semaphoreci',
      host: '130.226.142.200',
      port: '8022',
      ref: 'origin/develop',
      repo: 'git@github.com:AnalogIO/ShiftPlanning_web.git',
      path: '/var/www/beta.shiftplanning.cafeanalog.dk',
      'post-deploy':
        'yarn && pm2 startOrGracefulReload ecosystem.config.js --env development',
    },
  },
};
