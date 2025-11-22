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

const UserDataFormate = ({ data, data1, can_delete }) => {
  const dispatch = useDispatch();
  const user_detail = useSelector((state) => state.user.userdetails);
  const accessToken = useSelector((state) => state.user.access_token);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const index = useSelector((state) => state.datalist.index);
  const is_deleted = useSelector((state) => state.pagination.is_deleted);

  const [refresh, setrefresh] = useState(false);
  const ids = useSelector((state) => state.datalist.ids);
  const select_all = useSelector((state) => state.datalist.select_all);
  const delete_id = useSelector((state) => state.datalist.delete_id);
  const close = useSelector((state) => state.datalist.close);
  const [selected, setselected] = useState([]);

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
  const handlefunn = (id) => {
    const item = (list_toggle === true ? data1 : data).find((i) => i.id === id);
    if (item.is_superuser) return; // Skip if item is not selectable
    if (selected.includes(id)) {
      setselected(selected.filter((e) => e !== id));
    } else {
      setselected([...selected, id]);
    }
  };

  // Delete selected items
  const delete_item_row = (idList) => {
    axios
      .post(
        ServerAddress + 'ems/delete_user_details/',
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
          setselected([]);
          toast.success(`User Deleted successfully !`, { position: 'top-center', autoClose: 2000 });
          setrefresh(!refresh);
          dispatch(setIsDeleted(!is_deleted));
        }
      })
      .catch((err) => {
        console.error('Delete Error:', err);
      });
  };

  useEffect(() => {
    dispatch(setIds(selected));
  }, [selected]);

  useEffect(() => {
    if (select_all === true) {
      const selectableIds = (list_toggle === true ? data1 : data).filter((item) => !item.is_superuser).map((item) => item.id);
      setselected(selectableIds);
    }
  }, [select_all, data, data1, list_toggle]);

  useEffect(() => {
    if (select_all === false) {
      setselected([]);
    }
  }, [select_all]);

  useEffect(() => {
    if (close === true) {
      setselected([]);
    }
  }, [close]);

  useEffect(() => {
    if (delete_id === true) {
      delete_item_row(ids);
    }
  }, [delete_id,ids]);

  useEffect(() => {
    dispatch(setToggle(false));
    dispatch(setIsDeleted(false));
  }, [dispatch]);

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
    }
  }, [index]);

  

  const currentData = list_toggle ? data1 : data;

  return (
    <>
      <ToastContainer />
      {currentData?.length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        currentData.map((quiz, idx) => (
          <tr key={quiz.id} style={{borderWidth: 1,}}>
            {/* Checkbox */}
            {(can_delete || user_detail?.is_superuser) && (
              <td
                style={quiz.is_superuser ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
                onClick={() => {
                  handlefunn(quiz.id);
                  dispatch(setSelect(true));
                  dispatch(setDeleteId(false));
                  dispatch(setClose(false)); 
                }}>
                {!quiz.is_superuser ? selected.includes(quiz.id) ? <FiCheckSquare size={14} /> : <FiSquare size={14} /> : <FiSquare size={14} color='gray' title='Selection Disabled' />}
              </td>
            )}
            <td>
              <Link to='/add/user' state={{ data: quiz }}>
                {renderCell(quiz.fullname, 60)}
              </Link>
            </td>
            <td>{quiz.usertype ? toTitleCase(quiz.usertype) : '-'}</td>
            <td>{quiz.email ? quiz.email : '-'}</td>
            <td>{quiz.mobilenumber ? quiz.mobilenumber : '-'}</td>
            <td>{quiz.school_name ? toTitleCase(quiz.school_name) : '-'}</td>
            <td>{quiz.dob ? <DateConvertor inputDate={quiz.dob} /> : '-'}</td>
            <td>{quiz.is_active ? 'Yes' : 'No'}</td>
            <td>{quiz.is_approved ? 'Yes' : 'No'}</td>
            <td>{quiz.is_first_quiz ? 'Yes' : 'No'}</td>
            <td>{quiz.is_first_show ? 'Yes' : 'No'}</td>
            <td>{quiz.created_at ? <DateTimeConvertor inputDateTime={quiz.created_at} /> : '-'}</td>
            <td>{renderCell(quiz.created_by, 25)}</td>
          </tr>
        ))
      )}
    </>
  );
};

export default UserDataFormate;
