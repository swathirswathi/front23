import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNav from "../../Components/MainNav/mainNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css"; // Assuming this is the same styling used in UserRegister
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminRegister() {
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
    clearErrors();

    // Basic validation checks
    const newErrors = {};
    if (!firstname.trim()) {
      newErrors.firstname = "Please enter your First Name";
    }

    if (!lastname.trim()) {
      newErrors.lastname = "Please enter your Last Name";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your Email";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Please enter your Phone";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!username.trim()) {
      newErrors.username = "Please enter your Username";
    }

    if (!validatePassword(password)) {
      newErrors.password =
        "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one number, and one special character.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If all validation passes, proceed with form submission
    try {
      await axios.post("http://localhost:5260/Register_Admin", {
        username: username,
        password: password,
        role: "admin",
        firstname: firstname,
        lastname: lastname,
        email: email,
        phoneNumber: phone,
      });

      toast.success("Successfully registered");
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/admin");
    } catch (err) {
      toast.error("Invalid username or password/Admin already Exist");
    }
  };

  const validateEmail = (email) => {
    // Basic email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    // Basic phone number validation
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return re.test(password);
  };


  const clearErrors = () => {
    // Clear any previous validation errors
    setErrors({});
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
                <h2 className="card-title text-center mb-4"> Admin Register</h2>
                <form>
                  {/* First Name */}
                  <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstname ? "is-invalid" : ""}`}
                      placeholder="Enter your First Name"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      required
                    />
                    {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                  </div>

                  {/* Last Name */}
                  <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastname ? "is-invalid" : ""}`}
                      placeholder="Enter your Last Name"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      required
                    />
                    {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                  </div>

                  {/* Email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  {/* Phone */}
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      placeholder="Enter your Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  {/* Username */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.username ? "is-invalid" : ""}`}
                      placeholder="Enter your Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      required
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>

                  {/* Show Password Toggle */}
                  <div className="toggle">
                    <input
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onChange={togglePasswordVisibility}
                    />
                    <label htmlFor="showPassword" className="form-check-label ml-2">
                      Show Password
                    </label>
                  </div>

                  {/* Submit Button */}
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

export default AdminRegister;
