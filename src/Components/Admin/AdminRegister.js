import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainNav from "../../Components/MainNav/mainNav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function AdminRegister() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function AddUser() {
    console.log(username);
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
      alert("Invalid username or password/Admin already Exist")
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
                <h2 className="card-title text-center mb-4"> Admin Register</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Name"
                      value={firstname}
                      onChange={(e) => setfirstname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Name"
                      value={lastname}
                      onChange={(e) => setlastname(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your Phone"
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      required
                    />
                  </div>
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
                  
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={AddUser}
                    disabled={loading}
                  >
                    {loading ? "Submit..." : "Submit"}
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
