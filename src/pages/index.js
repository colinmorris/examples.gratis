import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
    <Link to="/bash/bash-for/">bash-for</Link>
    <Link to="/bash/find/">find</Link>
    <Link to="/bash/tar/">tar</Link>
    <pre>This is a          test.{"\n"}
    This should be on a new line.
    And this.
    </pre>
  </Layout>
)

export default IndexPage
