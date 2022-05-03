module.exports = {
  apps: [
    {
      name: "app-dev",
      script: "npm run dev",
      cwd: "./app",
      watch: "./app",
    },
    {
      name: "api-dev",
      script: "npm run dev",
      cwd: "./api",
      watch: "./api",
    },
  ],
};
