import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black fixed-top">
    {/* main container start here  */}
      <div className="container">
        <Link className="navbar-brand fs-4 fw-bold" to="/">
          Pick Me Up
        </Link>
        {/* div for the navigation content at right side  */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
        {/* unordered list for all pages  */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contact">
                Contact
              </Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link text-white" to="/users">
                Users
              </Link>
            </li>
          </ul>
        </div>
        {/* div for right container end here  */}
      </div>
      {/* main container end here  */}
    </nav>
  );
}

export default Navbar;
