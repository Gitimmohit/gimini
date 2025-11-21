import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FiSquare, FiCheckSquare, FiX } from "react-icons/fi";
import "../../../assets/scss/forms/form.scss";
import { IconContext } from "react-icons";
import { Input } from "reactstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const MultiSelectItems = ({
  list_a,
  setlist_b,
  setlist_c,
  show_search = true,
  setlist_id,
  get_id = true,
  page,
  setpage,
  setsearch_txt,
  type,
  loaded = false,
  bottom = 100,
  setbottom,
  count = 1,
  total_count = 0,
  setmultidata,
  multidata,
  selected,
  setselected,
  selected_name = "Items",
  is_header = false,
  callMe = () => { },
  is_call_function = false
}) => {
  console.log("multidata", multidata)
  const [data, setdata] = useState(false);
  const [showfilter, setshowfilter] = useState(false);
  const [filter_a, setfilter_a] = useState([]);
  const [search_a, setsearch_a] = useState("");
  const [search, setsearch] = useState("");
  const ref = useRef();
  const targetDivRef = useRef(null);
  const searchInputRef = useRef(null);

  const removeAll = () => {
    callMe()
    setselected([]);
    setmultidata(false);
  };

  const getselected = (selected, setselected, name, index, multidata) => {
    if (selected.some(item => JSON.stringify(item) === JSON.stringify(name))) {
      return (
        <div
          key={index}
          className=" m-1"
          style={{
            fontSize: "13px",
            background: "hsl(213, 100%, 95%)",
            padding: "2px",
            cursor: "default",
          }}
          onClick={() => {
            setselected(selected.filter(item => JSON.stringify(item) !== JSON.stringify(name)));
            setmultidata(false);
          }}
        >
          {" "}
          {name[1]}
        </div>
      );
    } else {
      return (
        <div
          key={index}
          className="m-1"
          style={{ fontSize: "13px", cursor: "copy", background: multidata ? "hsl(213, 100%, 95%)" : "", }}
          onClick={() => {
            setselected([...selected, name]);
            setmultidata(false);
          }}
        >
          {" "}
          {name[1]}
        </div>
      );
    }
  };

  useEffect(() => {
    if (selected.length >= 2 || multidata) {
      setdata(true);
    } else {
      setdata(false);
    }
  }, [selected.length >= 2, multidata]);

  useLayoutEffect(() => {
    if (multidata === true) {
      setselected(list_a);
    } else {
      setselected(selected);
    }
  }, [multidata, list_a]);

  useEffect(() => {
    let temp = [];
    let temp2 = [];
    for (let index = 0; index < selected.length; index++) {
      temp.push(selected[index]);
      if (typeof setlist_c === 'function') {
        temp2.push(selected[index][1].toUpperCase());
      }
    }
    setlist_b(temp);
    if (typeof setlist_c === 'function') {
      setlist_c(temp2);
    }
  }, [selected]);

  useEffect(() => {
    let temp2 = [];
    for (let index = 0; index < selected.length; index++) {
      temp2.push(selected[index][0]);
    }
    if (get_id) {
      setlist_id(temp2);
    }
  }, [selected]);

  const debouncefun = (fn, delay) => {
    let timer;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const getDatas = (val) => {
    setpage(1);
    setbottom(100);
    setsearch(val)
  };

  const betterfun = debouncefun(getDatas, 500);

  useEffect(() => {
    setsearch_txt(toTitleCase(search).toUpperCase());
  }, [search]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (targetDivRef.current && !targetDivRef.current.contains(event.target)) {
        setshowfilter(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when filter opens
  useEffect(() => {
    if (showfilter && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showfilter]);

  return (
    <>
      <div
        ref={targetDivRef} id="targetDiv"
        style={{ height: is_header ? (showfilter === true ? "29px" : "") : (showfilter === true ? "210px" : "") }}
      >
        <button
          type="button"
          style={{
            border: "1px solid #D3D3D3",
            height: "30.5px",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            background: "white",
            cursor: "default",
            overflow: "hidden",
          }}
          onClick={() => {
            setshowfilter(!showfilter);
          }}
          className="form-control-sm"
        >
          <div
            style={{
              maxWidth: "100%",
              overflowX: "auto",
              display: "flex",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="hide-scrollbar"
          >
            <div style={{ display: "flex", minWidth: "fit-content" }}>
              {data === false ? (
                selected.map((data, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "0px 3px 2px 3px",
                      fontSize: "12px",
                      background: "#E6F1FF",
                      margin: "2px",
                      alignItems: "center",
                      borderRadius: "15px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data[1]}
                  </div>
                ))
              ) : (
                <div
                  style={{
                    padding: "0px 5px 3px 5px",
                    fontSize: "12px",
                    background: "#E6F1FF",
                    margin: "2px",
                    alignItems: "center",
                    borderRadius: "15px",
                    whiteSpace: "nowrap",
                    display: "flex",
                  }}
                >
                  {multidata ? total_count : selected.length} {selected_name} Are Selected{" "}
                  <FiX
                    onClick={() => removeAll()}
                    style={{ fontSize: "14px", marginLeft: "6px", cursor: "pointer" }}
                    className="d_icon"
                  />
                </div>
              )}
            </div>
          </div>


          <div style={{ display: "flex" }}>
            <div
              style={{ borderLeft: "1px solid #D3D3D3", cursor: "pointer" }}
              onClick={() => {
                setshowfilter(!showfilter);
              }}
            >
              <IconContext.Provider
                value={{
                  className: "select-icon",
                }}
              >
                <MdOutlineKeyboardArrowDown />
              </IconContext.Provider>
            </div>
          </div>
        </button>
        {showfilter === true && (
          <>
            {show_search === true && (
              <div
                style={{
                  height: "40px",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: "5px",
                  width: "100%",
                  border: "1px solid #D3D3D3",
                  borderBottom: null,
                  borderTop: null,
                }}
              >
                <div
                  onClick={() => {
                    setmultidata(!multidata);
                    if (multidata) {
                      if(is_call_function){
                        callMe()
                      }
                      setselected([]);
                    }
                  }}
                  style={{ paddingTop: "5px", width: "20%", display: "flex", alignItems: "center", cursor: "pointer", zIndex: "1000001", background: "white" }}
                >
                  {multidata === true ? (
                    <>
                      <FiCheckSquare size={18} style={{ margin: "5px" }} /><span style={{ fontSize: "13px" }}>All</span></>
                  ) : (
                    <FiSquare size={18} style={{ margin: "5px" }} />
                  )}

                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: 10,
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "80%",
                    zIndex: "1000001", background: "white"
                  }}
                >
                  <Input
                    innerRef={searchInputRef}
                    type="search"
                    placeholder="Search..."
                    className="form-control-sm"
                    id="input"
                    style={{
                      width: "100%",
                      height: "30px",
                    }}
                    onChange={(val) => {
                      betterfun(val.target.value);
                    }}
                  />
                </div>
              </div>
            )}
            <div
              // className="custom-scrollbar"
              className="fixDataResult custom-select"
              ref={ref}
              style={{
                width: "100%",
                borderTop: "1px solid #D3D3D3",
                overflow: "auto",
                border: "1px solid #D3D3D3",
                height: "140px",
                zIndex: "1000001",
                background: "white"
              }}
              onScroll={() => {
                if (
                  ref.current.scrollTop > bottom - count &&
                  loaded &&
                  type === "backend"
                ) {
                  setpage(page + 1);
                  setbottom(bottom + 235);
                }
              }}
            >
              {search_a !== ""
                ? filter_a.map((item, index) =>
                  getselected(selected, setselected, item, index, multidata),
                )
                : list_a.map((item, index) =>
                  getselected(selected, setselected, item, index, multidata),
                )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MultiSelectItems;