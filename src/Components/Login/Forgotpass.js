import React, { useState } from "react";
import MainNav from "../../Components/MainNav/mainNav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Forgot() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  async function handle(e) {
    e.preventDefault();

    try {
      const result = await axios.get(
        "https://localhost:7233/api/User/SingleUser/" + username
      );
      if (result.data.username === username) {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast.success("Otp sent to Email");
      } else {
        toast.error("Username not found");
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <MainNav />
      <ToastContainer/>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4"> Reset Password</h2>
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
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handle}
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

export default Forgot;
