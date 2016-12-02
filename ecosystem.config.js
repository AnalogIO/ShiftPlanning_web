module.exports = {
  apps: [
    {
      name: "ShiftPlanning",
      script: "server.js",
      exec_mode: "cluster",
      instances: "max",
      env: {
        PORT: 13337,
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "semaphoreci",
      host: "130.226.142.200",
      port: "8022",
      ref: "origin/master",
      repo: "git@github.com:AnalogIO/ShiftPlanning_web.git",
      path: "/var/www/shiftplanning.cafeanalog.dk",
      "post-deploy": "npm i && pm2 startOrGracefulReload ecosystem.config.js --env production",
      env: {
        NODE_ENV: "production",
      },
    },
  },
};
