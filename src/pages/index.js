import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby";

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const links = data.allSitePage.edges.map( ({node}) => (
    <li key={node.id}>
      <Link to={node.path}>{node.path}</Link>
    </li>
  ));
  return (
  <Layout>
    <SEO title="Home" />
    <ul>
      { links }
    </ul>
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
