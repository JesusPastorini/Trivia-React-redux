import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const { gravatarEmail, name, score } = this.props;
    const player = {
      gravatarEmail,
      name,
      score,
    };

    const oldRanking = JSON.parse(localStorage.getItem('ranking')) || [];

    const newRanking = [...oldRanking, player];

    newRanking.sort((a, b) => b.score - a.score);

    this.setState({ ranking: newRanking }, () => {
      const { ranking } = this.state;
      localStorage.setItem('ranking', JSON.stringify(ranking));
    });

    const hashEmail = md5(gravatarEmail).toString();
    player.hashEmail = hashEmail;
  }

  btnGoHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <ul>
          { ranking.map((player, index) => (
            <li key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${player.hashEmail}` }
                alt="profile-gravatar"
              />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{ player.score}</p>
            </li>
          )) }
        </ul>
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

Ranking.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Ranking);
