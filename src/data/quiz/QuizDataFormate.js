import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ServerAddress } from '../../server/ServerAddress';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { setIsDeleted, setToggle } from '../../redux/pagination/Pagination';
import { setClose, setDeleteId, setIds, setIndexValue, setSelect } from '../../redux/dataList/DataList';
import toTitleCase from '../../components/toTitleCase/toTitleCase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DateTimeConvertor from '../../components/dateConvertor/DateTimeConvertor';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DateConvertor from '../../components/dateConvertor/DateConvertor';

const QuizDataFormate = ({ data, data1, can_delete }) => {
  const dispatch = useDispatch();
  const user_detail = useSelector((state) => state.user.userdetails);
  const accessToken = useSelector((state) => state.user.access_token);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const index = useSelector((state) => state.datalist.index);
  const is_deleted = useSelector((state) => state.pagination.is_deleted);

  const [refresh, setRefresh] = useState(false);
  const ids = useSelector((state) => state.datalist.ids);
  const select_all = useSelector((state) => state.datalist.select_all);
  const delete_id = useSelector((state) => state.datalist.delete_id);
  const [selected, setSelected] = useState([]);

  // Smart Truncate + Tooltip Function
  const renderCell = (text, maxLength = 60, showTooltip = true) => {
    if (!text) return '-';
    const trimmed = String(text).trim();
    if (trimmed.length <= maxLength) {
      return toTitleCase(trimmed);
    }

    const truncated = trimmed.slice(0, maxLength) + '...';

    if (!showTooltip) {
      return toTitleCase(truncated);
    }

    return (
      <OverlayTrigger placement='top' overlay={<Tooltip>{toTitleCase(trimmed)}</Tooltip>}>
        <span style={{ cursor: 'pointer' }}>{toTitleCase(truncated)}</span>
      </OverlayTrigger>
    );
  };

  // Multi-select handler
  const handleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Delete selected items
  const delete_item_row = (idList) => {
    axios
      .post(
        ServerAddress + 'cards/delete_quiz_details/',
        { data: idList },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then((response) => {
        if (response.statusText === 'OK' || response.status === 200) {
          dispatch(setDeleteId(false));
          dispatch(setIds([]));
          dispatch(setSelect(false));
          setSelected([]);
          toast.success(`Quiz Deleted successfully !`, { position: 'top-center', autoClose: 2000 });
          setRefresh(!refresh);
          dispatch(setIsDeleted(!is_deleted));
        }
      })
      .catch((err) => {
        console.error('Delete Error:', err);
      });
  };

  // Sync selected with Redux
  useEffect(() => {
    dispatch(setIds(selected));
  }, [selected, dispatch]);

  useEffect(() => {
    if (select_all && ids.length > 0) {
      setSelected(ids);
    }
  }, [ids, select_all]);

  useEffect(() => {
    if (!select_all) {
      setSelected([]);
    }
  }, [select_all]);

  useEffect(() => {
    if (delete_id === true) {
      delete_item_row(ids);
    }
  }, [delete_id]);

  // Sorting index handler
  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue('quiz_name'));
    } else if (index === 1) {
      dispatch(setIndexValue('quiz_date'));
    } else if (index === 2) {
      dispatch(setIndexValue('age_grup'));
    } else if (index === 3) {
      dispatch(setIndexValue('created_at'));
    } else if (index === 4) {
      dispatch(setIndexValue('created_by'));
    }
  }, [index]);

  useEffect(() => {
    dispatch(setToggle(false));
    dispatch(setIsDeleted(false));
  }, [dispatch]);

  const currentData = list_toggle ? data1 : data;
  console.log("currentData--",currentData)

  return (
    <>
      <ToastContainer />
      {currentData?.length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        currentData.map((quiz, idx) => (
          <tr key={quiz.id} style={{ borderBottom: '1px solid #eee' }}>
            {/* Checkbox */}
            {(can_delete || user_detail?.is_superuser) && (
              <td
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => {
                  handleSelect(quiz.id);
                  dispatch(setSelect(true));
                }}>
                {selected.includes(quiz.id) ? <FiCheckSquare size={16} /> : <FiSquare size={16} />}
              </td>
            )}
            <td>
              <Link to='/quiz/add' state={{ data: quiz }}>
                {renderCell(quiz.quiz_name, 60)}
              </Link>
            </td>
            <td>{quiz.quiz_date ? <DateTimeConvertor inputDateTime={quiz.quiz_date} /> : '-'}</td>
            <td>{quiz.age_grup ? toTitleCase(quiz.age_grup) : '-'}</td>
            <td>{quiz.question ? (quiz.question).length : '-'}</td>
            <td>{quiz.total_time ? (quiz.total_time) : '-'}</td>
            <td>{quiz.created_at ? <DateTimeConvertor inputDateTime={quiz.created_at} /> : '-'}</td>
            <td>{renderCell(quiz.bkp_created_by, 25)}</td>
          </tr>
        ))
      )}
    </>
  );
};

export default QuizDataFormate;
