import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Input } from "reactstrap";
import { MdOutlineKeyboardArrowDown, MdErrorOutline } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons"; 
import toTitleCase from "../toTitleCase/toTitleCase";

const SearchInput = ({
  data_list,
  data_item_s,
  set_data_item_s,
  error_s = false,
  error_message = null,
  set_id,
  show_search = true,
  disable_me = false,
  current_width = "100%",
  page = 1,
  setpage,
  setsearch_item,
  set_temp,
  set_temp2,
  set_temp3,
  with_add = 0,
  add_nav = "",
  loaded = false,
  bottom = 103,
  setbottom,
  count = 1,
  is_wrapped = false,
  show_error = true,
}) => {
  //  Dropdown Handle
  const [showfilter, setshowfilter] = useState(false);
  const [data_list_s, setdata_list_s] = useState(data_list);
  const [filterList, setfilterList] = useState(data_list);

  // Pagination
  const ref = useRef();
  const [search, setsearch] = useState("");
  const [error, seterror] = useState(false);
  const [searching, setsearching] = useState(false);
  const [focused, setfocused] = useState(false);
  // For UP and Down Key
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setHighlightedIndex(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === filterList.length - 1
          ? 0
          : prevIndex + 1,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? filterList.length - 1
          : prevIndex - 1,
      );
    } else if (e.key === "Enter") {
      if (highlightedIndex !== null) {
        if (typeof filterList[highlightedIndex] === "string") {
          set_data_item_s(filterList[highlightedIndex]);
        } else {
          set_data_item_s(filterList[highlightedIndex][1]);
          set_id(filterList[highlightedIndex][0]);
          set_temp && set_temp(filterList[highlightedIndex][2]);
          set_temp2 && set_temp2(filterList[highlightedIndex][3]);
          set_temp3 && set_temp3(filterList[highlightedIndex][4]);
        }
        setshowfilter(false);
        setfocused(false);
      }
    }
  };

  useEffect(() => {
    setsearch_item(toTitleCase(search).toUpperCase());
  }, [search]);

  useLayoutEffect(() => {
    setdata_list_s(data_list);
    setfilterList(data_list);
  }, [data_list]);

  useEffect(() => {
    if (!showfilter) {
      setsearch("");
      if (!data_item_s && error_message && focused && show_error) {
        seterror(true);
      } else {
        seterror(false);
      }
    }
  }, [showfilter]);

  useEffect(() => {
    seterror(error_s);
  }, [error_s]);

  useEffect(() => {
    if (highlightedIndex !== null && showfilter) {
      const highlightedOption =
        dropdownRef.current.querySelector(".highlighted");
      if (highlightedOption) {
        highlightedOption.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, showfilter]);

  const [is_focused, setis_focused] = useState(false);
  const [refresh, setrefresh] = useState(false);

  const search_ref = useRef("")

  useEffect(() => {
    if (showfilter && data_list_s?.length > 0) {
      search_ref.current.focus();
    }
  }, [showfilter, data_list_s])

  return (
    <div
      ref={dropdownRef}
      // onMouseEnter={() => {
      //   if (disable_me === false) {
      //     setshowfilter(true)
      //   }
      // }}
      onMouseLeave={() => {
        if (disable_me === false) {
          setshowfilter(false)
        }
      }
      }
      onFocus={() => setfocused(true)}
      onBlur={() => {
        if (searching === false && show_error) {
          // setshowfilter(false);
          if (!data_item_s) {
            seterror(true);
          } else {
            seterror(false);
          }
        }
      }}
    >
      <div
        style={{
          height: "30.5px",
          display: "flex",
          width: current_width,
          justifyContent: "space-between",
          position: "",
          background: disable_me ? "#EFF2F7" : "white",
        }}
      >
        <button
          type="button"
          style={{
            // border: error ? "1px solid #F46A6A" : ( is_focused ? "3px solid #4fa8e4": "1px solid #d3d3d3"),
            border: is_focused
              ? "3px solid #4fa8e4"
              : error
                ? "1px solid #F46A6A"
                : "1px solid #d3d3d3",
            height: "30.5px",
            display: "flex",
            width: current_width,
            justifyContent: "space-between",
            position: "",
            background: disable_me ? "#EFF2F7" : "white",
          }}
          onFocus={() => {
            if (disable_me === false) {
              setshowfilter(true)
              setis_focused(true);
              setrefresh(!refresh);
            }
          }}
          onBlur={() => {
            setis_focused(false);
            setrefresh(!refresh);
          }}
          className="form-control-sm"
          onClick={() => {
            toggleDropdown();
            // if (disable_me === false) {
            //   setshowfilter(!showfilter);
            // }
          }}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            style={{ paddingTop: "2px", fontSize: "10.7px", color: "#545454" }}
          >
            {is_wrapped
              ? data_item_s && String(data_item_s).substring(0, 35) + "..."
              : data_item_s}
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ borderLeft: "1px solid #d3d3d3" }}>
              {error ? (
                <IconContext.Provider
                  value={{
                    className: "error-circle",
                  }}
                >
                  <MdErrorOutline />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider
                  value={{
                    className: "select-icon",
                  }}
                >
                  <MdOutlineKeyboardArrowDown />
                </IconContext.Provider>
              )}
            </div>
          </div>
        </button>

        {add_nav !== "" && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              border: "1px solid #d3d3d3",
            }}
            onClick={() => {
              window.open(add_nav, "_blank");
            }}
          >
            <AiOutlinePlus />
          </div>
        )}
      </div>

      <div className="error-text" color="danger">
        {error ? error_message : null}
      </div>

      {showfilter ? (
        <div
          ref={ref}
          className="dataResult custom-select"
          id="chk"
          onScroll={() => {
            if (ref.current.scrollTop > bottom - count && loaded) {
              setpage(page + 1);
              setbottom(bottom + 262 - with_add);
            }
          }}
          style={{
            width: "95%",
            // width: current_width,
            zIndex: "1",
            // border: is_focused ? "1px solid #d3d3d3" : null
          }}
        >
          {showfilter && show_search ? (
            <div
              style={{
                margin: "5px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                position: "sticky",
                top: 0,
              }}
            >
              <input
                ref={search_ref}
                autoComplete="off"
                style={{ width: "100%", borderRadius: "5px" }}
                className="form-control-md"
                id="input"
                value={search}
                // onMouseDown={() => {setsearching(true)}}
                onMouseDown={() => {
                  setsearching(true);
                }}
                onBlur={() => { setshowfilter(false); }}
                onChange={(val) => {
                  setpage(1);
                  setbottom(103);
                  setsearch(val.target.value);
                }}
                placeholder="Search....."
                onKeyDown={handleKeyDown}
              />
            </div>
          ) : (
            <div></div>
          )}

          {showfilter ? (
            <>
              {filterList.length > 0 ? (
                filterList.map((value, key) => {
                  return (
                    <div key={key} className="data_item">
                      <span
                        onMouseDown={() => {
                          if (typeof value === "string") {
                            set_data_item_s(value);
                          } else {
                            set_data_item_s(value[1]);
                            set_id(value[0]);
                            set_temp && set_temp(value[2]);
                            set_temp2 && set_temp2(value[3]);
                            set_temp3 && set_temp3(value[4]);
                          }
                          setshowfilter(false);
                        }}
                      >
                        <div
                          style={{
                            padding: "5px 7px",
                            cursor: "default",
                            fontSize: "10.7px",
                          }}
                          key={key}
                          className={
                            highlightedIndex === key ? "highlighted" : ""
                          }
                        >
                          {typeof value == "string" ? value : value[1]}
                        </div>
                      </span>
                    </div>
                  );
                })
              ) : (
                <div style={{ marginLeft: "6px", fontSize: "12px" }}>
                  No Data Found
                </div>
              )}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default SearchInput;
