import { Routes, Route, useParams, Link,  } from "react-router-dom";
import { useFormik } from "formik";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

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
function Form(){
  const formik = useFormik({
    initialValues: {
      serial: "",
      defects: "",
      origin: "",
    },
    onSubmit:(values) => {
      //submit somehow
      ReactDOM.render(<QRCode value="hey" />, document.getElementById("Container"));
      console.log(values);
    }
  });
  return (
    <div>
      <Navbar />
      <form onSubmit={formik.handleSubmit}>
        <h1>Inventory Input Form</h1>
        <label htmlFor = "serial">
          Serial code:
        </label>
        <input
            type="text"
            name="serial"
            value = {formik.values.serial}
            onChange={formik.handleChange}
        />
        <details>
          <summary>How to find serial code?</summary>
          <Tutorial />
        </details>
        <label htmlFor = "defects">
          Defects:
        </label>
        <input
            type="text"
            name="defects"
            value = {formik.values.defects}
            onChange={formik.handleChange}
        />
        <label htmlFor = "origin">
          Origin:
        </label>
        <input
            type="text"
            name="origin"
            value = {formik.values.origin}
            onChange={formik.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
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
        This is a platform for tracking inventory and details of devices sent to partners in Africa.
      </p>
    </>
  );
}

function ItemDetails() {
  //get data from row of id and add to html
  const { id } = useParams();
  return (
    <div>
      <h2>Item Details</h2>
      <p>Serial Code: </p>
      <p>Operating System: </p>
      <p>Device Metadata: </p>
      <p>Defects: </p>
      <p>Place of Origin: </p>
      <p>Download CSV</p>
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
