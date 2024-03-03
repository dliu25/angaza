import { Routes, Route, useParams, Link, useNavigate  } from "react-router-dom";
import { useFormik } from "formik";
import QRCode from "react-qr-code";
var domain = "https://localhost:3000/";
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
  let navigate = useNavigate();
  const changePage = () =>{
    var path =  "/../item/"  // + number of rows in database*/;
    navigate(path);
  }
  const formik = useFormik({
    initialValues: {
      serial: "",
      brand: "",
      defects: "",
      origin: "",
    },
    onSubmit:(values) => {
      //upload data somehow

      changePage();
      //console.log(values);
    }
  });
  var brand = "";
  function checkBrand(id) {
    let AppleRegex = /^A+[0-9]{4}$/;
    let MicrosoftRegex = /^([A-Za-z0-9]{5}-){4}[A-Za-z0-9]{5}$/;
    let AsusRegex = /^[A-Za-z0-9]{12}$/;
    let LenovoRegex = /^[A-Za-z0-9]{7}$/;
    if (AppleRegex.test(id))
      brand = "Apple";
    else if (MicrosoftRegex.test(id)) 
      brand =  "Microsoft";
    else if (LenovoRegex.test(id))
      brand = "Lenovo";
    else if (AsusRegex.test(id))
      brand = "Asus";
    else
      brand = "Unknown";
  }
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
            onInput={checkBrand(formik.values.serial)}
        />
        <details>
          <summary>How to find serial code?</summary>
          <Tutorial />
        </details>
        <label>Brand: {brand}</label>
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
      <p>Share</p>
      <QRCode value={domain + "item/" + id} />
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
