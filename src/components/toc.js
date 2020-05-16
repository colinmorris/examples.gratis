import React from 'react';
import { Anchor } from 'antd';

//import 'antd/dist/antd.css';
import 'antd/es/anchor/style/index.css';

const { Link } = Anchor;

const linkifyTocObj = ({url, title, items}) => (
  <Link
    href={url}
    title={title}
    key={url}
  >
    { items && items.map(linkifyTocObj) }
  </Link>
);

export default function FloatingAnchorNav( { tableOfContents } ) {
  const links = tableOfContents.map( linkifyTocObj );
  return (
    <Anchor>
      {links}
    </Anchor>
  );
}
