/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import { default as AntdLayout } from 'antd/lib/layout'


import Header from "./header"
// Stuff that came with starter
//import "./layout.css"
import './base.css';

// This is 716k. I'm beginning to regret my life choices. 560k minified.
import 'antd/dist/antd.css';
//import 'antd/es/layout/style/index.css';

const Layout = ({ children, sidebar }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <AntdLayout className="layout">
        <AntdLayout.Header>
          <Header siteTitle={data.site.siteMetadata.title} />
        </AntdLayout.Header>
        <AntdLayout>
          <AntdLayout.Content>
            <div
              style={{
                margin: `0 auto`,
                maxWidth: 960,
                padding: `0 1.0875rem 1.45rem`,
              }}
            >
              <main>{children}</main>
            </div>
          </AntdLayout.Content>
          { sidebar &&
          <AntdLayout.Sider>
            {sidebar}
          </AntdLayout.Sider>
          }
        </AntdLayout>
      </AntdLayout>
    </>
  ) // TODO: Footer?
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
