import { Routes, Route, useParams, Link, useNavigate  } from "react-router-dom";
import { useFormik } from "formik";
import QRCode from "react-qr-code";
import DataTable from "react-data-table-component";
import './App.css';

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
      name :"Service Label",
      selector: row => row.sv // placeholders, database man replace
    },
    {
      name :"Brand",
      selector: row => row.br // placeholders, database man replace
    },
    {
      name :"Start",
      selector: row => row.srae // placeholders, database man replace
    },
    {
      name :"End",
      selector: row => row.en // placeholders, database man replace
    },
    {
      name :"Conditon",
      selector: row => row.con // placeholders, database man replace
    },
    {
      name :"Vendor",
      selector: row => row.ven // placeholders, database man replace
    },
    {
      name : "QR",
      selector: row => row.qr // placeholders, database man replace
    },
  ];
  const data = [
    //import database somehow temp data
    {
      sv: "I23832",
      br: "Nintendo",
      start: "",
      en: "",
      con: "Everything is broken",
      ven: "Me",
      qr: (<Link to="/../item/1">A</Link>)
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
      sv: "",
      br: "",
      star: "",
      en: "",
      con: "",
      ven: "",
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
        <div class = "details">
        <details>
            <summary>How to find serial code?</summary>
            <Tutorial /> 
        </details>
        </div>
        <label className = "sv" htmlFor = "sv">
          Service Label:
          <input
            type="text"
            name="sv"
            value = {formik.values.sv}
            onChange={formik.handleChange}
            onInput={checkBrand(formik.values.sv)}
        />
        </label>
        <label className = "brand"
        value = {formik.values.br} 
        onChange={formik.handleChange}>
          Brand: {brand}
          </label>
        <label className = "star" htmlFor = "star">
          Start:
          <input
            type="text"
            name="star"
            value = {formik.values.star}
            onChange={formik.handleChange}
        />
        </label>
        <label className = "en" htmlFor = "en">
          End:
          <input
            type="text"
            name="en"
            value = {formik.values.en}
            onChange={formik.handleChange}
        />
        </label>
        <label className = "con" htmlFor = "con">
          Condition:
          <input
            type="text"
            name="con"
            value = {formik.values.con}
            onChange={formik.handleChange}
        />
        </label>
        <label className = "ven" htmlFor = "ven">
          Vendor:
          <input
            type="text"
            name="nen"
            value = {formik.values.nen}
            onChange={formik.handleChange}
        />
        </label>
        <div className = "submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
function Navbar() {
  let navigate = useNavigate();
  const changePageA = () =>{
    navigate("/inven-input");
  }
  const changePageB = () =>{
    navigate("/inven-view");
  }
  const changePageC = () =>{
    navigate("/..");
  }
  return (
    <nav className="nav-bare">
        <img
            className = "logo"
            src="https://cdn.glitch.global/89e6cfdf-775c-47cf-a856-87ee59789939/ballsss.png?v=1709439463539"
            style={{width: 175, height: 175}}
            alt="Logo"
            onClick={changePageC}
        />
      <button className = "inview" onClick={changePageB}>View Inventory</button>
      <button className = "input" onClick={changePageA}>Add device</button>
    </nav>
  );
}

function Home() {
  let navigate = useNavigate();
  const changePageA = () =>{
    navigate("/inven-input");
  }
  const changePageB = () =>{
    navigate("/inven-view");
  }
  return (
      <body>
        <div className = "nav-bar">
        <img src="https://cdn.glitch.global/69973fd0-2612-442a-86f4-4900da5d229f/IMG_0522.jpeg?v=1709446089891"  alt="W" width="500" height="150"/>
        </div>
        <div class="buttons">
          <button onClick={changePageA}>Add device</button>
          <button onClick={changePageB}>View Inventory</button>
        </div>
      </body>
  );
}

function ItemDetails() {
  //https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
  function arrayToCsv(data){
    return data.map(row =>
      row
      .map(String)
      .map(v => v.replaceAll('"', '""'))
      .map(v => `"${v}"`)
      .join(',')
    ).join('\r\n');
  }
  //placeholder values
  let csv = arrayToCsv([
    [1, '2', '"3"'],
  ]);
  
  /** Download contents as a file
 * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
 */
  function downloadBlob(content, filename, contentType) {
    // Create a blob
    var blob = new Blob([content], { type: contentType });
    var url = URL.createObjectURL(blob);
  
    // Create a link to download it
    var pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
  }
  const { id } = useParams();
  return (
    <div>
      <h2>Item Details:{}</h2>
      <p>Service Label:{}</p>
      <p>Brand:{}</p>
      <p>Start:{}</p>
      <p>End:{}</p>
      <p>Condition:{}</p>
      <p>Vendor:{}</p>
      <button onClick={() => downloadBlob(csv)}>Download CSV</button>
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
