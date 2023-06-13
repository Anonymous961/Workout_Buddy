import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up </h3>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        placeholder="abc@gmail.com"
        required
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        placeholder="password"
        required
      />
      <button type="submit" disabled={isLoading}>
        Sign Up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUp;
