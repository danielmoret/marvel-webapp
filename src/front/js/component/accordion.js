import React from "react";

export const Accordion = ({ body, title, id, type }) => {
  console.log(body);
  return (
    <>
      <div className="accordion-item">
        <h2 className="accordion-header" id={`flush${id}-headingOne`}>
          <button
            className="accordion-button collapsed"
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
              <p className="fw-semibold" key={item.name}>
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
