import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signUpInfo, setSignUpInfo] = useState({
    fullname: null,
    email: null,
    password: null,
  });

  const [errorMessage, setErrorMessage] = useState(false);

  const onChangeHandler = (e) => {
    setSignUpInfo({ ...signUpInfo, [e?.target?.name]: e?.target?.value });
  };

  const signupHandler = (e) => {
    if (signUpInfo?.email && signUpInfo?.password && signUpInfo?.fullname) {
      axios.get("http://localhost:3001/user").then((response) => {
        const getResult = response?.data?.filter(
          (d) => d?.email === signUpInfo?.email
        );
        if (getResult?.length === 0) {
          axios
            .post("http://localhost:3001/user", {
              email: signUpInfo?.email,
              password: signUpInfo?.password,
              fullname: signUpInfo?.fullname,
            })
            .then((res) => {
              toast("Registration successfully");
              setTimeout(() => {
                navigate("/");
              }, 1000);
            })
            .catch((error) => console.log(error));
        } else {
          toast("Email already been taken");
        }
      });
    } else {
      setErrorMessage(true);
    }

    e.preventDefault();
  };
  return (
    <>
      <div
        className="  d-flex align-items-center justify-content-center "
        style={{ marginTop: "10%" }}
      >
        <ToastContainer />
        <div className="Auth-form-container" style={{ width: "34%" }}>
          <form
            className="Auth-form"
            onSubmit={(e) => {
              signupHandler(e);
            }}
          >
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign Up</h3>
              <div className="form-group mt-3">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  className="form-control mt-1"
                  placeholder="Full Name"
                  onChange={(e) => onChangeHandler(e)}
                />
                {!signUpInfo?.fullname && !!errorMessage && (
                  <p
                    style={{ color: "red", fontSize: "12px", marginTop: "4px" }}
                  >
                    Full Name Required
                  </p>
                )}
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  name="email"
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={(e) => onChangeHandler(e)}
                />
                {!signUpInfo?.email && !!errorMessage && (
                  <p
                    style={{ color: "red", fontSize: "12px", marginTop: "4px" }}
                  >
                    {" "}
                    Email Required
                  </p>
                )}
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={(e) => onChangeHandler(e)}
                />
                {!signUpInfo?.password && !!errorMessage && (
                  <p
                    style={{ color: "red", fontSize: "12px", marginTop: "4px" }}
                  >
                    {" "}
                    Password Required
                  </p>
                )}
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right mt-2">
                Already have an account? <a href="/">Log In</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
