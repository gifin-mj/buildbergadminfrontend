import { useState } from 'react';
import API from '../api';
import { setToken } from '../auth';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css'


function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { username, password });

      setToken(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert('Username or Password Incorrect');
      setPassword('')
      setUsername('')
    }
  };

  return (
    // <div>
    //   <h2>Admin Login</h2>
    //   <form onSubmit={handleLogin}>
    //     <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
    //     <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
    //     <button type="submit">Login</button>
    //   </form>
    // </div>
    <section className="loginpage">
      <div className="logincontainer">
        <form onSubmit={handleLogin}>
          <p className="headline">Admin Login</p>

          <div className="box">
            <p>Username</p>
            <div>
              <input
              className='logininput'
                type="text"
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="box">
            <p>Password</p>
            <div style={{ position: "relative" }}>
              <input
              className='logininput'
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer"
                }}
              >
                {showPassword ? 
                 <i className="fa-solid fa-eye-slash" style={{color:'white'}}></i>
                 : 
                 <i className="fa-solid fa-eye" style={{color:'white'}}></i>
                 }
              </span>
            </div>
          </div>

          <button type="submit" className="loginBtn">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
