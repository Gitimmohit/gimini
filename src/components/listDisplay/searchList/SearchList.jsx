import React, { useState, useEffect } from "react";
// import { setIsSearch, setSearchItem } from "../../../store/searchBar/SearchBar";
import { useDispatch } from "react-redux";
// import { setPageNumber } from "../../../store/pagination/Pagination";
// import { setFilterToggle } from "../../../store/filterValue/FilterValue";
import { Input, Form } from "reactstrap";
import { FiSearch } from "react-icons/fi";
import 'boxicons/css/boxicons.min.css';
import { setIsSearch, setSearchItem } from "../../../redux/searchBar/SearchBar";
import { setFilterToggle } from "../../../redux/filterValue/FilterValue";
import { setPageNumber } from "../../../redux/pagination/Pagination";
const SearchList = () => {
  const dispatch = useDispatch();

  const [search, setsearch] = useState("");

  useEffect(() => {
    dispatch(setIsSearch(false));
    dispatch(setSearchItem(""));
  }, []);

  useEffect(() => {
    if (search === "") {
      dispatch(setIsSearch(true));
      dispatch(setSearchItem(""));
    }
  }, [search]);

  return (
    <Form
    onSubmit={(e) => {
      e.preventDefault();
      dispatch(setFilterToggle(true));
      dispatch(setIsSearch(true));
      dispatch(setSearchItem(search));
      dispatch(setPageNumber(1));
    }}
  >
      <div className="search-box me-2 mt-3 d-inline-block">
        <div className="position-relative">
          <label htmlFor="search-bar-0" className="search-label">
            <span id="search-bar-0-label" className="sr-only">
              Search this table
            </span>
            <Input
              id="search-bar-0"
              // style={{padding:"10px"}}
              type="text"
              aria-labelledby="search-bar-0-label"
              className="form-control "
              placeholder="Search"
              onChange={(e) => {
                setsearch(e.target.value); 
                dispatch(setIsSearch(false));
              }}
            />
          </label>
          <button
            type="button"
            style={{ background: "transparent", border: "white" }}
            onClick={() => {
              dispatch(setFilterToggle(true));
              dispatch(setIsSearch(true));
              dispatch(setSearchItem(search));
              dispatch(setPageNumber(1));
            }}
          >
            {/* <i className="bx bx-search-alt search-icon"></i> */}
            {/* <FiSearch/> */}
          </button>
        </div>
      </div>
    </Form>
  );
};

export default SearchList;
