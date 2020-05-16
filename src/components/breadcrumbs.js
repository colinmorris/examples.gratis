import React from 'react';
import { Link } from "gatsby";
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

import 'antd/es/breadcrumb/style/index.css';

/* props.ancestry is a list of strings representing the path through the category
   tree up to the current point. e.g. ['Python', 'Pandas']
 */
export default function Breadcrumbs( {ancestry} ) {
  const crumbs = ancestry.map( (cat, i) => {
    const path = "/" + ancestry.slice(0, i+1).join('/');
    return (
      <Breadcrumb.Item key={i}>
        <Link to={path}>{cat}</Link>
      </Breadcrumb.Item>
    );
  });
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">
        <HomeOutlined />
      </Breadcrumb.Item>
      {crumbs}
    </Breadcrumb>
  );
}

