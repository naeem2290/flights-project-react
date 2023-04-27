import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: null,
    password: null,
  });

  const [errorMessage, setErrorMessage] = useState(false);

  const onChangeHandler = (e) => {
    setLoginInfo({ ...loginInfo, [e?.target?.name]: e?.target?.value });
  };

  const loginHandler = (e) => {
    if (loginInfo?.email && loginInfo?.password) {
      axios
        .get(
          `http://localhost:3001/user?email=${loginInfo?.email}&password=${loginInfo?.password}`
        )

        .then((response) => {
          if (response?.data?.length > 0) {
            toast("Login successfully");
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
          } else {
            toast("No user found");
          }
        })

        .catch((error) => console.log(error));
    } else {
      setErrorMessage(true);
    }
    e.preventDefault();
  };

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center "
        style={{ marginTop: "10%" }}
      >
        <ToastContainer />
        <div className="Auth-form-container" style={{ width: "34%" }}>
          <form
            className="Auth-form"
            onSubmit={(e) => {
              loginHandler(e);
            }}
          >
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={(e) => onChangeHandler(e)}
                />
                {!loginInfo?.email && !!errorMessage && (
                  <p
                    style={{ color: "red", fontSize: "12px", marginTop: "4px" }}
                  >
                    Email Required
                  </p>
                )}
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={(e) => onChangeHandler(e)}
                />
                {!loginInfo?.password && !!errorMessage && (
                  <div
                    style={{ color: "red", fontSize: "12px", marginTop: "4px" }}
                  >
                    Password Required
                  </div>
                )}
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>

              <div className="d-flex align-items-center justify-content-between ">
                <div>
                  <p className="forgot-password text-right mt-2">
                    Forgot <a href="/signup">password?</a>
                  </p>
                </div>
                <div>
                  <p>
                    Don't have account? <a href="/signup">Sign Up</a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
