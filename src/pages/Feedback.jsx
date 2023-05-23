import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const low = 3;

    return (
      <div>
        <p data-testid="feedback-text">
          { assertions < low ? 'Could be better...' : 'Well Done!' }
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
