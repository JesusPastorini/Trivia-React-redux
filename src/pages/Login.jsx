import React, { Component } from 'react';
import Header from '../components/Header';

class Login extends Component {
  render() {
    return (
      <div>
        <Header />
        <form action="">
          <label htmlFor="input-name">
            <input type="text" name="name" id="input-name" />
          </label>

          <label htmlFor="input-email">
            <input type="email" name="email" id="input-email" />
          </label>
        </form>
      </div>
    );
  }
}

export default Login;
