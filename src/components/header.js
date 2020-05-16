import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { Menu } from 'antd';

const Header = ({ siteTitle }) => (
  <>
    <Menu
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key={0}>
        <Link
          to="/"
        > {siteTitle} </Link>
      </Menu.Item>

    </Menu>
  </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
