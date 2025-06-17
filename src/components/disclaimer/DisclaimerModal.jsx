import React from 'react';
import Disclaimer from './Disclaimer';
import './DisclaimerModal.css';

const DisclaimerModal = ({ isOpen, onAccept, onDecline }) => {
  if (!isOpen) return null;

  return (
    <div className="disclaimer-modal-overlay">
      <div className="disclaimer-modal">
        <Disclaimer onAccept={onAccept} onDecline={onDecline} />
      </div>
    </div>
  );
};

export default DisclaimerModal; 