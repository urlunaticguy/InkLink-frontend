import React from "react";
import RegisterCard from "./RegisterCard";

function RegisterScreenCard(props) {
  return (
    <div className={props.parentStyleClass}>
      <RegisterCard className={props.formStyleClass} />
      <div className={props.imageStyleClass}>Div Image</div>
    </div>
  );
}

export default RegisterScreenCard;
