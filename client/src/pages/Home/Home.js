import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { API_URL } from "../../api";

import Vans from "../../components/Vans/Vans";
import CreateVan from "../../components/CreateVan/CreateVan";

export default function Home() {
  const [vans, setVans] = useState([]);
  const [createForm, setCreateForm] = useState({
    make: "",
    model: "",
    engine: "",
    lwb: false,
  });

  useEffect(() => {
    getVans();
  }, []);

  const getVans = async () => {
    const API = `${API_URL}/vans`;
    const res = await axios.get(API);
    console.log(res.data);
    setVans(res.data);
  };

  const handleChangeCreate = (event) => {
    setCreateForm({ ...createForm, [event.target.name]: event.target.value });
  };

  const handleCheck = (event) => {
    setCreateForm({ ...createForm, [event.target.name]: !createForm[event.target.name] });
  };

  const createNewVan = async (event) => {
    event.preventDefault();
    const API = `https://vans-db-api.netlify.app/.netlify/functions/api/vans`;
    const res = await axios.post(API, createForm);
    //reset the input fields
    setCreateForm({
      make: "",
      model: "",
      engine: "",
      lwb: false,
    });
    //add our new van to the page
    setVans([...vans, res.data]);
  };

  return (
    <main className="home-main">
      <div className="home-main-container container">
        <h2 className="home-text bold">Available Vans in our collection</h2>
        <Vans vans={vans} />
        <CreateVan
          createForm={createForm}
          createNewVan={createNewVan}
          handleChangeCreate={handleChangeCreate}
          handleCheck={handleCheck}
        />
      </div>
    </main>
  );
}
