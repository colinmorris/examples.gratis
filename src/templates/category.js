import React from 'react';
import { graphql, Link } from "gatsby";

import Layout from '~components/layout';
import PageListing from '~components/pageListing';
import Breadcrumbs from '~components/breadcrumbs';

export default function Category(
 {pageContext},
) {
  const {category, ancestry, containedSlugs} = pageContext;

  return (
    <Layout>
      <Breadcrumbs ancestry={ancestry} />
      <h1>{category}</h1>
      <PageListing slugs={containedSlugs} />
    </Layout>
  );
}
