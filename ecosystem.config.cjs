/** PM2 — bind Next.js standalone to localhost only */
module.exports = {
  apps: [
    {
      name: "vvlanding",
      cwd: __dirname,
      script: ".next/standalone/server.js",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_restarts: 50,
      min_uptime: "10s",
      env: {
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
        PORT: 4000,
      },
    },
  ],
};
