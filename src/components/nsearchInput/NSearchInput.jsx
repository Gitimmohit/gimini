import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MdOutlineKeyboardArrowDown, MdErrorOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";

const NSearchInput = ({
  data_list,
  data_item_s,
  set_data_item_s,
  error_message = null,
  set_id,
  set_temp,
  error_s = false,
  show_search = true,
  disable_me = false,
  current_width = "100%",
  child_width = "95%",
  show_error = true,
  add_nav = "",
}) => {
  const [showfilter, setshowfilter] = useState(false);
  const [data_list_s, setdata_list_s] = useState(data_list);
  const [filterList, setfilterList] = useState(data_list);
  const [searchWord, setsearchWord] = useState("");
  const [error, seterror] = useState(false);
  const [searching, setsearching] = useState(false);
  const [focused, setfocused] = useState(false);
  // For UP and Down Key
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const dropdownRef = useRef(null);
  const spanRef = useRef(null);

  const toggleDropdown = () => {
    if(!disable_me){
      setshowfilter(true);
    }
    setHighlightedIndex(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === filterList.length - 1
          ? 0
          : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex === null || prevIndex === 0
          ? filterList.length - 1
          : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex !== null) {
        if (typeof filterList[highlightedIndex] === "string") {
          set_data_item_s(filterList[highlightedIndex]);
        } else {
          set_data_item_s(filterList[highlightedIndex][1]);
          set_id(filterList[highlightedIndex][0]);
          set_temp && set_temp(filterList[highlightedIndex][2]);
        }
        setshowfilter(false);
        setfocused(false);
        setsearchWord("");
      }
    } else if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault(); // Prevent default Tab behavior
      setshowfilter(false);
      setfocused(false); 
      // Select focusable elements, excluding disabled ones
      const focusableElements = document.querySelectorAll('button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])');
      const currentElement = e.target;
      const currentIndex = Array.from(focusableElements).indexOf(currentElement); 
      if (currentIndex > 0) {
        // Focus the previous enabled element
        focusableElements[currentIndex - 1].focus();
      } else if (currentIndex === -1) {
        // Handle case where current element is not in focusableElements Find the closest previous focusable element in the DOM
        const form = currentElement.closest('form') || document;
        const allFocusable = Array.from(form.querySelectorAll('button:not([disabled]), [href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'));
        const currentElementIndex = Array.from(form.querySelectorAll('*')).indexOf(currentElement);
        const previousFocusable = allFocusable.filter((el) => Array.from(form.querySelectorAll('*')).indexOf(el) < currentElementIndex).pop(); // Get the last focusable element before the current one
        if (previousFocusable) {
          previousFocusable.focus();
        }
      }
    }
  };

  const handleFilter2 = (event) => {
    const search2 = event.target.value;
    setsearchWord(search2);
    const newFilter = data_list_s.filter((value) => {
      let search_val;
      if (typeof value === "string") {
        search_val = value;
      } else {
        search_val = value[1];
      }
      return search_val.toLowerCase().includes(search2.toLowerCase());
    });
    setfilterList(newFilter);
  };

  useLayoutEffect(() => {
    setdata_list_s(data_list);
    setfilterList(data_list);
  }, [data_list]);

  useEffect(() => {
    seterror(error_s);
  }, [error_s]);

  useEffect(() => {
    if (!showfilter) {
      if (!data_item_s && error_message && focused && show_error) {
        seterror(true);
      } else {
        seterror(false);
      }
    }
  }, [showfilter]);

  const [is_focused, setis_focused] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const search_ref = useRef("");

  useEffect(() => {
    if (showfilter && show_search && data_list_s?.length > 0) {
      search_ref.current.focus();
    }
  }, [showfilter, show_search, data_list_s]);

  useEffect(() => {
      if (highlightedIndex !== null && showfilter) {
        const highlightedOption =
          dropdownRef.current.querySelector(".highlighted");
        if (highlightedOption) {
          highlightedOption.scrollIntoView({ block: "nearest" });
        }
      }
    }, [highlightedIndex, showfilter]);

  return (
    <>
      <div
        ref={dropdownRef}
        // onMouseEnter={() => {
        //   if (disable_me === false) {
        //     setshowfilter(true)
        //   }
        // }}
        onFocus={() => setfocused(true)}
        onMouseLeave={() => {
          if (disable_me === false) {
            setshowfilter(false);
          }
        }}
        onBlur={() => {
          if (!show_search && searching === false) {
            setshowfilter(false);
          }
          if (searching === false && show_error) {
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
              border: is_focused
                ? "3px solid #4fa8e4"
                : error
                  ? "1px solid #F46A6A"
                  : "1px solid #d3d3d3",
              height: "30.5px",
              display: "flex",
              // width: current_width,
              width: add_nav !== "" ? "90%" : current_width,
              justifyContent: "space-between",
              position: "",
              background: disable_me ? "#EFF2F7" : "white",
            }}
            onFocus={() => {
              if (disable_me === false) {
                setshowfilter(true);
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
              if (disable_me === false && !show_search) {
                setshowfilter(true);
                setis_focused(true);
              }
            }}
            onKeyDown={handleKeyDown}
            // tabIndex={0}
            tabIndex={disable_me ? -1 : 0}
          >
            <div
              style={{
                fontSize: "10.7px",
                color: "#545454",
                overflowX: "hidden",
                overflowY: "hidden",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                padding: 0,
                margin: 0,
              }}
            >
              <span
                className="same-socket"
                ref={spanRef}
                style={{
                  display: "inline-block",
                  whiteSpace: "nowrap",
                  overflowX: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                onMouseEnter={() => {
                  spanRef.current.style.overflowX = "auto";
                }}
                onMouseLeave={() => {
                  spanRef.current.style.overflowX = "hidden";
                }}
              >
                {data_item_s}
              </span>
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
                    // style={{borderBottom:"1px solid red"}}
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
          {(add_nav !== "") && (
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
            className="dataResult custom-select"
            style={{
              // position: "absolute",
              // width: "95%",
              width: child_width,
              zIndex: "1",
              // border: showfilter ? "1px solid #d3d3d3" : null,
            }}
          >
            {showfilter && show_search && data_list.length !== 0 ? (
              <div
                style={{
                  margin: "5px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  position: "sticky",
                  top: 0,
                }}
                onMouseDown={() => setsearching(true)}
                onBlur={() => {
                  setshowfilter(false);
                  setsearching(false);
                  setsearchWord("");
                  setdata_list_s(data_list);
                  setfilterList(data_list);
                }}
              >
                <input
                  ref={search_ref}
                  autoComplete="off"
                  className="form-control-md"
                  style={{ width: "100%", borderRadius: "5px" }}
                  id="input"
                  value={searchWord}
                  onChange={handleFilter2}
                  placeholder="Search....."
                  onBlur={() => {
                    setshowfilter(false);
                  }}
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
                            }

                            // set_data_item_s(value)
                            setshowfilter(false);
                            setsearchWord("");
                            setfilterList(data_list_s);
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
    </>
  );
};

export default NSearchInput;
