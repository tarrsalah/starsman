import React, { useState } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="light" light>
      <div className="container">
        <NavbarBrand href="/">✨ Starsman</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/login">👤 Sign in</NavLink>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
};
