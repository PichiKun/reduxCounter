import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component
class Counter extends Component {
  render() {
    const { value, onIncreaseClick, onResetClick } = this.props;
    return (
        <div>
            <span>{value}</span>
            <button onClick={onIncreaseClick}>Increase</button>
            <button onClick={onResetClick}>Reset</button>
      </div>
    )
  }
}


Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired,
  onResetClick: PropTypes.func.isRequired
};

// Action
const increaseAction = { type: 'increase' };
const resetAction = { type: 'reset'};

// Reducer
function counter(state = { count: 0 }, action) {
  const count = state.count;
  switch (action.type) {
    case 'reset':
      return { count : 0 };
    case 'increase':
      return { count: count + 1 };
    default:
      return state
  }
}

// Store
const store = createStore(counter);

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onResetClick: () => dispatch(resetAction),
    onIncreaseClick: () => dispatch(increaseAction)
  }

}

// Connected Component
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
