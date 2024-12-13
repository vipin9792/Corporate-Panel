import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "./Slider";




const ChangePassword = () => {
 
  return (
    <div>
      <section>
        <div>
          <div className="row credential">
            <div className="col-lg-6 text-white bg-icons bg-primary">
              <div className="imageicon">
                <img
                  src="../logo1.png"
                  alt="../logo"
                  id="logo"
                  style={{ mixBlendMode: "luminosity", opacity: "0.8" }}
                />
                <img src="../pen-scale.svg" alt="bg-icon-1" />
                <img src="../boy.svg" alt="boy" />
                <img src="../bulb1.svg" alt="bulb1" />
                <img src="../computer-person.svg" alt="computer-person" />
              </div>
              <div className="warapper-form">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h4
                    className="text-secondary"
                    style={{ marginLeft: "222px" }}
                  >
                    Corporate <br /> <span className="text">Login</span>
                  </h4>
                </div>

             
              </div>
            </div>

            <Slider />
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default ChangePassword;
