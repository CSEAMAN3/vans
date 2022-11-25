import React from "react";
import "./Vans.css";
import { Link } from "react-router-dom";

export default function Vans({ vans }) {
  return (
    <>
      {vans.map((van, idx) => {
        const { _id, make, model, engine, lwb } = van;
        return (
          <div className="van-container" key={idx}>
            <Link to={`/vans/${_id}`}>
              <h2 className="van-name bold">
                {make} {model}
              </h2>
            </Link>
            <p className="engine">engine size: {engine}</p>
            {lwb && <p>Long Wheel Base Vehicle</p>}
            {!lwb && <p>Short Wheel Base Vehicle</p>}
          </div>
        );
      })}
    </>
  );
}
