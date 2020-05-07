import React from 'react';
import { Link } from "gatsby";
import { Breadcrumb } from 'antd';

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
      {crumbs}
    </Breadcrumb>
  );
}

