import React from 'react';
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Breadcrumb } from 'antd';

import Layout from '~components/layout';

export default function Examples({
  data: { mdx },
  context,
}) {
  const ancestors = mdx.fields.ancestry;
  const crumbs = ancestors.map( (cat, i) => {
    const path = "/" + ancestors.slice(0, i+1).join('/');
    return (
      <Breadcrumb.Item key={i}>
        <Link to={path}>{cat}</Link>
      </Breadcrumb.Item>
    );
  });
  return (
      <Layout>
        <Breadcrumb>
          {crumbs}
        </Breadcrumb>
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
      fields {
        ancestry
      }
    }
  }
`
