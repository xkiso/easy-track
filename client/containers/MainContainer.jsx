import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/actions';
import StatusDisplay from '../components/StatusDisplay';
import AddDisplay from '../components/AddDisplay';
import StorageDisplay from '../components/StorageDisplay';

const mapStateToProps = ( {tracking} ) => {
  return tracking;
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const MainContainer = props => {
  console.log('MainContainer', props);
  return (
    <div className="container">
      <StorageDisplay
        trackingNumbers={props.trackingNumbers}
        getPackageStatus={props.getPackageStatus}
        removeTracking={props.removeTracking}
      />
      <AddDisplay
        inputTracking={props.inputTracking}
        inputLabel={props.inputLabel}
        inputCarrier={props.inputCarrier}
        updateTracking={props.updateTracking}
        updateCarrier={props.updateCarrier}
        updateLabel={props.updateLabel}
        addTracking={props.addTracking}
      />
      <StatusDisplay
        display={props.display}
      />
    </div>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);