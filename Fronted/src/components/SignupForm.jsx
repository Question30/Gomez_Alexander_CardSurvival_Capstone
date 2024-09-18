import React from "react";
import { useState } from "react";
import { signUp } from "../utilities/users-service";

function SignupForm({ setShowLogin, showLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
    error: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      error: "",
    });
  };

  const disable = formData.password !== formData.confirm_password;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = { ...formData };

      delete user.confirm_password;

      const username = await signUp(user);
    } catch (error) {
      setFormData({
        ...formData,
        error: "Sign up failed - User already exists",
      });
    }
  };
  return (
    <main className="mt-20 mx-auto flex flex-col items-center bg-gray-300 max-w-80">
      <form
        className="flex flex-col min-h-96 justify-center gap-4 p-3 w-3/4"
        id="form"
        name="signup"
        onSubmit={handleSubmit}
      >
        <label className="text-xl" htmlFor="username">
          {" "}
          Username:{" "}
        </label>
        <input
          className="h-7"
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label className="text-xl" htmlFor="email">
          {" "}
          Email:{" "}
        </label>
        <input
          className="h-7"
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="text-xl" htmlFor="password">
          Password :
        </label>
        <input
          className="h-7"
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete=""
          required
        />

        <label className="text-xl" htmlFor="confirm_password">
          Confirm Password:
        </label>
        <input
          className="h-7"
          type="password"
          name="confirm_password"
          id="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />

        <button
          className="w-1/2 h-8 bg-sky-400 mx-auto disabled:opacity-25"
          id="Signup"
          disabled={disable}
          type="submit"
        >
          Signup
        </button>
      </form>
      <p className="p-2">
        Already have an account? Login
        <button
          className="text-blue-600 underline pl-1"
          onClick={() => setShowLogin(!showLogin)}
        >
          here
        </button>
      </p>
      <p className="text-red-800">{formData.error}</p>
    </main>
  );
}

export default SignupForm;
