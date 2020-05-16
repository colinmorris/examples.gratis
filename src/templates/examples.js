import React from 'react';
import { graphql } from "gatsby";
import { Helmet } from 'react-helmet';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from '~components/layout';
import Breadcrumbs from '~components/breadcrumbs';
import FloatingAnchorNav from '~components/toc';

//import './examples.css';

// just a proof of concept experiment
/*
const Wrapper = ({children, ...props}) => {
  const mapped = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      className: "wrapped"
    });
  });
  return (<>{mapped}</>);
};
*/

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
  const front = mdx.frontmatter;
  const title = front.title;
  let desc = front.description;
  if (!desc && front.command) {
    desc = `Basic examples of the unix command ${front.command}.`;
  } else {
    console.warn("Couldn't generate meta description for");
  }
  return (
      <Layout sidebar={sidebar}>
        <Helmet
          title={title}
          meta={[
            {
              name: `description`,
              content: desc,
            },
          ]}
        />
        <Breadcrumbs ancestry={mdx.fields.ancestry} />

        <h1>{title}</h1>
        
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
        description
        command
      }
      fields {
        ancestry
      }
    }
  }
`
