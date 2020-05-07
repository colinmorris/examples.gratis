import React from 'react';
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from '~components/layout';
import Breadcrumbs from '~components/breadcrumbs';

export default function Examples({
  data: { mdx },
  pageContext,
}) {
  return (
      <Layout>
        <Breadcrumbs ancestry={mdx.fields.ancestry} />

        <h1>{mdx.frontmatter.title}</h1>
        
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id}) {
      id
      body
      frontmatter {
        title
      }
      fields {
        ancestry
      }
    }
  }
`
