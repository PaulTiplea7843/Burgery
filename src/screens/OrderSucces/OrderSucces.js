import React from 'react';
import './OrderSucces.css';
import BurgerImage from '../../images/burger-bg.png';
import OrderPlaced from '../../images/OrderPlaced.png';

const OrderWaiting = () => {
  return (
    <div>
      {' '}
      <img
        src={BurgerImage}
        style={{
          width: '100%',
          position: 'absolute',
        }}
      />{' '}
      <div className="d-flex justify-content-center align-items-center ordercard">
        <div className="card orderplaced">
          <div>
            <img src={OrderPlaced} alt="OrderPlaced" className="mb-3" />
          </div>
          <div className="order-title-text mb-3">BESTELLING GESLAAGD</div>
          <div className="order-subtitle-text mb-3">
            ONS TEAM DOET ZIJN BEST OM UW BESTELLING BINNEN 30 MINUTEN AF TE
            WERKEN. DE EXACTE TIJD VOOR UW BESTELLING ONTVANGT U VIA E-MAIL EN
            VINDT U HIERONDER TERUG.
          </div>
          <div className="order-waiting-time d-flex justify-content-center align-items-center">
            <div className="wait-time">14:50</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderWaiting;
