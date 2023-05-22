import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div>
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
