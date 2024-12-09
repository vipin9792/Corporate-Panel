import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Slider = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // State to hold carousel data
  const [carouselData, setCarouselData] = useState([]);

  // Fetch carousel data from API
  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const response = await axios.post('http://103.35.121.219:4000/init/getPhotoSlider', {}, {
          headers: {
            Authorization: 'Bearer !WCZVSa3eTg!rE8#0GjAhulUyvOuu!TKB1vz$Y!baEak&u.ZMvikJ3OrjwvcGe91H5@nNY200EkYECpOYRNbu25aipgUGK0Ebi6HuNUDZsV$.MaKIikX6sg!9FaQnJcz',
          },
        });

        if (response.data.code === 1000) {
          setCarouselData(response.data.photos);
        } else {
          setError('Failed to fetch carousel data');
        }
      } catch (err) {
        setError('Error fetching data');
      }
    };

    fetchCarouselData();
  }, []); // Empty dependency array to run once on mount

  return (
    <>
      <div className="col-lg-6 bg-white bg-icons-right">
        <h4>About <br /> <span className="fw-bold">Pareekshan</span></h4>
        <div className="imageicon1 signupFormIcons">
          <img src="book.svg" alt="book" />
          <img src="star-boy.svg" alt="star-boy" />
          <img src="support.svg" alt="support" />
          <img src="gradutation-cap.svg" alt="graduation-cap" />
          <img src="puzzle.svg" alt="puzzle" />
        </div>

        <div className="warapper-form-alert carouselWrapper" style={{ marginTop: "40px" }}>
          <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" style={{ width: '400px', margin: 'auto' }}>
            <div className="carousel-inner">
              {carouselData.length > 0 ? (
                carouselData.map((item, index) => (
                  <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={item.id}>
                    <img src={item.photo_url} className="d-block w-100" alt={`Slide ${item.id}`} />
                    <div className="carousel-content text-center">
                      <h5 style={{ color: "grey" }}>{item.photo_text}</h5>
                    </div>
                  </div>
                ))
              ) : (
                <div className="carousel-item active">
                  <img src="item-1.svg" className="d-block w-100" alt="First slide" />
                  <div className="carousel-content text-center">
                    <h5>No Data Available</h5>
                  </div>
                </div>
              )}
            </div>

            <div className="carousel-buttons text-center mt-3">
              <button className="btn btn-primary btn-sm" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <i className="bi bi-chevron-left text-white fs-6" style={{marg}}></i>
              </button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-primary btn-sm" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <i className="bi bi-chevron-right text-white fs-6"></i>
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Slider;
