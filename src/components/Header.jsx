import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userEmail, name, score } = this.props;
    const hashEmail = md5(userEmail).toString();

    return (
      <main>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="profile-gravatar"
        />

        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </main>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
