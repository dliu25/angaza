import { Routes, Route, useParams, Link, useNavigate  } from "react-router-dom";
import { useFormik } from "formik";
import QRCode from "react-qr-code";
import DataTable from "react-data-table-component";
var domain = "https://localhost:3000/";
function Tutorial() {
  return (
    <p>
      If the device is operating on Windows, open cmd and type in <b>wmic bios get serialnumber</b>. If the device is operating on MacOS, go to the Apple menu &gt;
      About This Mac. If the device is operating on ChromeOS, press ALT + V on
      the Sign-In screen.
    </p>
  );
}
function Table(){
  const columns = [
    {
      name :"Serial Code",
      selector: row => row.serial // placeholders, database man replace
    },
    {
      name:"Brand",
      selector: row => row.brand, // placeholders, database man replace
      sortable: true
    },
    {
      name :"Defects",
      selector: row => row.defects // placeholders, database man replace
    },
    {
      name : "Place of Origin",
      selector: row => row.origin // placeholders, database man replace
    },
    {
      name : "QR",
      selector: row => row.qr // placeholders, database man replace
    },
  ];
  const data = [
    //import database somehow temp data
    {
      serial: "I23832",
      brand: "Nintendo",
      defects: "Everything is broken",
      origin: "Europe",
      qr: (<Link to="/../item/1">A</Link>)
    },
    {
      serial: "DA-329342",
      brand: "HP",
      defects: "Everything is broken",
      origin: "Lithunia",
      qr: (<Link to="/../item/2">A</Link>)
    },
    {
      serial: "PDSA-SADD-SDAS",
      brand: "Panasonic",
      defects: "Literal E-waste",
      origin: "Spain",
      qr: (<Link to="/../item/3">A</Link>)
    }
  ]
  
  return (
    <div>
      <Navbar />
      <DataTable columns={columns} data = {data} fixedHeader pagination>

      </DataTable>
    </div>
  )
}
function Form(){
  let navigate = useNavigate();
  const changePage = () =>{
    var path =  "/../item/"  + 4// change 4 to number of rows in database aka index of new row*/;
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
    let DellRegex = /^[A-Za-z0-9]{7}$/;
    if (AppleRegex.test(id))
      brand = "Apple";
    else if (MicrosoftRegex.test(id)) 
      brand =  "Microsoft";
    else if (DellRegex.test(id))
      brand = "Dell";
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
          Identification code:
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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/inven-view">Inventory Viewer</Link>
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
      <p>Brand: </p>
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
        <Route path="/inven-view" element={<Table />} />
      </Routes>
    </div>
  );
}
export default App;
