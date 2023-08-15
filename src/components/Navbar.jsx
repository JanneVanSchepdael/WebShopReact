import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../UserProvider';

function NavItem({ label, to, onClick }) {
  return (
    <li className="nav-item">
      <Link to={to} className={`nav-link active`} onClick={onClick}>
        {label}
      </Link>
    </li>
  );
}

function UserDropdown() {
  const { user, logout } = useContext(UserContext);

  return user ? (
    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
      <li><Link to="/profile">View Profile</Link></li>
      <li><Link onClick={logout}>Logout</Link></li>
    </ul>
  ) : (
    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
      <li><Link to="/login">Login</Link></li>
    </ul>
  );
}


function NavBar() {
  const handleButtonClick = () => {
    toast.info("This page falls outside the scope of this thesis.");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white w-100 navigation" id="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand font-weight-bold">WebShop React</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar"
          aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="main-navbar">
          <ul className="navbar-nav mx-auto">
            <NavItem label="Home" to="/" />
            <NavItem label="Shop" to="/products" />
            <NavItem label="About" onClick={handleButtonClick} />
            <NavItem label="Contact" onClick={handleButtonClick} />
          </ul>
        </div>

        <ul className="top-menu list-inline mb-0 d-none d-lg-block" id="top-menu">
          <li className="list-inline-item"><a href="/cart"><i className="tf-ion-android-cart"></i></a></li>
          <li className="list-inline-item nav-item dropdown dropdown-slide">
            <a className="nav-link dropdown-toggle" href="/profile" id="navbarDropdown" role="button" data-delay="350"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="tf-ion-ios-person mr-3"></i>
            </a>

            <UserDropdown />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;