import React, { useState } from "react";
import { Link } from "react-router-dom";

import Backdrop from "../UIElements/Backdrop";
import SideDrawer from "./SideDrawer";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";

function MainNavigation(props) {
  const [drawerIsOpen, setDraweIsOpen] = useState(false);

  function openDrawerHandler() {
    setDraweIsOpen(true);
  }

  function closeDrawerHandler() {
    setDraweIsOpen(false);
  }

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onPress={closeDrawerHandler} />}

      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__draer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Place Sharing!</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
}

export default MainNavigation;
