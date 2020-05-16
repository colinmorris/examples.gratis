import React from "react"
import { graphql } from "gatsby";

import Layout from "../components/layout"
import PageListing from '~components/pageListing';
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const slugs = data.allSitePage.edges.map( (edge) => edge.node.path );
  return (
  <Layout>
    <SEO title="Home" />
    <PageListing slugs={slugs} />
  </Layout>
  );
}

export default IndexPage

export const pageQuery = graphql`
  query pagesQuery {
    allSitePage(sort: {fields: path}) {
      edges {
        node {
          id
          path
        }
      }
    }
  }
`
