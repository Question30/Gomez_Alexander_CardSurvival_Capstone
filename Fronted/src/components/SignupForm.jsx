import React from "react";
import { useState } from "react";

function SignupForm({ setShowLogin, showLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  return (
    <main class="mt-20 mx-auto flex flex-col items-center bg-gray-300 max-w-80">
      <form
        class="flex flex-col min-h-96 justify-center gap-4 p-3 w-3/4"
        id="form"
        name="signup"
        onSubmit={handleSubmit}
      >
        <label class="text-xl" htmlFor="username">
          {" "}
          Username:{" "}
        </label>
        <input
          class="h-7"
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label class="text-xl" htmlFor="email">
          {" "}
          Email:{" "}
        </label>
        <input
          class="h-7"
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label class="text-xl" htmlFor="password">
          Password :
        </label>
        <input
          class="h-7"
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete=""
          required
        />

        <label class="text-xl" htmlFor="confirm_password">
          Confirm Password:
        </label>
        <input
          class="h-7"
          type="password"
          name="confirm_password"
          id="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />

        <button class="w-1/2 h-8 bg-sky-200 mx-auto" id="Signup">
          Signup
        </button>
      </form>
      <p class="p-2">
        Already have an account? Login
        <button
          className="text-blue-600 underline pl-1"
          onClick={() => setShowLogin(!showLogin)}
        >
          here
        </button>
      </p>
    </main>
  );
}

export default SignupForm;
