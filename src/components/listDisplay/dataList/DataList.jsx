import React, { useLayoutEffect } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
// import JSZip from "jszip";
import { ServerAddress } from "../../../server/ServerAddress";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdDownload } from "react-icons/io";
import { BsXLg } from "react-icons/bs";
import { FiSquare, FiCheckSquare, FiMinusSquare } from "react-icons/fi";
import { RiArrowUpDownLine } from "react-icons/ri";
 
import {
  setDataLength,
  setDataLoaded,
  setNext,
  setNextB,
  setPrev,
  setPrevB,
  setTotalData,
  setTotalDataB,
} from "../../../redux/pagination/Pagination"; 
import { setClose,
  setDeleteId,
  setIds,
  setIndex,
  setIndexValue,
  setListToggle,
  setSelect,
  setSelectAll, } from "../../../redux/dataList/DataList";
import { Modal, Button } from "react-bootstrap"; 
import { setFilterA,
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
  setFilterM, } from "../../../redux/filterValue/FilterValue";
import Loader from "../../loader/Loader";
// import { setAlertType, setDataExist, setShowAlert } from "../../../store/alert/Alert";
// import { setSearchItem } from "../../../store/searchBar/SearchBar";
import { setSearchItem } from "../../../redux/searchBar/SearchBar";

const DataList = ({
  Data_Title,
  Data_Format,
  path,
  pathb,
  value,
  order_id = "",
  checkbox = "",
  can_delete,
  setstatus_data,
  is_update = false,
  data_sort = false
}) => {
  const [data_title, setdata_title] = useState(Data_Title);

  const myArr = JSON.parse(JSON.stringify(data_title));

  // Additional Field
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.user.access_token);
  const [data, setdata] = useState([]);
  const [datab, setdatab] = useState([]);
  const data_length = useSelector((state) => state.pagination.data_length);
  const data_lengthb = useSelector((state) => state.pagination.data_lengthb);
  const page_num = useSelector((state) => state.pagination.page_number);
  const is_deleted = useSelector((state) => state.pagination.is_deleted);
  const toggle = useSelector((state) => state.parentfilter.toggle);
  const tog = useSelector((state) => state.pagination.toggle);
  const is_search = useSelector((state) => state.searchbar.is_search);
  const search = useSelector((state) => state.searchbar.search_item);
  const next = useSelector((state) => state.pagination.next);
  const prev = useSelector((state) => state.pagination.prev);
  const page_numb = useSelector((state) => state.pagination.page_numberb);
  const is_deletedb = useSelector((state) => state.pagination.is_deletedb);
  const nextb = useSelector((state) => state.pagination.nextb);
  const prevb = useSelector((state) => state.pagination.prevb);
  const togb = useSelector((state) => state.pagination.toggleb);
  const cm_value = useSelector((state) => state.datalist.cm_filter);

  const [isLoading, setIsLoading] = useState(false);

  const [data_ids, setdata_ids] = useState([]);
  const [img_array, setimg_array] = useState([]);
  // const user = useSelector((state) => state.authentication.userdetails);
  const index_value = useSelector((state) => state.datalist.index_value);

  const getdata = async () => {
    try {
      const response = await axios.get(ServerAddress + path, {
        // headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("DataListResponse==",response)
      const { results, count, previous, next } = response.data;

      const tempDataIds = results.map((element) => element.id);
      // if (is_update) {
      //   const imgData = results
      //     .map((element) =>
      //       element.delivery_image.map((imageObj) => [
      //         imageObj.image,
      //         element.docket_no,
      //         element.id,
      //       ]),
      //     )
      //     .filter((array) => array.length > 0)
      //     .flat();
      //   setimg_array(imgData);
      // }
      setdata(results);
      dispatch(setTotalData(count));
      dispatch(setDataLoaded(true));
      dispatch(setPrev(previous));
      dispatch(setNext(next));
      setdata_ids(tempDataIds);
      dispatch(setSearchItem(""));
    } catch (err) {
      console.warn(`Error Occurred in Get Data ${err}`);
    }
  };

  const getdatab = async () => {
    try {
      const response = await axios.get(ServerAddress + pathb, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const { results, count, previous, next } = response.data;

      setdatab(results);
      dispatch(setTotalDataB(count));
      dispatch(setPrevB(previous));
      dispatch(setNextB(next));
      dispatch(setDataLoaded(true));
    } catch (err) {
      console.warn(`Error Occurred in Get Data ${err}`);
    }
  };

  useLayoutEffect(() => {
    if (path) {
      getdata();
    }
    // }, [tog, page_num, toggle, is_search, is_deleted, cm_value, data_length,search]);
  }, [tog, page_num, toggle, is_search, is_deleted, cm_value, data_length]);
  // }, [tog, page_num, toggle, is_search, is_deleted, prev, next, cm_value]);

  useLayoutEffect(() => {
    if (pathb) {
      getdatab();
    }
  }, [togb, page_numb, toggle, is_search, is_deletedb, data_lengthb]);
  // }, [togb, page_numb, toggle, is_search, is_deletedb, prevb, nextb]);

  // ------------Shorting---------------
  const [data1, setdata1] = useState(data);

  const [order, setorder] = useState("ASC");
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        // String(a[col]).toLowerCase() > String(b[col]).toLowerCase() ? 1 : -1,
        (a[col]) > (b[col]) ? 1 : -1,
      );
      setdata1(sorted);
      setorder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        // String(a[col]).toLowerCase() < String(b[col]).toLowerCase() ? 1 : -1,
        (a[col]) < (b[col]) ? 1 : -1,
      );
      setdata1(sorted);
      setorder("ASC");
    }
  };

  const sortFunc = (index) => {
    dispatch(setIndex(index));
    sorting(index_value);
    dispatch(setListToggle(true));
  };

  useEffect(() => {
    dispatch(setListToggle(false));
  }, [data_length, page_num, is_search, is_deleted]);

  useEffect(() => {
    dispatch(setIndex(""));
    dispatch(setIndexValue(""));
  }, []);

  // ---------Multi Delete---------------
  const select_all = useSelector((state) => state.datalist.select_all);
  const ids = useSelector((state) => state.datalist.ids);
  const [type, settype] = useState("");
  const handleDelete = (type) => {
    settype(type);
    handleShow();
  };

  const select = useSelector((state) => state.datalist.select);
  const [toggle_name, settoggle_name] = useState("");
  const [togAll, settogAll] = useState(false);
  const handleClk = () => {
    dispatch(setSelect(false));
    dispatch(setSelectAll(!togAll));
    dispatch(setDeleteId(false));
    dispatch(setClose(false));
  };

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

  const handleClose = () => {
    dispatch(setIds([]));
    dispatch(setSelectAll(false));
    dispatch(setSelect(false));
    dispatch(setClose(true));
  };
  useEffect(() => {
    dispatch(setDeleteId(false));
    dispatch(setSelectAll(false));
    dispatch(setIds([]));
    dispatch(setClose(false));
  }, []);

  //-------------For Modal----------------
  const [show, setShow] = useState(false);

  const handleCls = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDel = () => {
    dispatch(setDeleteId(true));
    setShow(false);
    dispatch(setSelectAll(false));
  };

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
  }, []);

  const [image_value, setimage_value] = useState([]);

  useEffect(() => {
    if (img_array.length > 0) {
      let arrays = img_array.filter((v) => ids.includes(v[2]));
      setimage_value(arrays);
    }
  }, [ids]);

  // const fetchAndDownloadImages = async () => {
  //   setIsLoading(true);
  //   try {
  //     if (image_value.length > 0) {
  //       const zip = new JSZip();
  //       for (let i = 0; i < image_value.length; i++) {
  //         const response = await axios.get(image_value[i][0] + "?cacheblock=true", {
  //           responseType: "arraybuffer", // Ensure the response is treated as binary data
  //         });

  //         if (response.status === 200) {
  //           setIsLoading(false);
  //           const imageArrayBuffer = response.data;

  //           // Convert the array buffer to a blob
  //           const imageBlob = new Blob([imageArrayBuffer], {
  //             type: "image/jpeg",
  //           });

  //           // Add the image to the ZIP archive with a unique name
  //           zip.file(`Docket_No_${i}_${image_value[i][1]}.jpg`, imageBlob);
  //         } else {
  //           setIsLoading(false);
  //           console.error(`Failed to retrieve image ${i + 1} from S3.`);
  //         }
  //       }
  //       // Generate a Blob containing the ZIP archive
  //       const zipBlob = await zip.generateAsync({ type: "blob" });

  //       // Create a download link for the ZIP file
  //       const downloadLink = document.createElement("a");
  //       downloadLink.href = URL.createObjectURL(zipBlob);
  //       downloadLink.download = "images.zip";

  //       // Trigger the download
  //       downloadLink.click();
  //       dispatch(setIds([]));
  //       dispatch(setSelect(false));
  //       dispatch(setClose(true));
  //       setShow(false);
  //       dispatch(setSelectAll(false));
  //     } else {
  //       setIsLoading(false);
  //       dispatch(setIds([]));
  //       setShow(false);
  //       alert("POD Image Doesn't Exist");
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     dispatch(setDataExist(`Error fetching or creating the ZIP archive:, ${error}`));
  //     dispatch(setAlertType("warning"));
  //     dispatch(setShowAlert(true));
  //     dispatch(setIds([]));
  //     dispatch(setSelect(false));
  //     dispatch(setClose(true));
  //     setShow(false);
  //     dispatch(setSelectAll(false));
  //     console.error("Error fetching or creating the ZIP archive:", error);
  //   }
  // };
  return (
    <div style={{ borderWidth: 1, width: "" }}>
      <Modal show={show} onHide={handleCls}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "14px" }}>
          {ids.length} item {ids.length > 1 && "(s)"} on this page are selected.
          Do, you want to {type === "Download" ? "Download" : "Delete"} these
          items ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCls}>
            Close
          </Button>
          {type === "Download" ? (

            <Button variant="success" onClick={() => {
              // if (!isLoading) {
              //   fetchAndDownloadImages()
              // }
            }
            }>
              {!isLoading ? "Download" : <Loader />}
            </Button>
          ) : (
            <Button variant="danger" onClick={() => handleDel()}>
              Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {ids.length !== 0 && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {is_update && (
            <div
              style={{
                background: "white",
                borderRadius: "5px",
                marginBottom: "2px",
                height: "39px",
                border: "2px solid green",
                padding: "3px",
                width: "100%",
                maxWidth: "136px", // Adjust the maximum width as needed
                flex: "1", // Make it flexible to adjust to the available space
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "black",
                  margin: "5px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{ cursor: "pointer" }}
                  className="download-btn"
                  onClick={() => handleDelete("Download")}
                >
                  <IoMdDownload style={{ fontSize: "18px" }} />
                  <span style={{ marginLeft: "5px", fontWeight: "500" }}>
                    Download
                  </span>
                </span>
              </p>
            </div>
          )}

          <div
            style={{
              background: "white",
              borderRadius: "5px",
              marginBottom: "2px",
              height: "39px",
              border: "2px solid green",
              padding: "3px",
              width: "100%",
              maxWidth: "286px", // Adjust the maximum width as needed
              flex: "1", // Make it flexible to adjust to the available space
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "black",
                margin: "5px",
                textAlign: "center",
              }}
            >
              <span
                style={{ cursor: "pointer" }}
                className="delete-btn"
                onClick={() => handleDelete("Delete")}
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
                      marginLeft: "35px",
                    }}
                    onClick={() => handleClose()}
                  />
                </span>
              </span>
            </p>
          </div>

          <div
            style={{
              background: "#DCEDFC",
              borderRadius: "5px",
              marginBottom: "2px",
              height: "39px",
              border: "1px solid #cde3f7",
              padding: "11px",
              width: "100%",
              flex: "1",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "black",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              <span>
                {ids.length} item {ids.length > 1 ? "(s)" : ""} on this page are
                selected.
              </span>
            </p>
          </div>
        </div>
      )}

      <div
        className="fixTableHead"
        style={{ overflowY: "auto", maxHeight: "70vh", width: "" }}
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
              {/* {checkbox === "" &&
                (can_delete === true || user.is_superuser) && (
                  <th
                    style={{ position: "relative", textAlign: "center" }}
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
                )} */}
              {myArr.map((item, index) => {
                return (
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      fontSize: "12.5px",
                    }}
                    key={index}
                  >
                    <div className="tw-flex tw-items-center tw-justify-center">
                      {item}
                      {data_sort && (
                        <RiArrowUpDownLine
                          className="tw-ml-2 tw-cursor-pointer tw-transition-colors tw-duration-300 tw-ease-in-out hover:tw-text-blue-500"
                          onClick={() => sortFunc(index)}
                        />
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody style={{ fontSize: "12px", textAlign: "left" }}>
            <Data_Format
              data={data}
              img_array={img_array}
              datab={datab}
              val_data={value}
              data1={data1}
              order_id={order_id}
              can_delete={can_delete}
              setstatus_data={setstatus_data}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataList;
