"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "@/app/styles/header.css";
import "@/app/styles/responsive.css";
import { usePathname } from "next/navigation";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "@/app/assets/logo.webp";
import UI from "@/app/constants/ui";
import URL from "@/app/constants/urls";
import NewTag from "@/app/components/newTag/NewTag";
import "@/app/styles/globals.css";

function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [forEmployers, setForEmployers] = useState(false);
  const [clientPathname, setClientPathname] = useState(""); // ✅ Fix hydration mismatch
  const [isClient, setIsClient] = useState(false); // ✅ Ensures safe window usage

  const pathname = usePathname();

  useEffect(() => {
    setClientPathname(pathname);
    setIsClient(true);
  }, [pathname]);

  const handleLinkClick = () => {
    setForEmployers(!forEmployers);
  };

  const renderTheNavItemNames = () => {
    if (clientPathname === URL.JOB_SEEKER || clientPathname === URL.HOME) {
      return UI.FOR_RECRUITERS;
    }
    return UI.FOR_JOB_SEEKERS;
  };

  const renderTheNavItemlink = () => {
    if (clientPathname === URL.JOB_SEEKER || clientPathname === URL.HOME) {
      return URL.RECRUITERS;
    }
    return URL.JOB_SEEKER;
  };

  return (
    <header
      className="theme_header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 1px 2px rgba(0,0,0,.12)",
      }}
    >
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link href="/">
            <img
              src={logo.src}
              alt={UI.ALT_ALIGNMYCAREER}
              width="70%"
              height="100%"
              loading="lazy"
              title={UI.ALT_ALIGNMYCAREER}
            />
          </Link>
          <Button
            variant="primary"
            onClick={handleShow}
            className="nav_toggler"
          >
            <span className="navbar-toggler-icon" />
          </Button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {isClient && clientPathname !== URL.BLOG_PAGE && ( // ✅ Fix hydration issue
                  <li
                    className="nav-item"
                    style={{ width: "7rem", position: "relative" }}
                  >
                    <Link href={URL.BLOG_PAGE} target="_blank">
                      {UI.BLOG_PAGE}
                    </Link>
                    <span
                      style={{
                        marginLeft: "4px",
                        position: "absolute",
                        top: "-5px",
                      }}
                    >
                      <NewTag />
                    </span>
                  </li>
                )}

                <li className="nav-item">
                  <Link href={renderTheNavItemlink()} onClick={handleLinkClick}>
                    {renderTheNavItemNames()}
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href={URL.LOGIN} className="transparent-btn">
                    {UI.LOGIN_HOME_PAGE}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href={URL.REGISTER} className="white-btn">
                    {UI.SIGNUP}
                  </Link>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>

      <Offcanvas show={show} onHide={handleClose} className="header-css">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Link href="/" className="navbar-brand">
              <img
                src={logo.src}
                alt={UI.ALT_ALIGNMYCAREER}
                loading="lazy"
                title={UI.ALT_ALIGNMYCAREER}
              />
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <nav className="navbar navbar-expand-lg mobile_menu">
            <div className="container w-100">
              <form className="d-flex w-100" role="search">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
                  <li className="nav-item list">
                    <Link
                      href={renderTheNavItemlink()}
                      onClick={handleLinkClick}
                      className="nav-link navigation"
                    >
                      {renderTheNavItemNames()}
                    </Link>
                  </li>

                  {isClient && clientPathname !== URL.BLOG_PAGE && ( // ✅ Fix hydration issue
                    <li
                      className="nav-item"
                      style={{ width: "7rem", position: "relative" }}
                    >
                      <Link
                        href={URL.BLOG_PAGE}
                        target="_blank"
                        style={{ textDecoration: "none" }}
                      >
                        {UI.BLOG_PAGE}
                      </Link>
                      <span
                        style={{ marginLeft: "4px", position: "absolute" }}
                      >
                        <NewTag />
                      </span>
                    </li>
                  )}

                  <div className="d-flex mobile-button">
                    <li className="nav-item">
                      <Link href={URL.LOGIN} className="transparent-btn">
                        {UI.LOGIN_HOME_PAGE}
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link href={URL.REGISTER} className="white-btn">
                        {UI.SIGNUP}
                      </Link>
                    </li>
                  </div>
                </ul>
              </form>
            </div>
          </nav>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
}

export default Header;
