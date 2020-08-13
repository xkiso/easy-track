import React from 'react';

const TrackingDisplay = props => {
  // props : trackingNumber, carrier, label
  return (
    <div className="trackingBox">
      <div className="trackingNumber">
        {props.trackingNumber}
      </div>
      <div className="carrier">
        {props.carrier}
      </div>
      <div className="label">
        {props.label}
      </div>
      <button className="search" type="submit" onClick={props.getPackageStatus}>SEARCH</button>
      <button className="remove" type="submit" onClick={props.removeTracking}>REMOVE</button>
    </div>
  )
}

export default TrackingDisplay;