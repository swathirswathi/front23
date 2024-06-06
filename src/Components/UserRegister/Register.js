import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNav from "../../Components/MainNav/mainNav";
import "./UserRegister.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async () => {
    // Clear previous errors
    setErrors({});

    // If all validation passes, proceed with form submission
    try {
      await axios.post("http://localhost:5260/Register_User", {
        username: username,
        password: password,
        role: "user",
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phone,
      });
      toast.success("Successfully registered");
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/userlogin");
    } catch (err) {
      setErrors({ username: "Username already exists" });
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return re.test(password);
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

  return (
    <>
      <MainNav />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Register</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                      placeholder="Enter your First Name"
                      value={firstname}
                      onChange={handleInputChange(setFirstname, null, "firstname")}
                      required
                    />
                    {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                      placeholder="Enter your Last Name"
                      value={lastname}
                      onChange={handleInputChange(setLastname, null, "lastname")}
                      required
                    />
                    {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="Enter your Email"
                      value={email}
                      onChange={handleInputChange(setEmail, validateEmail, "email")}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      placeholder="Enter your Phone"
                      value={phone}
                      onChange={handleInputChange(setPhone, validatePhone, "phone")}
                      required
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.username ? "is-invalid" : ""}`}
                      placeholder="Enter your Username"
                      value={username}
                      onChange={handleInputChange(setUsername, null, "username")}
                      required
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
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

                  <div className="d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleFormSubmit}
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
