import React, { useState } from "react";
import { Navbar, NavbarBrand } from "reactstrap";

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Navbar color="light">
      <div className="container">
        <NavbarBrand>
          <h3>✨ starsman</h3>
        </NavbarBrand>
      </div>
    </Navbar>
  );
};
