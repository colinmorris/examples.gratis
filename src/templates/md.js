import React from 'react';
import { graphql } from "gatsby";
import { Helmet } from 'react-helmet';

import Layout from '~components/layout';

export default function MdPage({
  data,
  pageContext,
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
      <Layout>
        <Helmet
          title={ frontmatter.title }
        />

        <h1>{frontmatter.title}</h1>

        <div className="md-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        
      </Layout>
  );
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`;
