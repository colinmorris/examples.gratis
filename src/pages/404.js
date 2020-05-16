import React from "react"
import { Helmet } from 'react-helmet';

import Layout from "../components/layout"

const NotFoundPage = () => (
  <Layout>
    <Helmet
      title="404: Not found"
    />
    <h1>NOT FOUND</h1>
  </Layout>
)

export default NotFoundPage
