import React from "react";

const LoginForm = (props) => {
  const { email, password, setEmail, setPassword, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="form-group mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Your password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button disabled={!email || !password} className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
