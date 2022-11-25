import React from "react";
import "./Header.css";

import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container container">
        <Link className="header-link-logo" to="/">
          <h1 className="header-logo bold">Vans</h1>
        </Link>
      </div>
    </header>
  );
}
