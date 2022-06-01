import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InputError } from "../../components";
import { useAuth } from "../../context/auth-context";
import { useTheme } from "../../context/theme-context";
import { usePageTitle } from "../../utils";
import { useValidation } from "../../utils/useValidation";

export const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const { theme } = useTheme();

  usePageTitle("Login | Stint Pomodoro");

  const {
    inputState,
    inputDispatch,
    errorState,
    errorDispatch,
    validateLogin,
  } = useValidation();

  const { email, password } = inputState;
  const { emailError, passwordError } = errorState;

  const { signInUser } = useAuth();

  const loginTestUser = (e) => {
    e.preventDefault();
    signInUser("hamza@stintpomodoro.com", "StintRocks123");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      errorDispatch({ type: "CLEAR_ERRORS" });
      inputDispatch({ type: "CLEAR_INPUTS" });
      signInUser(email, password);
    }
  };

  return (
    <section
      className={`section__signup ${
        theme ? "background__dark text__dark" : "background__light"
      } py-md`}
    >
      <div className="window__signup">
        <div className="flex-center">
          <span className="txt-lg txt-bold">Login </span>
        </div>
        <form className="form" noValidate>
          <div className="input-section">
            <label
              htmlFor="email-input"
              className="form-input input-required txt-reg"
            >
              Email
            </label>
            <input
              type="text"
              className="input-corner input-md border-2"
              name="email-input"
              id="email-input"
              value={email}
              onChange={(e) =>
                inputDispatch({
                  type: "EMAIL",
                  payload: e.target.value,
                })
              }
              placeholder="johnrao.doekar@email.com"
              required
            />
            <InputError errorMessage={emailError} />
          </div>

          <div className="input-section">
            <label
              htmlFor="password-input"
              className="form-input input-required txt-reg"
            >
              Password
            </label>
            <div className="input-toggle pos-rel">
              <i
                onClick={() => setShowPass((s) => !s)}
                className={`fas ${
                  showPass ? "fa-eye-slash" : "fa-eye"
                } toggle-vis pos-ab pointer`}
              ></i>
              <input
                type={showPass ? "text" : "password"}
                className="input-corner input-md border-2 pr-4"
                name="password-input"
                id="password-input"
                value={password}
                onChange={(e) =>
                  inputDispatch({
                    type: "PASSWORD",
                    payload: e.target.value,
                  })
                }
                placeholder={showPass ? "john123456" : "**********"}
              />
              <InputError errorMessage={passwordError} />
            </div>
          </div>
          <div className="div__login flex-center">
            <button onClick={handleSubmit} className="btn btn-def btn-md w-100">
              LogIn
            </button>
          </div>
        </form>
        <div className="div__loginAlt flex-center txt-underline pointer py-md">
          <Link to="/signup">
            <span className="">
              New to Stint? <span className="txt-bold">Sign Up!</span>
            </span>
          </Link>
        </div>
        <div className="flex-center">
          <button
            className={`btn btn-def btn-md btn-outline w-100 ${
              theme ? "white" : "black"
            }`}
            onClick={loginTestUser}
          >
            Login with test credentials
          </button>
        </div>
      </div>
    </section>
  );
};
