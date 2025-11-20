import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NavBtn = ({ btn_name, form_path, icon }) => {
  const navigate = useNavigate();
  const handleAction = () => {
    navigate(form_path);
  };
  return ( 
    <Button
      style={{ padding: "5.8px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
      type="button"
      className="btn-rounded mb-2 me-2 mt-3 btn btn-success"
      onClick={handleAction}
    >
      <span >{icon}</span>
      <span>{btn_name}</span>
    </Button>
  );
};

export default NavBtn;