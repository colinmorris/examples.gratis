module.exports = {
  siteMetadata: {
    title: `examples.gratis`,
    // Pretty sure these fields aren't currently used anywhere
    description: `Description tk`,
    author: `colin`,
  },
  plugins: [
    // helper for dealing with <head> tags
    `gatsby-plugin-react-helmet`,
    // Source mdx files under content/
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    // Extra plain markdown pages living under src/pages
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `extraMdPages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        // Automatically generates github-style link icons next to headings
        gatsbyRemarkPlugins: [`gatsby-remark-autolink-headers`],
      },
    },
    // For parsing .md files
    `gatsby-transformer-remark`,
    // I forget what this is for
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        //icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
