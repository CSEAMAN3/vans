import React from "react";
import "./CreateVan.css";

export default function CreateVan({ createForm, createNewVan, handleChangeCreate, handleCheck }) {
  return (
    <>
      <h3 className="form-title bold">Add a new van</h3>
      <form onSubmit={createNewVan}>
        <input type="text" name="make" onChange={handleChangeCreate} placeholder="vehicle make" value={createForm.make} />
        <input type="text" name="model" onChange={handleChangeCreate} placeholder="vehicle model" value={createForm.model} />
        <input type="text" name="engine" onChange={handleChangeCreate} placeholder="engine size" value={createForm.engine} />
        <input type="checkbox" name="lwb" onChange={handleCheck} value={createForm.lwb} checked={createForm.lwb} id="lwb" />
        <label htmlFor="lwb">Vehicle is longwheel base</label>
        <button className="create-form-btn">Create Van</button>
      </form>
    </>
  );
}
