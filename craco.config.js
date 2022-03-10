// https://www.taniarascia.com/react-architecture-directory-structure/
// 
// It just makes it a lot easier to import from anywhere within the project
// and move files around without changing imports, and you never end up with
// something like ../../../../../components/.

const path = require(`path`);

module.exports = {
  webpack: {
    extensions: ["js", "ts"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      // ...etc
    },
  },
};
