/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// Copied from https://www.mrozilla.cz/blog/gatsby-eslint-vscode-import-alias/
// cf. also https://www.gatsbyjs.org/packages/gatsby-alias-imports/
const path = require("path");
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~components": path.resolve(__dirname, "src/components")
      }
    }
  });
};
