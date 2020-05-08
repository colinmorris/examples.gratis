import React from 'react';
import { Anchor } from 'antd';

import 'antd/dist/antd.css';

const { Link } = Anchor;

export default function FloatingAnchorNav( { headings, tableOfContents } ) {
  console.assert(headings.length === tableOfContents.length);
  const f = (i, end) => {
    if (i >= end || i === -1) return;
    const currHd = headings[i];
    const nextSiblingIx = headings.findIndex( (hd, j) => (
        j > i && hd.depth <= currHd.depth
    ));
    return (
      <>
      <Link
        href={tableOfContents[i].url}
        title={currHd.value}
      >
        {f(i+1, nextSiblingIx)}
      </Link>
      {f(nextSiblingIx, end)}
      </>
    );
  };
  const links = f(0, headings.length);
  return (
    <Anchor>
      {links}
    </Anchor>
  );
}
