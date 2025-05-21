// import React from 'react';

// function Home() {
//   return (
//     <div className="container">
//       <h1 className="display-4">Welcome to Our Website</h1>
//       <p className="lead">This is the home page.  We can add some introductory content here.</p>
//       <p>You can use Bootstrap to structure your page content.</p>
//     </div>
//   );
// }

// export default Home;


import "bootstrap/dist/css/bootstrap.min.css";
import car1 from "../images/car1.svg";
import car2 from "../images/car2.svg";
import car3 from "../images/car3.svg";
import data1 from "../images/data1.svg";
import data2 from "../images/data2.svg";
import data3 from "../images/data3.svg";
import bg from "../images/bg.jpg";

function Home() {
  return (
    <div className="pt-5">
      <section className="bg-light py-5">
        {/* my main section start  */}
        <div className="container">
          {/* first container starting  */}
          <div className="row align-items-center">
            <div className="col-md-6">
              {/* left container  */}
              <h1 className="display-4 fw-bold mb-3">
                Request a ride for now or later
              </h1>
              <p className="lead mb-4">
                Add your trip details, hop in, and go.
              </p>

              <div className="mb-4">
                <label
                  htmlFor="enterLocation"
                  className="form-label visually-hidden"
                >
                  Enter location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="enterLocation"
                  placeholder="Enter Location"
                  style={{ outline: "none", boxShadow: "none" }}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="enterDestination"
                  className="form-label visually-hidden"
                >
                  Enter destination
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="enterDestination"
                  placeholder="Enter destination"
                  style={{ outline: "none", boxShadow: "none" }}
                />
              </div>
              <div>
                <button className="btn btn-dark me-2">See prices</button>
                <button className="btn btn-outline-secondary">
                  Schedule for later
                </button>
              </div>
            </div>
            {/* right container starts here  */}
            <div className="col-md-6 d-none d-md-block">
              <img
                src={bg}
                alt="Request a ride"
                className="img-fluid rounded-lg shadow-sm"
                style={{ maxWidth: "80%", height: "auto" }}
              />
            </div>
          </div>
          {/* first container div ends here  */}
        </div>
        {/* main section ends here  */}
      </section>

      {/* secont section og home start  */}
      <section className="bg-light py-5 vh-100 d-flex align-items-center justify-content-center">
        <div className="container text-center">
          {/* min container start here  */}
          <h2>Global mobility ecosystem driving communities forward</h2>
          <div className="row justify-content-around mt-4">
            {/* inner div for 3 sencion  */}
            <div className="col-md-3">
              {/* 1 st div  */}
              <img
                src={data1}
                alt="Cities Covered"
                className="img-fluid mb-2"
                style={{ opacity: 0.6, maxWidth: "80px" }}
              />
              <p className="h3">250+</p>
              <p className="lead">Cities covered</p>
              <p className="small text-muted">
                Across India, Australia, New Zealand and the UK
              </p>
            </div>
            <div className="col-md-3">
              {/* 2 nd div  */}
              <img
                src={data2}
                alt="Yearly Rides"
                className="img-fluid mb-2"
                style={{ opacity: 0.6, maxWidth: "80px" }}
              />
              <p className="h3">55 Cr+</p>
              <p className="lead">Yearly rides</p>
              <p className="small text-muted">
                Booked by our customers every year
              </p>
            </div>
            <div className="col-md-3">
              {/* 3 rd div  */}
              <img
                src={data3}
                alt="Kilometers on S1"
                className="img-fluid mb-2"
                style={{ opacity: 0.6, maxWidth: "80px" }}
              />
              <p className="h3">12 Cr+</p>
              <p className="lead">Kilometers on S1</p>
              <p className="small text-muted">
                Distance covered on scooters within a year of launch
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-white vh-100 d-flex align-items-center justify-content-center">
        {/* third section oh home starts here  */}
        <div className="container text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            There's an Pick me up ride for everyone
          </h1>
          <div className="row justify-content-center">
            {/* dividing it in three sections  */}
            <div className="col-md-4 mb-4">
              {/* 1 st section  */}
              <div className="card border-0 shadow-sm rounded-lg">
                <img
                  src={car1}
                  alt="For any budget"
                  className="card-img-top rounded-top-lg"
                />
                <div className="card-body">
                  <h2 className="card-title text-xl font-semibold text-gray-800 mb-2">
                    For any budget
                  </h2>
                  <p className="card-text text-gray-600">
                    From Bikes and Autos to Prime Sedans and Prime SUVs, you
                    will find a ride in your budget at your convenience anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* 2 nd section  */}
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm rounded-lg">
                <img
                  src={car2}
                  alt="For any distance"
                  className="card-img-top rounded-top-lg"
                />
                <div className="card-body">
                  <h2 className="card-title text-xl font-semibold text-gray-800 mb-2">
                    For any distance
                  </h2>
                  <p className="card-text text-gray-600">
                    Book rides within the city with Daily, or take a trip to
                    your favourite destinations outside the city with
                    Outstation.
                  </p>
                </div>
              </div>
            </div>

            {/* 3 rd section  */}
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm rounded-lg">
                <img
                  src={car3}
                  alt="For any duration"
                  className="card-img-top rounded-top-lg"
                />
                <div className="card-body">
                  <h2 className="card-title text-xl font-semibold text-gray-800 mb-2">
                    For any duration
                  </h2>
                  <p className="card-text text-gray-600">
                    Easily plan a day out without having to worry about
                    conveyance with an hour-based package from Rental.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;