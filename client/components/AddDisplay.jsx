import React from 'react';

const AddDisplay = ({inputTracking, updateTracking, inputCarrier,
  updateCarrier, inputLabel, updateLabel, addTracking}) => (

  <div id="addBox">
      <form onSubmit={(e) => addTracking(e, inputTracking, inputLabel, inputCarrier)}>
        <label>
          Tracking Number:
          <input value={inputTracking} onChange={e => updateTracking(e.target.value)} required />
        </label>
        <label>
          Carrier:
          <select onChange={e => updateCarrier(e.target.value) } required>
            <option disabled selected> -- select -- </option>
            <option value='ups'>UPS</option>
            <option value='usps'>USPS</option>
            <option value='fedex'>FedEx</option>
          </select>
        </label>
        <label>
          Label:
          <input type="text" value={inputLabel} placeholder="eg. Amazon, Macy's, ..."
            onChange={e => updateLabel(e.target.value)} required />
        </label>
        <input className="add" type="submit" value="+"></input>
    </form>
  </div>
)

export default AddDisplay;