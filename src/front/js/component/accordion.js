import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/cardDetail.css";

export const Accordion = ({ body, title, id, type }) => {
  const { store } = useContext(Context);
  return (
    <>
      <div className={`accordion-item ${store.theme}`}>
        <h2 className="accordion-header" id={`flush${id}-headingOne`}>
          <button
            className={`accordion-button collapsed ${store.theme}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#flush${id}-collapseOne`}
            aria-expanded="false"
            aria-controls={`flush${id}-collapseOne`}
          >
            <b>{title}</b>
          </button>
        </h2>
        <div
          id={`flush${id}-collapseOne`}
          className="accordion-collapse collapse"
          aria-labelledby={`flush${id}-headingOne`}
          data-bs-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            {body[type]?.items.map((item) => (
              <p className="fw-light" key={item.name}>
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
