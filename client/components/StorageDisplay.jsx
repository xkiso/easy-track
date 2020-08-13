import React from 'react';
import TrackingDisplay from './TrackingDisplay';

const StorageDisplay = props => {
  //trackingNumbers, deleteTracking, getPackageStatus
  let trackingNumbers = props.trackingNumbers;
  let trackingDisplay = [];
  if (trackingNumbers) {
    let keysArray = Object.keys(trackingNumbers);

    trackingDisplay = keysArray.reduce( (acc, trackingNumber, index) => {
      acc.push(<TrackingDisplay
        key={`TD${index}`}
        trackingNumber={trackingNumber}
        carrier={trackingNumbers[trackingNumber].carrier}
        label={trackingNumbers[trackingNumber].label}
        removeTracking={() => props.removeTracking(trackingNumber)}
        getPackageStatus={() => props.getPackageStatus(trackingNumber, trackingNumbers[trackingNumber].carrier)}
      />);
      return acc;
    }, []);
  }
  return (
  <div id="storageBox">
    { trackingDisplay }
  </div>
  )
}

export default StorageDisplay;