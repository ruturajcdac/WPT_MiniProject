import "bootstrap/dist/css/bootstrap.min.css";
import { FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa"; 

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container">
      {/* main div starts here */}
        <div className="row">

          {/* div for name and social media icons */}
          <div className="col-md-4">
            <h5 className="mb-3 fs-2">Pick Me Up</h5>
            <div className="d-flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                className="text-light"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="text-light"
              >
                <FaInstagram size={24} />
              </a>
              <a href="mailto:info@pickmeup.com" className="text-light">
                <FaEnvelope size={24} />
              </a>
            </div>
          </div>


          {/* div for the links with all pages created */}
          <div className="col-md-4">
            <h5 className="mb-3">Explore</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/About"
                  className="text-light text-decoration-none"
                >
                  About Us
                </a>
              </li>
              <li>
                <a href="/Login" className="text-light text-decoration-none">
                  Login Here
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="text-light text-decoration-none"
                >
                  Register Now
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-light text-decoration-none"
                >
                  Book an Cab
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-light text-decoration-none"
                >
                  Free Test Ride
                </a>
              </li>
            </ul>
          </div>



          {/* div for other things same as ola website */}
          <div className="col-md-4">
            <h5 className="mb-3">Information</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/"
                  className="text-light text-decoration-none"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-light text-decoration-none"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/Contact"
                  className="text-light text-decoration-none"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>


        {/* end part of footer  */}
        <hr className="text-light my-4" />
        <p className="text-center text-light">
          &copy; {new Date().getFullYear()} Pick me up. All rights reserved.
        </p>
      </div>

      {/* main div end here */}
    </footer>
  );
}

export default Footer;
