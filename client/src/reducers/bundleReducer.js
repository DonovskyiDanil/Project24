import ACTION from '../actions/actionTypes';

const initialState = {
  bundle: null,
};

function bundleReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.SELECT_BUNDLE_ACTION: {
      return {
        bundle: action.bundle,
      };
    }
    case ACTION.CLEAR_BUNDLE_ACTION: {
      return {
        bundle: null,
      };
    }
    default:
      return state;
  }
}

export default bundleReducer;
