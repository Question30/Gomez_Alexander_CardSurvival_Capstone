import React, { useState } from "react";

function LoginForm({ setShowLogin, showLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <main className="flex flex-col mx-auto mt-20 items-center bg-gray-300 max-w-80">
      <form
        id="form"
        className="flex flex-col min-h-96 justify-center gap-7 m-3/4 "
        name="login"
        onSubmit={handleSubmit}
      >
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
          Password:
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

        <button className="w-1/2 h-8 bg-sky-200 mx-auto">Login</button>
      </form>
      <p className="p-2">
        Don't have an account? Signup
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

export default LoginForm;
