  import { useState } from 'react';
  import { Container } from 'react-bootstrap';
  import './Register.scss';
  import { useNavigate } from 'react-router-dom';
  import { postLogin, postRegister } from '../../services/apiServices';
  import { toast } from 'react-toastify';
  import { VscEye, VscEyeClosed } from 'react-icons/vsc';

  const Register = (props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const handleRegister = async () => {
      //validate
      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        toast.error(`Invalid email`);
        return;
      }
      if (!password) {
        toast.error(`Invalid password`);
        return;
      }
      //submit apis
      let data = await postRegister(email, password, username);
      if (data && data.EC === 0) {
        toast.success(data.EM);
        navigate('/login');
      }
      if (data && +data.EC !== 0) {
        toast.error(data.EM);
      }
    };
    return (
      <div className="register-container">
        <div className="header">
          Don't have an account yet?
          <button
            onClick={() => {
              navigate('/');
            }}
          >
            Log in
          </button>
        </div>
        <div className="title col-3 mx-auto">CongHoang &amp; Cee</div>
        <div className="welcome col-3 mx-auto">
          Start creating an account with us.
        </div>
        <div className="content-form col-3 mx-auto">
          <div className="form-group">
            <label>Email (*)</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group pass-group">
            <label>Password (*)</label>
            <input
              type={isShowPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {isShowPassword ? (
              <span
                className="icons-eye"
                onClick={() => setIsShowPassword(false)}
              >
                <VscEye />
              </span>
            ) : (
              <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
                <VscEyeClosed />
              </span>
            )}
          </div>
          <div className="form-group">
            {/* <label>Username</label> */}
            <input
              type="username"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <span className="forgot-password">Forgot password?</span>
          <div>
            <button className="btn btn-primary" onClick={() => handleRegister()}>
              Create my free account
            </button>
            <div className="text-center">
              <span
                className="back"
                onClick={() => {
                  navigate('/');
                }}
              >
                &#60;&#60; Go to Homepage
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Register;
