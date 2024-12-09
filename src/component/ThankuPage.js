import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "./ThankuPage.css";
import { Link } from "react-router-dom";
import Slider from "./Slider";

const ThankuPage = () => {
  return (
    <div>
      <section>
        <div>
          <div className="row credential">
            <div className="col-lg-6 bg-primary text-white bg-icons">
              <div className="imageicon">
                <img
                  src="logo1.png"
                  alt="logo"
                  id="logo"
                  style={{ mixBlendMode: "luminosity", opacity: "0.8" }}
                />
                <img src="pen-scale.svg" alt="bg-icon-1" />
                <img src="boy.svg" alt="boy" />
                <img src="bulb1.svg" alt="bulb1" />
                <img src="computer-person.svg" alt="computer-person" />
              </div>

              <section>
                <div
                  className="confirmation-container text-center"
                  style={{ marginTop: "140px" }}
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="check-icon"
                  />
                  <h1 className="display-4">Thank You!</h1>
                  <p className="lead">
                    Your account has been successfully created.
                  </p>
                  <hr className="my-4" />
                  <p>Click the button below to continue to the homepage.</p>
                  <Link
                    to="/LoginForm"
                    className="btn btn-success btn-lg"
                    role="button"
                  >
                    Go to login page
                  </Link>
                </div>
              </section>
            </div>

            <Slider />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThankuPage;
