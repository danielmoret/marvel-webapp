import React from "react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          <span className="text-danger">Opps!</span> Página no encontrada.
        </p>
        <Link to="/" className="btn btn-dark">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
};
