import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Input } from "reactstrap";
import { MdOutlineKeyboardArrowDown, MdErrorOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { AiOutlinePlus } from "react-icons/ai";

const MultiRowSearchInput = ({
  data_list,
  data_item_s,
  error_message = null,
  show_search = true,
  disable_me = false,
  current_width = "100%",
  page = 1,
  setpage,
  setsearch_txt,
  refresh = false,
  setrefresh,
  with_add = 0,
  idx = 0,
  loaded = false,
  bottom = 103,
  setbottom,
  add_nav = "",
  count = 1,
  position = "absolute",
  call_onchnage = false,
  getData,
}) => {

  // const is_search = useSelector((state) => state.searchbar.is_search);
  const [showfilter, setshowfilter] = useState(false);
  const [data_list_s, setdata_list_s] = useState(data_list);
  const [filterList, setfilterList] = useState(data_list);
  const [is_focused, setis_focused] = useState(false);
  // Pagination
  const ref = useRef();
  // const [bottom, setbottom] = useState(103);
  const [search, setsearch] = useState("");
  const [error, seterror] = useState(false);
  const [searching, setsearching] = useState(false);
  const [focused, setfocused] = useState(false);

  // Postion
  const [list_top, setlist_top] = useState(0);
  // For UP and Down Key
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setHighlightedIndex(null);
    setpage(1);
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
          data_item_s = filterList[highlightedIndex];
        } else {
          // if (data_item_s.length === 3) {
          if (data_item_s.length === 3) {
            data_item_s[0] = filterList[highlightedIndex][0];
            data_item_s[1] = filterList[highlightedIndex][1];
            data_item_s[2] = filterList[highlightedIndex][2];
          } else if (data_item_s.length === 4) {
            data_item_s[0] = filterList[highlightedIndex][0];
            data_item_s[1] = filterList[highlightedIndex][1];
            data_item_s[2] = filterList[highlightedIndex][2];
            data_item_s[3] = filterList[highlightedIndex][3];
          } else if (data_item_s.length === 5) {
            data_item_s[0] = filterList[highlightedIndex][0];
            data_item_s[1] = filterList[highlightedIndex][1];
            data_item_s[2] = filterList[highlightedIndex][2];
            data_item_s[3] = filterList[highlightedIndex][3];
            data_item_s[4] = filterList[highlightedIndex][4];
          } else if (data_item_s.length === 6) {
            data_item_s[0] = filterList[highlightedIndex][0];
            data_item_s[1] = filterList[highlightedIndex][1];
            data_item_s[2] = filterList[highlightedIndex][2];
            data_item_s[3] = filterList[highlightedIndex][3];
            data_item_s[4] = filterList[highlightedIndex][4];
            data_item_s[5] = filterList[highlightedIndex][5];
          } else {
            data_item_s[0] = filterList[highlightedIndex][0];
            data_item_s[1] = filterList[highlightedIndex][1];
          }
        }
        setrefresh(!refresh);
        setshowfilter(true);
      }
    }
  };

  useLayoutEffect(() => {
    setdata_list_s(data_list);
    setfilterList(data_list);
  }, [data_list]);

  useEffect(() => {
    if (highlightedIndex !== null && showfilter) {
      const highlightedOption =
        dropdownRef.current.querySelector(".highlighted");
      if (highlightedOption) {
        highlightedOption.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, showfilter]);

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
    setbottom(103);
    setsearch(val)
  };

  const betterfun = debouncefun(getDatas, 500);

  useEffect(() => {
    setsearch_txt(toTitleCase(search).toUpperCase());
  }, [search]);

  return (
    <div
      // style={{ position: "relative" }}
      ref={dropdownRef}
      onFocus={() => setfocused(true)}
      onBlur={() => {
        setsearching(false);
        if (searching === false) {
          setshowfilter(false);
          if (!data_item_s) {
            seterror(true);
          } else {
            seterror(false);
          }
        }
      }}
      id={`tab${idx}`}
      onClick={() => {
        const el = document.getElementById(`tab${idx}`);
        var rect = el.getBoundingClientRect();

        setlist_top(rect.top);
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
            // border: error ? "1px solid #F46A6A" : "1px solid #d3d3d3",
            border: is_focused
              ? "3px solid #4fa8e4"
              : error
                ? "1px solid #F46A6A"
                : "1px solid #d3d3d3",
            height: "30.5px",
            display: "flex",
            width: add_nav !== "" ? "90%" : current_width,
            justifyContent: "space-between",
            background: disable_me ? "#EFF2F7" : "white",
            margin: "0px",
          }}
          onFocus={() => {
            setis_focused(true);
          }}
          onBlur={() => {
            setis_focused(false);
          }}
          className="form-control-sm"
          onClick={() => {
            toggleDropdown();
            if (disable_me === false) {
              setshowfilter(!showfilter);
            }
          }}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div
            style={{
              paddingTop: "1.5px",
              fontSize: "10.7px",
              color: "#545454",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {typeof data_item_s === "string" ? data_item_s : data_item_s[1]}
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
        {(add_nav !== "" && !disable_me) && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              border: "1px solid #d3d3d3",
              cursor: "pointer",
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
            for (let i = 1; i <= count; i += 3) {
              // alert("2")
              console.log("Current" , ref.current.scrollTop)
              console.log("bottom" ,  bottom)
              console.log("count" ,   count)
              console.log("loaded" ,    loaded)
              console.log("condition1" ,ref.current.scrollTop )
              console.log("condition2" ,bottom - count )
              // setpage(page + 1);
              if (ref.current.scrollTop > bottom - count && loaded) {
                setpage(page + 1);
                alert("1")
                setbottom(bottom + 262 - with_add);

                break;
              }
            }
          }}


          style={{
            width: position === "fixed" ? "270px" : current_width,
            zIndex: "100000",
            border: showfilter ? "1px solid #d3d3d3" : null,
            position: position,
            top: `${list_top + 30}`,
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
              <Input
                autoComplete="off"
                className="form-control-md"
                id="input"
                // value={search}
                onMouseDown={() => setsearching(true)}
                // onChange={(val) => {
                //   setpage(1);
                //   setbottom(103);
                //   setsearch(val.target.value);
                //   // dispatch(setIsSearch(false));
                // }}
                onChange={(val) => {
                  betterfun(val.target.value);
                }}
                placeholder="Search....."
              />
              {/* <i
                onMouseDown={() => {
                  if (search != "") {
                    setsearching(true);
                  }
                }}
                onClick={() => {
                  if (!is_search) {
                    setdata_list([]);
                  }
                  // dispatch(setFilterToggle(true));
                  // dispatch(setIsSearch(true));
                  setis_search(true);
                  // dispatch(setSearchItem(search));
                  setsearch_txt(search);
                  dispatch(setPageNumber(1));
                  setpage(1);
                  setbottom(103);
                }}
                className="bx bx-search-alt search-icon"
              ></i> */}
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
                            data_item_s = value;
                          } else {

                            if (call_onchnage) {
                              getData(value[0]);
                            }

                            if (data_item_s.length === 3) {
                              data_item_s[0] = value[0];
                              data_item_s[1] = value[1];
                              data_item_s[2] = value[2];
                            } else if (data_item_s.length === 4) {
                              data_item_s[0] = value[0];
                              data_item_s[1] = value[1];
                              data_item_s[2] = value[2];
                              data_item_s[3] = value[3];
                            } else if (data_item_s.length === 5) {
                              data_item_s[0] = value[0];
                              data_item_s[1] = value[1];
                              data_item_s[2] = value[2];
                              data_item_s[3] = value[3];
                              data_item_s[4] = value[4];
                            } else if (data_item_s.length === 6) {
                              data_item_s[0] = value[0];
                              data_item_s[1] = value[1];
                              data_item_s[2] = value[2];
                              data_item_s[3] = value[3];
                              data_item_s[4] = value[4];
                              data_item_s[5] = value[5];
                            } else {
                              data_item_s[0] = value[0];
                              data_item_s[1] = value[1];
                            }
                          }
                          setrefresh(!refresh);
                          setshowfilter(false);
                        }}
                        key={key}
                      >
                        <div
                          style={{
                            padding: "5px 7px",
                            cursor: "default",
                            fontSize: "10.7px",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                            lineHeight: "1.2em",
                            minHeight: "1.2em",
                            textAlign: "left",
                            transition: "background 0.2s",
                          }}
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
                <div>No Data Found</div>
              )}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default MultiRowSearchInput;
