import {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cupcake from "../components/Cupcake";

function CupcakeList() {
  // Step 1: get all cupcakes
const [cupcake, setCupcake] = useState ([]);
const [accessory, setAccessory] = useState ([]);
const [accessoryFilter, setAccessoryFilter] = useState("");

useEffect (() => {
  axios
  .get("http://localhost:4000/cupcakes")
  .then((response => response.data))
  .then((data) => setCupcake(data));
}, []);
  // Step 3: get all accessories

  useEffect (() => {
    axios
    .get("http://localhost:4000/accessories")
    .then((response) => response.data)
    .then((data) => setAccessory(data))
  }, []);

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by
          <select 
          id="cupcake-select" 
          onChange={(e) => setAccessoryFilter(e.target.value)}
          >
            <option value="">---</option>
            {accessory.map((cake) => (
              <option value={cake.id}>{cake.name}</option>
            ))}

            {/* Step 4: add an option for each accessory */}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {cupcake  && 
          cupcake 
        .filter(
          (toto) => 
          !accessoryFilter || toto.accessory_id === accessoryFilter
          )
        .map((toto) => (
        <li className="cupcake-item" key={toto.id} >
          <Link to={`/cupcake/${toto.id}`}>
            <Cupcake key={toto.id} cupcake={toto} />
          </Link>
        </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;

