/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path");

// TODO: It's a small thing, but would like to be DRY-esque about this, since it's
// also used in gatsby-config.js...
const CONTENT_ROOT_DIRECTORY = "content";
const CONTENT_URL_ROOT = "/";

// Used example at https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#create-pages-from-sourced-mdx-files
// as starting point.
exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              slug # optional
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  const pages = result.data.allMdx.edges
  pages.forEach(({ node }, index) => {
    const parts = node.fileAbsolutePath.split('/');
    const rootIdx = parts.indexOf(CONTENT_ROOT_DIRECTORY);
    if (rootIdx === -1 || rootIdx === parts.length - 1) {
      reporter.panicOnBuild('Content root not found in path: ' + node.fileAbsolutePath);
    }
    const slug = node.frontmatter.slug || parts[parts.length - 1];
    parts[parts.length - 1] = slug;
    const url_path = CONTENT_URL_ROOT + parts.slice(rootIdx + 1).join('/');
    createPage({
      path: url_path,
      component: path.resolve(`./src/templates/examples.js`),
      // You can use the values in this context in
      // our page layout component
      // (id is used in the template's graphql query)
      context: { id: node.id },
    })
  });
};

// Import aliases
// Copied from https://www.mrozilla.cz/blog/gatsby-eslint-vscode-import-alias/
// cf. also https://www.gatsbyjs.org/packages/gatsby-alias-imports/
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~components": path.resolve(__dirname, "src/components")
      }
    }
  });
};
