import React, { useEffect, useState } from "react";
import "./VanDetails.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { API_URL } from "../../api";
export default function VanDetails() {
  const [van, setVan] = useState({});
  const [formUpdate, setFormUpdate] = useState({
    make: "",
    model: "",
    engine: "",
    lwb: false,
  });

  useEffect(() => {
    getVanDetails();
  }, []);

  const { id } = useParams();

  const getVanDetails = async () => {
    const API = `${API_URL}/vans/${id}`;

    const res = await axios.get(API);
    console.log(res);
    setVan(res.data);
  };

  const handleChangeUpdate = (event) => {
    setFormUpdate({ ...formUpdate, [event.target.name]: event.target.value });
  };

  const handleCheckUpdate = (event) => {
    setFormUpdate({ ...formUpdate, [event.target.name]: !formUpdate[event.target.name] });
  };

  const updateVan = async (event) => {
    event.preventDefault();
    const bodyToSend = {};
    for (const prop in formUpdate) {
      if (formUpdate[prop] !== "") {
        bodyToSend[prop] = formUpdate[prop];
      }
    }

    const API = `${API_URL}/vans/${id}`;
    const res = await axios.put(API, bodyToSend);
    console.log(res);
    getVanDetails();
    setFormUpdate({
      make: "",
      model: "",
      engine: "",
      lwb: false,
    });
  };

  if (!van) {
    <>
      <h1>Ow no, thats a 404</h1>
      <p>The van with {id} no longer exists</p>
      <Link to="/">Go back to the homepage</Link>
    </>;
  }

  return (
    <>
      <div className=" van-details-container container">
        <Link to="/">&#8617; Home</Link>
        <h1>
          {van.make} {van.model}
        </h1>
        <p>Engine: {van.engine}</p>
        {van.lwb && <p>This van is a long wheel base</p>}
        {!van.lwb && <p>This van is not a long wheel base</p>}
      </div>
      <section className="update-van-form-section container">
        <h3 className="form-heading">Update van</h3>
        <form onSubmit={updateVan}>
          <input
            type="text"
            name="make"
            onChange={handleChangeUpdate}
            placeholder="Update Van Make"
            value={formUpdate.make}
          />
          <input
            type="text"
            name="model"
            onChange={handleChangeUpdate}
            placeholder="Update Van Model"
            value={formUpdate.model}
          />
          <input
            type="text"
            name="engine"
            onChange={handleChangeUpdate}
            placeholder="Update Engine Size"
            value={formUpdate.engine}
          />
          <input
            name="lwb"
            value={formUpdate.lwb}
            onChange={handleCheckUpdate}
            checked={formUpdate.lwb}
            type="checkbox"
            id="lwb"
          />
          <label htmlFor="lwb">Vehicle is long wheel base</label>
          <button className="update-van-btn">Update van</button>
        </form>
      </section>
    </>
  );
}
