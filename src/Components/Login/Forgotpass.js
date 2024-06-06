import React, { useState } from "react";
import MainNav from "../../Components/MainNav/mainNav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import back from "../../Images/Back.jpg"

function Forgot() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async () => {
    // Clear previous errors
    setErrors({});
    setLoading(true);

    // Validate input
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Please enter your username";
    }
    if (!validatePassword(password)) {
      newErrors.password = "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5260/Reset_Password", {
        username: username,
        newPassword: password,
      });
      toast.success("Password reset successfully");
      setLoading(false);
      navigate("/userlogin");
    } catch (err) {
      setErrors({ username: "Failed to reset password" });
      setLoading(false);
    }
  };

  const handleInputChange = (setter, validator, fieldName) => (e) => {
    const value = e.target.value;
    setter(value);

    const newErrors = { ...errors };
    if (!value.trim()) {
      newErrors[fieldName] = `Please enter your ${fieldName}`;
    } else if (validator && !validator(value)) {
      newErrors[fieldName] = `Invalid ${fieldName}`;
    } else {
      delete newErrors[fieldName];
    }
    setErrors(newErrors);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return re.test(password);
  };

  return (
    <>
      <MainNav />
      <ToastContainer />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card">
              <div className="card-body">
                <button 
                  type="button" 
                  className="btn btn-secondary mb-3" style={{padding:'2px',backgroundColor:'white'}}
                  onClick={() => navigate(-1)}
                >
                  <img style={{height:'20px'}} src={back} alt="Back" />
                </button>

                <h2 className="card-title text-center mb-4">Reset Password</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.username ? "is-invalid" : ""}`}
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      New Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Enter your Password"
                      value={password}
                      onChange={handleInputChange(setPassword, validatePassword, "password")}
                      autoComplete="off"
                      required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="showPassword"
                      checked={showPassword}
                      onChange={togglePasswordVisibility}
                    />
                    <label className="form-check-label" htmlFor="showPassword">
                      Show Password
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleFormSubmit}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgot;
