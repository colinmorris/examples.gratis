/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require("path");

const CONTENT_ROOT_DIRECTORY = "content";
const CONTENT_URL_ROOT = "/";

// Used example at https://www.gatsbyjs.org/docs/mdx/programmatically-creating-pages/#create-pages-from-sourced-mdx-files
// as starting point.
exports.createPages = async (helpers) => {
  const { graphql, actions, reporter } = helpers;
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fileAbsolutePath
            frontmatter {
              slug # optional (nb: not actually a slug. rather, a replacement string for the final /-delimited part of the slug)
            }
            fields {
              ancestry
              category
              slug
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }
  const pages = result.data.allMdx.edges;

  createExamplePages(createPage, pages);
  createCategoryPages(createPage, pages);
  await createExtraMdPages(helpers);
  createHomePage(createPage, reporter);
}

/* A bit of a hack. In development, I want this to be a listing of all pages on the site
   (for convenient debugging). In production, make it a copy of /about. (Probably more
   correct to make it a redirect, but that's more complicated, and requires some plugin
   specific to my deployment target.)
*/
const createHomePage = (createPage, reporter) => {
  const env = process.env.NODE_ENV;
  if (env === 'production') {
    createPage({
      path: '/',
      component: path.resolve('./src/templates/md.js'),
      context: { slug: '/about' },
    });
  } else if (env === 'development') {
    createPage({
      path: '/',
      component: path.resolve('./src/pages/directory.js'),
    });
  } else {
    reporter.panicOnBuild('Unrecognized env: ' + env);
  }
};

/* Create pages corresponding to .md files living in src/pages.
   URL is determined entirely by the 'slug' field in the md frontmatter (does not
   care about the filename or path)
*/
const createExtraMdPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `);
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: path.resolve('./src/templates/md.js'),
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });
};

/* Create pages like /bash/, /python/, /python/pandas/, etc. corresponding to 
   categories (i.e. internal nodes in the content tree).
*/
const createCategoryPages = (createPage, edges) => {
  const cats = edges.reduce( (acc, {node}) => {
    const cat = node.fields.category;
    if (!(cat in acc)) {
      acc[cat] = {
        cat: cat, 
        ancestry: node.fields.ancestry, 
        pages: []
      };
    }
    acc[cat].pages.push(node.fields.slug);
    return acc;
  }, {});

  Object.values(cats).forEach( (cat) => {
    createPage({
      path: "/" + cat.ancestry.join('/'),
      component: path.resolve('./src/templates/category.js'),
      context: {
        category: cat.cat,
        ancestry: cat.ancestry,
        containedSlugs: cat.pages,
      },
    });
  });
};

/* Create the main content pages (examples).
*/
const createExamplePages = (createPage, edges) => {
  edges.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/examples.js`),
      // You can use the values in this context in
      // our page layout component
      // (id is used in the template's graphql query)
      context: { id: node.id },
    })
  });
};

exports.onCreateNode = ({ node, getNode, actions, reporter }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const parts = node.fileAbsolutePath.split('/');
    const rootIdx = parts.indexOf(CONTENT_ROOT_DIRECTORY);
    if (rootIdx === -1 || rootIdx === parts.length - 1) {
      reporter.panicOnBuild('Content root not found in path: ' + node.fileAbsolutePath);
    }
    const ancestry = parts.slice(rootIdx+1, parts.length-1);
    let slug = node.frontmatter.slug || parts[parts.length - 1];
    const dotIdx = slug.indexOf('.');
    if (dotIdx !== -1) {
      slug = slug.slice(0, dotIdx);
    }
    parts[parts.length - 1] = slug;
    const url_path = CONTENT_URL_ROOT + parts.slice(rootIdx + 1).join('/');
    createNodeField({
      name: 'ancestry',
      node,
      value: ancestry,
    });
    createNodeField({
      name: 'category',
      node,
      value: ancestry[ancestry.length-1],
    });
    createNodeField({
      name: 'slug',
      node,
      value: url_path,
    });
  }
};

/* Import aliases. So I can write something like...
      import Layout from '~components/layout';
   No matter where I am in the file tree. Don't have to futz around with a bunch
   of brittle ../'s in relative imports.
   Copied from https://www.mrozilla.cz/blog/gatsby-eslint-vscode-import-alias/
   cf. also https://www.gatsbyjs.org/packages/gatsby-alias-imports/
*/
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "~components": path.resolve(__dirname, "src/components")
      }
    }
  });
};
