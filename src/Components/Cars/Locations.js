import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import "../../Components/MainNav/mainNav";

function Locations() {
  const [countries] = useState([
    {code: "hyd", title: "Hyderabad" },
    {code: "ch", title: "Chennai" },
    {code: "bg", title: "Banglore" },
    {code: "dl",title:"Delhi"},
    {code:"Pn",title:"Pune"},
    {code:"Mb",title:"Mumbai"},
    {code:"goa",title:"Goa"},
    {code:"Kl",title:"Kolkata"},
    {code:"Cb",title:"Coimbatore"},
    {code:"Vz",title:"Vijaywada"}
  ]);

  const [toggleContents, setToggleContents] = useState("Select Location");
  const [selectedCountry, setSelectedCountry] = useState();
  return (
    <>
      <div className="Location">
        <Dropdown
          onSelect={(eventKey) => {
            const { code, title } = countries.find(
              ({ code }) => eventKey === code
            );

            setSelectedCountry(eventKey);
            setToggleContents(<>{title}</>);
          }}
        >
          <Dropdown.Toggle
            variant="primary"
            id="dropdown-flags"
            className="text-left"
          >
            {toggleContents}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {countries.map(({ code, title }) => (
              <Dropdown.Item key={code} eventKey={code}>
                {title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}

export default Locations;
