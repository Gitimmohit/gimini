import React, { useLayoutEffect } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ServerAddress } from "../../../server/ServerAddress";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsXLg } from "react-icons/bs";
import { FiSquare, FiCheckSquare, FiMinusSquare } from "react-icons/fi";
import { RiArrowUpDownLine } from "react-icons/ri";
import { LuArrowDownUp } from "react-icons/lu";

import {
  setDataLoaded, // When click on next button or previous button and data is loaded (True or False)
  setNext, // If in an API any next page value is present then it will store true value else false
  setNextB, // If in same page two list display is using. Not in use. In Future we can use.
  setPrev, // If in an API any previous page value is present then it will store true value else false
  setPrevB, // If in same page two list display is using. Not in use. In Future we can use.
  setTotalData, // Total Count Value get through API in a page
  setTotalDataB, // If in same page two list display is using. Not in use. In Future we can use.
} from "../../../redux/pagination/Pagination";
import {
  setClose, // User for Salary Coponent (Not in use).
  setDeleteId, // At the time of deleting any item value will be true else false
  setIds, // When ever we select any item for delete that time ids will be set in setIds like [12,43,2]
  setIndex, // This Index is used for Sorting Purpose when ever we click on table head data that time it store its index position
  setIndexValue, // This Index value is used for Sorting Purpose when ever we click on table head data that time it store its index value
  setListToggle, // When ever we click tabe head data for sorting that time it set the value true else false
  setSelect, // If we select any value for delete that time it set the value true
  setSelectAll, // If we select all value for delete that time it set the value true else false
} from "../../../redux/dataList/DataList";
import { Modal, Button } from "react-bootstrap";
import {
  setFilterA, // These all redux state is used to store the individual filter values
  setFilterB,
  setFilterC,
  setFilterD,
  setFilterE,
  setFilterF,
  setFilterG,
  setFilterH,
  setFilterI,
  setFilterJ,
  setFilterK,
  setFilterL,
  setFilterM,
  setFilterN,
  setFilterO,
  setFilterP,
} from "../../../redux/filterValue/FilterValue";
import { Col, Label, Input } from "reactstrap";
import {
  //These all state is used to shown the alert like at the time of add, update & delete data we need to show the alert that time this is usefull.
  setAlertType, // According to the redux state value ('danger', 'warning', 'success') alert color will change ('red', 'yellow', 'blue')
  setDataExist, // This is going to set the alert message 
  setShowAlert, // If we want to show the alert then we need to do the setShowAlert value true
} from "../../../redux/alert/Alert";
import Loader from "../../loader/Loader";
import ColorLoader from "../../loader/ColorLoader";
import { setIsSearch, setSearchItem } from "../../../redux/searchBar/SearchBar";

const DataList = ({
  Data_Title, // In this props we accept all table head or title value  
  Data_Format, // Here we accept Table body component like all 'td' and 'tr' values  
  path, // Here we accept the API path to get the data or set the data in the list display part.
  pathb, // If in same page two list display is using. Not in use. In Future we can use.
  value, // Not in use. In Future we can use.
  order_id = "", //  Not in use. In Future we can use.
  checkbox = "", // By default it set the empty value mins delete chack box will show if we don't want in list display delete checkbox then we pass here checkbox:{'No'} value
  can_delete, // In this props it accept true & false value for Permission according to the Permission Delete icon or checkbx will shown.
  delete_checkbox = true,
  id_type = "id", // This props by defalut set as 'id' mins if id then it set all id for delete the ata in a list else it set the pan_no that is primary key or unique value.
  body_data = {},
  load_branchwise_data = false
}) => {
  const dispatch = useDispatch();
  // const branch_data = useSelector((state) => state.authentication.currentbranchdetails);
  // const organization_data = useSelector((state) => state.authentication.currentorganizationdetails);
  const [data_title] = useState(Data_Title);
  const myArr = JSON.parse(JSON.stringify(data_title));
  const accessToken = useSelector((state) => state.user.access_token);
  const [data, setdata] = useState([]);
  const [datab, setdatab] = useState([]);
  const page_num = useSelector((state) => state.pagination.page_number);
  const is_deleted = useSelector((state) => state.pagination.is_deleted);
  const toggle = useSelector((state) => state.parentfilter.toggle);
  const tog = useSelector((state) => state.pagination.toggle);
  const is_search = useSelector((state) => state.searchbar.is_search);
  const search_item = useSelector((state) => state.searchbar.search_item);
  const page_numb = useSelector((state) => state.pagination.page_numberb);
  const is_deletedb = useSelector((state) => state.pagination.is_deletedb);
  const togb = useSelector((state) => state.pagination.toggleb);
  const cm_value = useSelector((state) => state.datalist.cm_filter);

  const [data_ids, setdata_ids] = useState([]);
  const user = useSelector((state) => state.user.userdetails);
  const index_value = useSelector((state) => state.datalist.index_value);

  //for Salary Calculation
  const [month, setmonth] = useState("");

  // Shorting
  const data_length = useSelector((state) => state.pagination.data_length);
  const data_lengthb = useSelector((state) => state.pagination.data_lengthb);
  const [data1, setdata1] = useState(data);
  const [loader, setloader] = useState(false);
  const [order, setorder] = useState("ASC");

  // Multi Delete
  const select_all = useSelector((state) => state.datalist.select_all);
  const ids = useSelector((state) => state.datalist.ids);
  const select = useSelector((state) => state.datalist.select);
  const [toggle_name, settoggle_name] = useState("");
  const [togAll, settogAll] = useState(false);

  // For Modal
  const [show, setShow] = useState(false);
  const [model, setmodel] = useState(false);

  const handleCls = () => setShow(false);
  const handleShow = () => setShow(true);

  // Userd For Close Salary
  const handleClosed = () => {
    setmonth("");
    setIds([]);
    setmodel(false);
  };

  // Userd For Add Salary
  const handlePost = () => {
    send_salary();
    setmodel(false);
    dispatch(setSelectAll(false));
  };

  const handleDel = () => {
    dispatch(setDeleteId(true));
    setShow(false);
    dispatch(setSelectAll(false));
  };

  const handleDelete = () => {
    handleShow();
  };

  const handleClk = () => {
    dispatch(setSelect(false));
    dispatch(setSelectAll(!togAll));
    dispatch(setDeleteId(false));
    dispatch(setClose(false));
  };

  const sorting = (col) => {
    if (order === "DSC") { //this is for ASC
      const sorted = [...data].sort((a, b) => {
        if (typeof a[col] === 'number' && typeof b[col] === 'number') {
          return a[col] - b[col];
        } else {
          return String(a[col]).toLowerCase().localeCompare(String(b[col]).toLowerCase());
        }
      });
      setdata1(sorted);
      // setorder("DSC");
    }
    if (order === "ASC") { //this is for DSC
      const sorted = [...data].sort((a, b) => {
        if (typeof a[col] === 'number' && typeof b[col] === 'number') {
          return b[col] - a[col];
        } else {
          return String(b[col]).toLowerCase().localeCompare(String(a[col]).toLowerCase());
        }
      });
      setdata1(sorted);
      // setorder("ASC");
    }
  };

  useEffect(() => {
    if (index_value !== "") {
      sorting(index_value);
    }
  }, [index_value, order]);

  const sortFunc = (index) => {
    if (order === "ASC") {
      setorder("DSC");
    } else {
      setorder("ASC")
    }
    dispatch(setIndex(index));
    dispatch(setListToggle(true));
  };

  const [ShowLoader, setShowLoader] = useState(false);

  // const getdata = async () => {
  //   setShowLoader(true);
  //   try {
  //     const response = await axios.get(ServerAddress + path, {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //       params: body_data,
  //     });

  const getdata = async () => {
    setShowLoader(true);
    try {
      const response = await axios.get(ServerAddress + path, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Custom-Data": JSON.stringify(body_data), // Custom header
        },
      });
      const { results, count, previous, next } = response.data;
      let tempDataIds = [];
      if (id_type === "id") {
        tempDataIds = results.map((element) => element?.id);
      } else if (id_type === "challan_no") {
        tempDataIds = results.filter((val) => val.is_received).map((element) => element?.challan_no);
      }
      else if (id_type === "voucher_no") {
        tempDataIds = results.filter((val) => val.is_editable).map((element) => element?.id);
      }
      else {
        tempDataIds = results.map((element) => element.pan_no);
      }
      setShowLoader(false);
      setdata(results);
      dispatch(setTotalData(count));
      dispatch(setDataLoaded(true));
      dispatch(setPrev(previous));
      dispatch(setNext(next));
      setdata_ids(tempDataIds);
    } catch (err) {
      setShowLoader(false);
      console.warn(`Error Occurred in Get Data ${err}`);
    }
  };

  const getdatab = async () => {
    setShowLoader(true);

    try {
      const response = await axios.get(ServerAddress + pathb, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const { results, count, previous, next } = response.data;
      setShowLoader(false);
      setdatab(results);
      dispatch(setTotalDataB(count));
      dispatch(setPrevB(previous));
      dispatch(setNextB(next));
      dispatch(setDataLoaded(true));
    } catch (err) {
      setShowLoader(false);
      console.warn(`Error Occurred in Get Data ${err}`);
    }
  };

  const send_salary = () => {
    setloader(true);
    axios
      .post(
        ServerAddress + "ems/get_salary_details/",
        {
          ids: ids,
          month: month,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(function (response) {
        if (response.statusText === "Created") {
          setmonth("");
          setloader(false);
          dispatch(setShowAlert(true));
          dispatch(setAlertType("success"));
          dispatch(setIds([]));
          dispatch(setDataExist(`Data Added Successfully`));
        }
      })
      .catch((err) => {
        setloader(false);
        console.error(`send_salary err, ${err}`);
      });
  };

  const handleClose = () => {
    dispatch(setIds([]));
    dispatch(setSelectAll(false));
    dispatch(setSelect(false));
    dispatch(setClose(true));
  };

  useLayoutEffect(() => {
    if (path && !load_branchwise_data) {
      getdata();
    }
  }, [tog, page_num, toggle, search_item, is_deleted, cm_value, data_length]);

  useLayoutEffect(() => {
    if (path && load_branchwise_data) {
      getdata();
    }
  }, [tog, page_num, toggle, search_item, is_deleted, cm_value, data_length,]);

  useLayoutEffect(() => {
    if (pathb) {
      getdatab();
    }
  }, [togb, page_numb, toggle, search_item, is_deletedb, data_lengthb]);

  useEffect(() => {
    dispatch(setListToggle(false));
  }, [data_length, page_num, is_search, is_deleted]);

  useEffect(() => {
    dispatch(setIndex(""));
    dispatch(setIndexValue(""));
  }, []);

  useEffect(() => {
    if (select_all === true) {
      settoggle_name("check");
      dispatch(setIds(data_ids));
    } else if (select_all === false) {
      settoggle_name("notcheck");
      dispatch(setIds([]));
    }
  }, [select_all]);

  useEffect(() => {
    if (select === true && select_all === true) {
      settoggle_name("minus");
    }
  }, [select, select_all]);

  useEffect(() => {
    dispatch(setDeleteId(false));
    dispatch(setSelectAll(false));
    dispatch(setIds([]));
    dispatch(setClose(false));
  }, []);

  useEffect(() => {
    dispatch(setFilterA([]));
    dispatch(setFilterB([]));
    dispatch(setFilterC([]));
    dispatch(setFilterD([]));
    dispatch(setFilterE([]));
    dispatch(setFilterF([]));
    dispatch(setFilterG([]));
    dispatch(setFilterH([]));
    dispatch(setFilterI([]));
    dispatch(setFilterJ([]));
    dispatch(setFilterK([]));
    dispatch(setFilterL([]));
    dispatch(setFilterM([]));
    dispatch(setFilterN([]));
    dispatch(setFilterO([]));
    dispatch(setFilterP([]));
    dispatch(setIsSearch(false));
    dispatch(setSearchItem(""));
  }, []);

  return (
    <div style={{ borderWidth: 1, width: "" }}>
      <Modal show={show} onHide={handleCls}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "14px" }}>
          {ids.length} item {ids.length > 1 && "(s)"} on this page are selected.
          Do, you want to Delete these items ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCls}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDel()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Salary */}
      <Modal show={model} onHide={handleClosed}>
        <Modal.Header closeButton>
          <Modal.Title>Salary</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "14px" }}>
          <Col lg={4} md={6} sm={6}>
            <div className="mb-2">
              <Label className="header-child">
                Salary Month-Year <span className="mandatory">*</span>
              </Label>
              <Input
                value={month}
                type="month"
                className="form-control-md"
                name="month"
                placeholder="MM"
                onChange={(val) => {
                  setmonth(val.target.value);
                }}
              />
            </div>
          </Col>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            style={{ background: "#EE4B2B" }}
            onClick={handleClosed}
          >
            Close
          </Button>
          {!loader ? (
            <Button
              variant="contained"
              style={{ background: "#90EE90" }}
              onClick={() => handlePost()}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              style={{ background: "#90EE90" }}
              onClick={() => handlePost()}
              disabled={loader}
            >
              <Loader />
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {ids.length !== 0 && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              background: "white",
              borderRadius: "5px",
              marginBottom: "2px",
              height: "39px",
              border: "2px solid green",
              padding: "3px",
              width: "325px",
            }}
          >
            <p style={{ fontSize: "12px", color: "black", margin: "5px" }}>
              <span
                style={{ cursor: "pointer" }}
                className="delete-btn"
                onClick={() => handleDelete()}
              >
                <RiDeleteBin6Line style={{ fontSize: "18px" }} />
                <span style={{ marginLeft: "5px", fontWeight: "500" }}>
                  Delete
                </span>
              </span>
              <span>

                <span style={{ marginLeft: "15px", fontSize: "12px" }}>
                  {ids.length} Selected{" "}
                  <BsXLg
                    style={{
                      fontSize: "12px",
                      color: "red",
                      cursor: "pointer",
                      marginLeft: "17px",
                    }}
                    onClick={() => handleClose()}
                  />
                </span>
              </span>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "2px",
              background: "#DCEDFC",
              borderRadius: "5px",
              marginBottom: "2px",

              height: "39px",
              border: "1px solid #cde3f7",
              padding: "11px",
              width: "100%",
            }}
          >
            <p style={{ fontSize: "12px", color: "black", fontWeight: "500" }}>
              <span>
                {ids.length} item {ids.length > 1 && "(s)"} on this page are
                selected.
              </span>
            </p>
          </div>
        </div>
      )}

      <div
        className="fixTableHead scrollBarWidth"
        style={{ overflowY: "auto", maxHeight: "58.2vh", width: "" }}
      >
        <table
          className="topheader table-light"
          style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
        >
          <thead
            style={{
              position: "sticky",
              top: "0",
            }}
          >
            <tr style={{ lineHeight: 2, borderWidth: 1 }}>
              {checkbox === "" &&
                ((can_delete === true || user?.is_superuser) && delete_checkbox) && (
                  <th
                    style={{ position: "relative", textAlign: "left", cursor: "pointer" }}
                    onClick={() => settogAll(!togAll)}
                  >
                    <div onClick={() => handleClk()}>
                      {toggle_name === "check" ? (
                        <FiCheckSquare size={14} />
                      ) : toggle_name === "notcheck" ? (
                        <FiSquare size={14} />
                      ) : toggle_name === "minus" ? (
                        <FiMinusSquare size={14} />
                      ) : (
                        <FiSquare size={14} />
                      )}
                    </div>
                  </th>
                )}
              {myArr.map((item, index) => {
                return (
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      fontSize: "12.5px",
                    }}
                    key={index}
                  >
                    {item}{" "}
                    {checkbox === "" && order === "ASC" && (
                      <RiArrowUpDownLine
                        className="arrow"
                        onClick={() => sortFunc(index)}
                      />
                    )}

                    {checkbox === "" && order === "DSC" && (
                      <LuArrowDownUp
                        className="arrow"
                        onClick={() => sortFunc(index)}
                      />
                    )}

                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody style={{ textAlign: "left", fontSize: "12px",whiteSpace:"nowrap" }}>
            {ShowLoader ?
              <ColorLoader />
              : null}
            <Data_Format
              data={data}
              datab={datab}
              val_data={value}
              data1={data1}
              order_id={order_id}
              can_delete={can_delete}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataList;
