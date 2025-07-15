import { useState } from "react";
import "./App.css";
import SpiderTrail from "./SpiderTrail";

function App() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    costGuess: "",
    spidrPin: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const formatPin = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
    const parts = digitsOnly.match(/.{1,4}/g);
    return parts ? parts.join("-") : "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "spidrPin" ? formatPin(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        padding: "2rem",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SpiderTrail />

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: 500,
            margin: "auto",
            background: "#111",
            borderRadius: 20,
            padding: "2rem",
            boxShadow: "0 0 20px #ff3c7e80",
          }}
        >
          <h1 style={{ color: "#ff3c7e", fontSize: "1.8rem", marginBottom: "1.5rem" }}>
             Air Fryer Interest Form
          </h1>

          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Phone Number", name: "phone", type: "tel" },
            { label: "Email Address", name: "email", type: "email" },
            { label: "Guess the Air Fryer’s Cost ($)", name: "costGuess", type: "number" },
          ].map(({ label, name, type }) => (
            <div key={name} style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.9rem", marginBottom: 6 }}>{label}</label>
              <input
                type={type}
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: 12,
                  backgroundColor: "#222",
                  color: "#fff",
                  border: "none",
                }}
              />
            </div>
          ))}

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ display: "block", fontSize: "0.9rem", marginBottom: 6 }}>
              A Very, Very Secret 16-digit Spidr PIN
            </label>
            <input
              type="text"
              name="spidrPin"
              value={form.spidrPin}
              onChange={handleChange}
              placeholder="####-####-####-####"
              pattern="\d{4}-\d{4}-\d{4}-\d{4}"
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: 12,
                backgroundColor: "#222",
                color: "#fff",
                border: "none",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#ff3c7e",
              color: "#fff",
              padding: "1rem",
              width: "100%",
              border: "none",
              borderRadius: 12,
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              marginTop: "1rem",
            }}
          >
            Submit
          </button>
        </form>
      ) : (
        <div
          style={{
            maxWidth: 500,
            margin: "auto",
            background: "#111",
            borderRadius: 20,
            padding: "2rem",
            boxShadow: "0 0 20px #ff3c7e80",
            textAlign: "left",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", color: "#ff3c7e", marginBottom: "1rem" }}>
             Thanks, {form.firstName}!
          </h2>
          <p>Here’s what you submitted:</p>
          <ul style={{ marginTop: "1rem", lineHeight: "1.8rem" }}>
            <li><strong>Full Name:</strong> {form.firstName} {form.lastName}</li>
            <li><strong>Phone:</strong> {form.phone}</li>
            <li><strong>Email:</strong> {form.email}</li>
            <li><strong>Cost Guess:</strong> ${form.costGuess}</li>
            <li><strong>Spidr PIN:</strong> {form.spidrPin}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
