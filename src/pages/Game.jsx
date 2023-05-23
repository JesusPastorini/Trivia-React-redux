import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Questions from '../components/Questions';

class Game extends Component {
  componentDidMount() {
    this.fetchToken();
  }

  fetchToken = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      const { history } = this.props;
      history.push('/');
    }
  };

  render() {
    return (
      <div>
        <header>
          nome e email
        </header>
        <Questions />
      </div>
    );
  }
}
Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
