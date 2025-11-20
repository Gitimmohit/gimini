import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ServerAddress } from "../../server/ServerAddress";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { setIsDeleted, setToggle } from "../../redux/pagination/Pagination";
import {
  setClose,
  setDeleteId,
  setIds,
  setIndexValue,
  setSelect,
} from "../../redux/dataList/DataList";
import toTitleCase from "../../components/toTitleCase/toTitleCase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const QuestionDataFormat = ({ data, data1, can_delete }) => {
  const user_detail = useSelector((state) => state.user.userdetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("id"));
    } else if (index === 1) {
      dispatch(setIndexValue("is_ban"));
    } else if (index === 2) {
      dispatch(setIndexValue("form_submission_count"));
    } else if (index === 3) {
      dispatch(setIndexValue("firstname"));
    } else if (index === 4) {
      dispatch(setIndexValue("mobilenumber"));
    } else if (index === 5) {
      dispatch(setIndexValue("caller_name"));
    } else if (index === 6) {
      dispatch(setIndexValue("signature_date"));
    } else if (index === 7) {
      dispatch(setIndexValue("agreement_file"));
    } else if (index === 8) {
      dispatch(setIndexValue("signature"));
    } else if (index === 9) {
      dispatch(setIndexValue("signature_date"));
    } else if (index === 10) {
      dispatch(setIndexValue("id"));
    }
  }, [index]);
  return (
    <>
      <ToastContainer />
      {(list_toggle === true ? data1 : data)?.length === 0 ? (
        <tr>
          <td colSpan={13} style={{ textAlign: "left" }}>
            No Data Found
          </td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((qun, index) => {
          // <ToastContainer />; 
          return (
            <tr key={index} style={{ borderWidth: 1, }}>
              <td>{page_num == 1 ? index + 1 : index + 1 + data_len * (page_num - 1)}</td>
              <td>
                <Link to="/quiz/add/question" state={{ data: qun }}>{qun.question ? qun.question : "-"}</Link>
              </td>
              <td>{qun.option1 ? qun.option1 : "-"}</td>
              <td>{qun.option2 ? qun.option2 : "-"}</td>
              <td>{qun.option3 ? qun.option3 : "-"}</td>
              <td>{qun.option4 ? qun.option4 : "-"}</td>
              <td>{qun.answare ? qun.answare : "-"}</td>
              <td>{qun.age_grup ? qun.age_grup : "-"}</td>
              <td>{qun.created_at ? qun.created_at : "-"}</td>
              <td>{qun.created_by ? qun.created_by : "-"}</td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default QuestionDataFormat