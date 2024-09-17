import React, { useState } from "react";

function SupportForm() {
  const [formData, setFormData] = useState({
    email: "",
    dropdown: "issue",
    details: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form
      action=""
      class="flex flex-col justify-center w-3/4 gap-7 bg-gray-200 p-10"
      onSubmit={handleSubmit}
    >
      <label class="text-xl" htmlFor="email">
        {" "}
        Email{" "}
      </label>
      <input
        class="inputs"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label class="text-xl" htmlFor="dropdown">
        Option
      </label>
      <select
        class="inputs"
        name="dropdown"
        id="dropdown"
        onChange={handleChange}
        value={formData.dropdown}
      >
        <option value="issue">Issue</option>
        <option value="bug-report">Bug Report</option>
        <option value="question">Question</option>
      </select>

      <label class="text-xl" htmlFor="details">
        Details:
      </label>
      <textarea
        cols="10"
        rows="10"
        name="details"
        id="details"
        value={formData.details}
        onChange={handleChange}
      ></textarea>

      <button class="w-1/2 h-8 bg-sky-200 mx-auto">Submit</button>
    </form>
  );
}

export default SupportForm;
