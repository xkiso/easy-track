import React from 'react';

const StatusDisplay = props => {
  // display
  console.log('props.display', props.display);
  let p = props.display;
  let result = (<h3>Please enter a tracking number or use the search feature above.</h3>);
  if (Object.entries(p).length > 0) {

    let events = (p.events).reduce((acc, value, index) => {
      let date = value.carrier_occurred_at;
      if (date)
        date = 'at ' + date.replace(/[TZ]/g, " ");
      acc.push(
        <p key={`events${index}`} className="transitEvents">{value.description} in {value.city_locality}, {value.state_province} {date || ""}</p>
      )
      return acc;
    }, []);

    result = (
      <>
        <div className='overview'>
          <h2>{p.tracking_number}</h2>
          <h4>Your package is: {p.status_description}</h4>
          <h4>Current Status: {p.carrier_status_description}</h4>
          <h4>Estimated Delivery Date: {(p.estimated_delivery_date ? p.estimated_delivery_date.replace(/[TZ]/g, " ") : 'N/A')}</h4>
        </div>
        <div className='events'>
          { events }
        </div>
      </>
    )
  }
  return (
    <div id="statusBox">
      { result }
    </div>
  )
};

export default StatusDisplay;