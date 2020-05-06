import React from 'react';
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from '~components/layout';

export default function Examples({
  data: { mdx },
  context,
}) {
  return (
      <Layout>
        <h1>{mdx.frontmatter.title}</h1>
        
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </Layout>
  );
};

export const pageQuery = graphql`
  query($id: String) {
    mdx(id: { eq: $id}) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
