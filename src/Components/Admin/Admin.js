import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNav from "./mainNav";
import "./Admin.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Profile";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Admin(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJ2aWduZXNoMzQ1Iiwicm9sZSI6ImFkbWluIiwibmJmIjoxNzA4ODI1NzA3LCJleHAiOjE3MDg5MTIxMDcsImlhdCI6MTcwODgyNTcwN30.6JKSVE94yHVfCvHCO2mRNownfWmKgLTGWO7x3fZA57o"
  );
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:5260/Login", {
        username: username,
        password: password,
        role: "admin",
        token: "string",
      });
      <Profile data={{ username: username, password: password }} />;
      setToken(result.data.token);
      toast.success("Login Success");
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/AdminDashboard", { state: { username, token } });
    } catch (err) {
      toast.error(err);
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
                <h2 className="card-title text-center mb-4"> Admin Login</h2>
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

                    <span className="newuser">
                      <Link to="/adminregister">New Admin?</Link>
                    </span>
                  </div>
                  <div className="usergmail">
                    <GoogleLogin
                      onSuccess={(credentialResponse) => {
                        const decoded = jwtDecode(
                          credentialResponse?.credential
                        );
                        console.log(decoded);
                        navigate("/adminDashboard", {
                          state: {
                            email: decoded.email,
                            name: decoded.name,
                            pic: decoded.picture,
                            token: token,
                          },
                        });
                      }}
                      onError={() => {
                        console.log("Login Failed");
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
export default Admin;