import React from "react";

export function Form(props) {
  return (
    <div className="form-group">
      <input className="form-control" {...props} />
    </div>
  );
}
