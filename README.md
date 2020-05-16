
## Useful commands

- `gatsby develop` to run the development server
  - `http://localhost:8000/___graphql` for GraphQL explorer
- `gatsby build` to build the production site
- `gatsby serve` to serve the production site

## Overview

Actual content lives in the `content/` directory as mdx files (markdown + React components). Directory structure corresponds to a category hierarchy, and paths inside this directory will match the URL for the corresponding page. Categories can be nested more than one level deep (e.g. `content/python/pandas/merge.mdx`) though this is not currently being done.

`gatsby-node.js` has the code for programmatically creating pages. It currently creates three kinds of pages:
- `createExamplePages` creates the pages with actual example content, corresponding to the mdx files in the `content/` tree. It uses the template at `src/templates/examples.js`.
- `createCategoryPages` creates pages corresponding to the directories in the `content/` tree. These pages just list all the example pages under that category. The template for these pages is `src/templates/category.js`.
- `createExtraMdPages` creates pages corresponding to plain .md files in `src/pages`. Currently there is only one such file (`about.md`). Whereas the above two functions use `gatsby-plugin-mdx`, this one uses `gatsby-transformer-remark`.

`gatsby-node.js` also implements `onCreateNode` which attaches some extra fields to our mdx nodes in GraphQL.

`gatsby-config.js` has a bunch of configuration for plugins, and site metadata.

Most of the interesting code lives in `src/components`:
- `breadcrumbs.js`: a reusable component for breadcrumb-style navigation of the category tree
- `commands.js`: ill-named warehouse for components used in example pages
- `header.js`: what it says on the tin
- `layout.js`: base layout that all pages/templates use as a wrapper (explicitly)
- `toc.js`: a floating table of contents used in example pages

A few widgets lean heavily on the [antd](https://ant.design/docs/react/introduce) library, largely because I used [this starter](https://github.com/cvluca/gatsby-starter-markdown) as a rough template, and it in turn used a lot of antd.
