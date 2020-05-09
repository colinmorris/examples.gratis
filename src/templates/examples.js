import React from 'react';
import { graphql, Link } from "gatsby";
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from '~components/layout';
import Breadcrumbs from '~components/breadcrumbs';
import FloatingAnchorNav from '~components/toc';

//import './examples.css';

// just a proof of concept experiment
const Wrapper = ({children, ...props}) => {
  const mapped = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      className: "wrapped"
    });
  });
  return (<>{mapped}</>);
};

const components = {
  //wrapper: Wrapper,
};

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
  // TODO: wrap provide shortcodes.
  return (
      <Layout sidebar={sidebar}>
        <Breadcrumbs ancestry={mdx.fields.ancestry} />

        <h1>{mdx.frontmatter.title}</h1>
        
        <MDXProvider components={components}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
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
