import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  btnGoHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <button
          data-testid="btn-go-home"
          onClick={ this.btnGoHome }
        >
          Ir para o Início

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
