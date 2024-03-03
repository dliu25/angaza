import React, { useState } from "react";
import { Routes, Route, useParams, Link, Navigate } from "react-router-dom";
import "./mvp.css";
import axios from "axios";

function Tutorial() {
  return (
    <p>
      If the device is operating on Windows, go to Settings &gt; System &gt;
      About. If the device is operating on MacOS, go to the Apple menu &gt;
      About This Mac. If the device is operating on ChromeOS, press ALT + V on
      the Sign-In screen. If the device is operating on LinuxOS, execute the
      dmidecode command in the terminal.
    </p>
  );
}

function Navbar() {
  return (
    <nav className="nav">
      <h1 className="site-title">Angaza Technology Literacy Center</h1>
      <ul>
        <li>
          <Link to="/">Inventory Viewer</Link>
        </li>
        <li>
          <Link to="/inven-input">Inventory Input</Link>
        </li>
      </ul>
    </nav>
  );
}

function Home() {
  return (
    <>
      <Navbar />
      <h2>Welcome to the Angaza Technology Literacy Center</h2>
      <p>
        This is a platform for managing inventory and facilitating technology
        literacy initiatives in Africa.
      </p>
    </>
  );
}

function Form() {
  const [serial, setSerial] = useState("");
  const [defects, setDefects] = useState("");
  const [origin, setOrigin] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/submit-form", {
        serial: serial,
        defects: defects,
        origin: origin,
        os: "Windows 10", // This is just a placeholder, you can adjust as needed
        device_name: "Placeholder Device" // This is just a placeholder, you can adjust as needed
      });
      // Redirect or show success message after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <h2>Inventory Input Form</h2>
        <label>
          Serial code:
          <input
            type="text"
            name="serial"
            onChange={(e) => setSerial(e.target.value)}
          />
          <details>
            <summary>How to find serial code?</summary>
            <Tutorial />
          </details>
        </label>
        <label>
          Defects:
          <textarea
            value={defects}
            onChange={(e) => setDefects(e.target.value)}
          />
        </label>
        <label>
          Place of Origin:
          <textarea
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

function ItemDetails() {
  const { id } = useParams();
  return (
    <div>
      <h2>Item Details</h2>
      <p>Serial Code: {id}</p>
      <p>Operating System: </p>
      <p>Device Metadata: </p>
      <p>Defects: </p>
      <p>Place of Origin: </p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/inven-input" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
