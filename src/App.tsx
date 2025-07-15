import { useState } from "react";
import "./App.css";
import SpiderTrail from "./SpiderTrail";

async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

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
  const [showPin, setShowPin] = useState(false);

  const formatPin = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "").slice(0, 16);
    const parts = digitsOnly.match(/.{1,4}/g);
    return parts ? parts.join("-") : "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Only digits and max length 10
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setForm({
        ...form,
        [name]: digitsOnly,
      });
    } else {
      setForm({
        ...form,
        [name]: name === "spidrPin" ? formatPin(value) : value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hashedPin = await hashString(form.spidrPin.replace(/-/g, ""));
    console.log("Hashed PIN:", hashedPin);
    // Use hashedPin for backend or whatever you want instead of raw PIN

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
          <h1
            style={{
              color: "#ff3c7e",
              fontSize: "1.8rem",
              marginBottom: "1.5rem",
            }}
          >
            Air Fryer Interest Form
          </h1>

          {[
            { label: "First Name", name: "firstName", type: "text" },
            { label: "Last Name", name: "lastName", type: "text" },
            { label: "Phone Number", name: "phone", type: "tel" },
            { label: "Email Address", name: "email", type: "email" },
            {
              label: "Guess the Air Fryer’s Cost ($)",
              name: "costGuess",
              type: "number",
            },
          ].map(({ label, name, type }) => (
            <div key={name} style={{ marginBottom: "1rem" }}>
              <label
                style={{ display: "block", fontSize: "0.9rem", marginBottom: 6 }}
              >
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                required
                maxLength={name === "phone" ? 10 : undefined}
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

<div style={{ position: "relative", marginBottom: "1rem" }}>
  <label
    style={{ display: "block", fontSize: "0.9rem", marginBottom: 6 }}
  >
    A Very, Very Secret 16-digit Spidr PIN
  </label>
  <input
    type={showPin ? "text" : "password"}
    name="spidrPin"
    value={form.spidrPin}
    onChange={handleChange}
    placeholder="####-####-####-####"
    pattern="\d{4}-\d{4}-\d{4}-\d{4}"
    required
    style={{
      width: "100%",
      padding: "0.75rem 3rem 0.75rem 0.75rem",
      borderRadius: 12,
      backgroundColor: "#222",
      color: "#fff",
      border: "none",
      boxSizing: "border-box",
    }}
  />
  <button
    type="button"
    onClick={() => setShowPin(!showPin)}
    style={{
      position: "absolute",
      right: "0.75rem",
      top: "calc(50% + 6px)",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      color: "#ff3c7e",
      cursor: "pointer",
      padding: "0.25rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "1.5em",
      width: "1.5em",
      userSelect: "none",
    }}
    aria-label={showPin ? "Hide PIN" : "Show PIN"}
  >
    {showPin ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        width="20"
        height="20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.875 18.825A10.05 10.05 0 0112 19.5c-5.523 0-10-4.477-10-10 0-1.201.229-2.352.646-3.422M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c1.349 0 2.632.324 3.75.9M17.657 16.657A9.955 9.955 0 0121.542 12c-.353-2.2-1.374-4.232-3.06-5.825"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        width="20"
        height="20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3l18 18M9.88 9.88a3 3 0 104.24 4.24M14.121 14.12L21 21M9.88 9.88L3 3m18 18l-3.086-3.086M12 19.5c-5.523 0-10-4.477-10-10 0-1.201.229-2.352.646-3.422"
        />
      </svg>
    )}
  </button>
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
          <h2
            style={{ fontSize: "1.5rem", color: "#ff3c7e", marginBottom: "1rem" }}
          >
            Thanks, {form.firstName}!
          </h2>
          <p>Here’s what you submitted:</p>
          <ul style={{ marginTop: "1rem", lineHeight: "1.8rem" }}>
            <li>
              <strong>Full Name:</strong> {form.firstName} {form.lastName}
            </li>
            <li>
              <strong>Phone:</strong> {form.phone}
            </li>
            <li>
              <strong>Email:</strong> {form.email}
            </li>
            <li>
              <strong>Cost Guess:</strong> ${form.costGuess}
            </li>
            <li>
              <strong>Spidr PIN:</strong> {form.spidrPin}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
