import React from "react";

function LoginCard() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input placeholder="Email" type={"email"} />
        <input placeholder="Password" type={"password"} />
      </form>
    </div>
  );
}

export default LoginCard;
