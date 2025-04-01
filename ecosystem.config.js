module.exports = {
  apps: [
    {
      name: "amc-next-dev",
      script: "server.js", // Run the custom server
      instances: "max", // Adjust based on your server capacity
      exec_mode: "cluster", // Enables clustering for better performance
      env: {
        NODE_ENV: "production",
        PORT: 3000, // Change if needed
      },
    },
  ],
};
  