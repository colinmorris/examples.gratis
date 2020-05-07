import React from "react"
import { Link } from "gatsby"

import Layout from "~components/layout"

export default (props) => {
  console.log(props);
  const {slugs} = props;
  const links = slugs.map( (slug) => (
    <li key={slug}>
      <Link to={slug}>{slug}</Link>
    </li>
  ));
  return (
    <ul>
      { links }
    </ul>
  );
}
