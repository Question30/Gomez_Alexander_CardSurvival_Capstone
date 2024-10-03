import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function SupportForm() {
  const [formData, setFormData] = useState({
    email: "",
    dropdown: "issue",
    details: "",
  });

  const [sentSuccessful, setSentSuccessful] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    emailjs.send(
      "service_nb2vhi3",
      "template_7704kif",
      {
        from_name: formData.email,
        to_name: "Card Survival Team",
        message: formData.dropdown + "\n" + formData.details,
      },
      "NnEasYqJS9OsPRnvm"
    );
    setSentSuccessful(true);
  };

  return (
    <form
      action=""
      className="flex flex-col justify-center w-3/4 gap-7 bg-gray-200 p-10"
      onSubmit={handleSubmit}
    >
      <label className="text-xl" htmlFor="email">
        {" "}
        Email{" "}
      </label>
      <input
        className="inputs"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label className="text-xl" htmlFor="dropdown">
        Option
      </label>
      <select
        className="inputs"
        name="dropdown"
        id="dropdown"
        onChange={handleChange}
        value={formData.dropdown}
      >
        <option value="issue">Issue</option>
        <option value="bug-report">Bug Report</option>
        <option value="question">Question</option>
      </select>

      <label className="text-xl" htmlFor="details">
        Details:
      </label>
      <textarea
        cols="5"
        rows="5"
        name="details"
        id="details"
        value={formData.details}
        onChange={handleChange}
      ></textarea>

      <button className="w-1/2 h-8 bg-sky-200 mx-auto">Submit</button>
      {sentSuccessful ? (
        <h2 className="text-center">Message Sent Successfully</h2>
      ) : null}
    </form>
  );
}

export default SupportForm;
