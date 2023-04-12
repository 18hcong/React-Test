import { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = async () => {
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
    setIsLoading(true)
    //submit apis
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate('/');
    }
    if (data && +data.EC !== 0) {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="header">
        Don't have an account yet?
        <button onClick={() => navigate('/register')}> Sign Up</button>
      </div>
      <div className="title col-3 mx-auto">CongHoang &amp; Cee</div>
      <div className="welcome col-3 mx-auto">Hello, who's this ???</div>
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
          <button
            className="btn btn-primary"
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            {isLoading === true && <CgSpinnerTwoAlt className="loader-icon" /> }
            <span>Login to CHdeveloper</span>
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

export default Login;
