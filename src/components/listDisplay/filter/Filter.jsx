import React, { useState, useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
// import { Button, Offcanvas } from "react-bootstrap";
import { MdFilterListAlt } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setFilterToggle } from "../../../redux/filterValue/FilterValue";
import { setIsSearch, setSearchItem } from "../../../redux/searchBar/SearchBar"; 

const Filter = ({ type }) => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.parentfilter.toggle);
  const page_num = useSelector((state) => state.pagination.page_number);
  const tog = useSelector((state) => state.pagination.toggle);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    dispatch(setIsSearch(false));
    dispatch(setSearchItem(""));
    dispatch(setFilterToggle(true));
  };

  useEffect(() => {
    if (toggle === true) {
      setShow(false);
    }
  }, [toggle === true]);

  useEffect(() => {
    dispatch(setFilterToggle(false));
  }, [tog, page_num, toggle]);

  const [filter, setfilter] = useState("");
  useEffect(() => {
    if (type === "inviteuser") {
      setfilter("inviteuser");
    } else if (type === "logindetails") {
      setfilter("logindetails");
    } else if (type === "superuserview") {
      setfilter("superuserview");
    }
  }, [type]);

  return (
    <>
      <Button
        type="button"
        className="btn-rounded fluid mb-2 me-2 mt-3 btn btn-success"
        onClick={handleShow}
      >
        <MdFilterListAlt size={15} />
        {/* Filter */}
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ width: "300px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {" "}
            <h3>Filter</h3>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ paddingTop: "0px" }}>
          {filter === "inviteuser" ? (
            "inviteuser"
          ) : filter === "logindetails" ? (
            'logindetails'
          ) : filter === "superuserview" ? (
            "superuserview"
          ) : (
            ""
          )}
          <br />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Filter;
