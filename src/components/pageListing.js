import React from "react"
import { Link } from "gatsby"

export default (props) => {
  const {slugs} = props;
  const links = slugs.sort().map( (slug) => (
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
