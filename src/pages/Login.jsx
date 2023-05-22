import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTokenAPI } from '../assets/services';
import { addPlayerInfo } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisabled: true,
  };

  // função que habilita/desabilita o botão
  isDisabled = () => {
    const { name, email } = this.state;
    const validEmail = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    const two = 2;

    if (email.match(validEmail) && name.length > two) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  // função que redireciona a partir do botão play
  onClickButtonPlay = async () => {
    const data = await fetchTokenAPI();
    localStorage.setItem('token', (data.token));
    const { email, name } = this.state;
    const { dispatch, history } = this.props;
    dispatch(addPlayerInfo({ email, name }));
    history.push('/game');
  };

  // função que redireciona a partir do botão configuracoes
  onClickButtonConfig = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/config');
  };

  // função que salva os dados de nome, email e disabled do botão no estado local da página
  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.isDisabled);
  };

  render() {
    const { isDisabled } = this.state;

    return (
      <div>
        <form action="">
          <label htmlFor="input-email">
            <input
              type="email"
              name="email"
              id="input-email"
              placeholder="Digite seu e-mail"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="input-name">
            <input
              type="text"
              name="name"
              id="input-name"
              placeholder="Digite seu nome"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            disabled={ isDisabled }
            data-testid="btn-play"
            onClick={ this.onClickButtonPlay }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.onClickButtonConfig }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
