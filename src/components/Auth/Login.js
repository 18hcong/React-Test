import { divide } from 'lodash';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import './Login.scss';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    // props.handleLogin(email, password);
    alert('Login successful')
  };
  return (
    <div className="login-container">
      <div className="header">Don't have an account yet?</div>
      <div className="title col-3 mx-auto">CongHoangdev</div>
      <div className="welcome col-3 mx-auto">Hello, who's this company</div>
      <div className="content-form col-3 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="example@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="At least 8 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <button className="btn btn-primary" onClick={()=>handleLogin()}>
            Login to CHdeveloper
            </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
