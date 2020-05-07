import React from 'react';
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from '~components/layout';
import Breadcrumbs from '~components/breadcrumbs';
import FloatingAnchorNav from '~components/toc';

export default function Examples({
  data: { mdx },
  pageContext,
}) {
  // TODO: sort of hacky way of doing this.
  const sidebar = (
    <FloatingAnchorNav
      headings={mdx.headings}
      tableOfContents={mdx.tableOfContents.items}
    />
  );
  return (
      <Layout sidebar={sidebar}>
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
      headings {
        depth
          value
      }
      tableOfContents
      frontmatter {
        title
      }
      fields {
        ancestry
      }
    }
  }
`
