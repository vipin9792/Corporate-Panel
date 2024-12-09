import React from 'react';

const SuccessFailPages = () => {
  return (
    <div>
      <div style={{ padding: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button
            type="button"
            style={{
              backgroundColor: '#198754',
              color: 'white',
              margin: '0.5rem',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.25rem',
            }}
            data-bs-toggle="modal"
            data-bs-target="#statusSuccessModal"
          >
            Success Modal
          </button>
          <button
            type="button"
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              margin: '0.5rem',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.25rem',
            }}
            data-bs-toggle="modal"
            data-bs-target="#statusErrorsModal"
          >
            Error Modal
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', flexDirection: 'column', flexWrap: 'wrap', marginTop: '2rem' }}>
          <div style={{ background: 'rgba(236,239,243,.2)', boxShadow: '0.67px 3.67px 8px #186edf3b', margin: '1rem', width: '100px', height: '100px' }}></div>
          <div style={{ background: 'rgba(236,239,243,.35)', boxShadow: '0 0 10px #0000001a', margin: '1rem', width: '100px', height: '100px' }}></div>
          <div style={{ background: 'rgb(245 246 248)', boxShadow: '-2px -3px 56px #186edf17, 2px 4px 14px #186edf14', margin: '1rem', width: '100px', height: '100px' }}></div>
          <div style={{ background: 'rgba(39,73,125,.14)', boxShadow: '0 0 10px 5px rgb(0 0 0 / 15%)', margin: '1rem', width: '100px', height: '100px' }}></div>
          <div style={{ background: 'rgba(255,255,255,1)', boxShadow: '0 6px 65px #27497d17', margin: '1rem', width: '100px', height: '100px' }}></div>
        </div>

        <div className="modal fade" id="statusErrorsModal" tabIndex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div className="modal-content">
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                  <circle className="path circle" fill="none" stroke="#db3646" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                  <line className="path line" fill="none" stroke="#db3646" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
                  <line className="path line" fill="none" stroke="#db3646" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2" />
                </svg>
                <h4 style={{ color: '#dc3545', marginTop: '1rem' }}>Invalid email!</h4>
                <p style={{ marginTop: '1rem' }}>This email is already registered, please login.</p>
                <button type="button" style={{ backgroundColor: '#dc3545', color: 'white', padding: '0.25rem 0.5rem', border: 'none', borderRadius: '0.25rem', marginTop: '1rem' }} data-bs-dismiss="modal">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="statusSuccessModal" tabIndex="-1" role="dialog" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
            <div className="modal-content">
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                  <circle className="path circle" fill="none" stroke="#198754" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                  <polyline className="path check" fill="none" stroke="#198754" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5" />
                </svg>
                <h4 style={{ color: '#198754', marginTop: '1rem' }}>Oh Yeah!</h4>
                <p style={{ marginTop: '1rem' }}>You have successfully registered and logged in.</p>
                <button type="button" style={{ backgroundColor: '#198754', color: 'white', padding: '0.25rem 0.5rem', border: 'none', borderRadius: '0.25rem', marginTop: '1rem' }} data-bs-dismiss="modal">
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessFailPages;
