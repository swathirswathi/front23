import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNav from "../../Components/MainNav/mainNav"
import "./User.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import Profile from "../../Components/Cars/Profile";
import Reservation from "../Reservations/Reservation";
import { GoogleLogin } from "@react-oauth/google";


function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ2aWduZXNoMzQ1Iiwicm9sZSI6ImFkbWluIiwibmJmIjoxNzA4ODI1NzA3LCJleHAiOjE3MDg5MTIxMDcsImlhdCI6MTcwODgyNTcwN30.6JKSVE94yHVfCvHCO2mRNownfWmKgLTGWO7x3fZA57o"
  );

  const [adminId, setAdminId] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin(e) {
    e.preventDefault(); //Used to prevent default behavior of an event.

    try {
      const result = await axios.post("http://localhost:5260/Login", {
        username: username,
        password: password,
        role: "user",
        token: "string",
      });
      localStorage.setItem('token', result.data.token);
      <Profile data={{ username: username, password: password }} />;
      setToken(result.data.token);
      toast.success("Login Success");
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/dashboard", { state: { username, token} });
    } catch (err) {
      alert("Invalid Username or Password");
    }
  }

  async function AdminLogin(e) {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:5260/Login", {
        username: username,
        password: password,
        role: "admin",
        token: "string",
      });
      const { token, adminId } = result.data;
      setToken(token);
      setAdminId(adminId);
      localStorage.setItem('token', result.data.token);
      <Profile data={{ username: username, password: password }} />;
      <Reservation data={{ username: username, password: password }} />;
      setToken(result.data.token);
      toast.success("Login Success");
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/adminDashboard", { state: { username, token } });
    } catch (err) {
      alert("Invalid Username or Password ");
    }
  }

  return (
    <>
      <MainNav />
      <ToastContainer />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card">
              <div className="card-body">
                {props.isadmin ? (
                  <h2 className="card-title text-center mb-4"> Admin Login</h2>
                ) : (
                  <h2 className="card-title text-center mb-4"> User Login</h2>
                )}

                <form>

                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <div className="toggle">
                      <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={togglePasswordVisibility}
                      />
                      <label
                        htmlFor="showPassword"
                        className="form-check-label ml-2"
                      >
                        Show Password
                      </label>
                    </div>

                  </div>

                  <div className="div">
                    <span>
                      <Link to="/forgot_password">Forgot Password?</Link>
                    </span>

                    {props.isadmin ?(
                    <span className="newuser">
                      <Link to="/adminRegister">New Admin?</Link>
                    </span>):(
                       <span className="newuser">
                       <Link to="/register">New User?</Link>
                     </span>
                    )}

                  </div>
                  <div className="usergmail">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        const decoded = jwtDecode(
                          credentialResponse?.credential
                        );
                        navigate("/dashboard", {
                          state: {
                            email: decoded.email,
                            name: decoded.name,
                            pic: decoded.picture,
                            token: token,
                          },
                        });
                      }}
                      onError={() => {
                        alert("Login Failed");
                      }}
                    />
                  </div>
                  <br></br>

                  {props.isadmin ? (
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={AdminLogin}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Login"}
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary w-100"
                      onClick={handleLogin}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Login"}
                    </button>
                  )}
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
