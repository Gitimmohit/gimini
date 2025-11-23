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

const QuestionDataFormat = ({ data, data1, can_delete }) => {
  const dispatch = useDispatch();
  const user_detail = useSelector((state) => state.user.userdetails);
  const accessToken = useSelector((state) => state.user.access_token);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const index = useSelector((state) => state.datalist.index);
  const is_deleted = useSelector((state) => state.pagination.is_deleted);
  const ids = useSelector((state) => state.datalist.ids);
  const select_all = useSelector((state) => state.datalist.select_all);
  const delete_id = useSelector((state) => state.datalist.delete_id);
  const close = useSelector((state) => state.datalist.close);
  const [selected, setselected] = useState([]);
  const [refresh, setrefresh] = useState(false);

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
    if (selected.includes(id)) {
      let lis = [...selected];
      setselected(lis.filter((e) => e !== id));
    } else {
      setselected([...selected, id]);
    }
  };

  // Delete selected items
  const delete_item_row = (idList) => {
    axios
      .post(
        ServerAddress + 'cards/delete_question_details/',
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
          toast.success(`Question Deleted successfully !`, { position: 'top-center', autoClose: 2000 });
          setrefresh(!refresh);
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
      setselected(ids);
    }
  }, [ids, select_all]);

  useEffect(() => {
    if (!select_all) {
      setselected([]);
    }
  }, [select_all]);

  useEffect(() => {
    if (delete_id === true) {
      delete_item_row(ids);
    }
  }, [delete_id]);

  useEffect(() => {
    if (close === true) {
      setselected([]);
    }
  }, [close]);

  useEffect(() => {
    dispatch(setToggle(false));
    dispatch(setIsDeleted(false));
  }, [dispatch]);

  // Sorting index handler
  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue('question'));
    } else if (index === 1) {
      dispatch(setIndexValue('option1'));
    } else if (index === 2) {
      dispatch(setIndexValue('option2'));
    } else if (index === 3) {
      dispatch(setIndexValue('option3'));
    } else if (index === 4) {
      dispatch(setIndexValue('option4'));
    } else if (index === 5) {
      dispatch(setIndexValue('answare'));
    } else if (index === 6) {
      dispatch(setIndexValue('age_grup'));
    } else if (index === 7) {
      dispatch(setIndexValue('created_at'));
    } else if (index === 8) {
      dispatch(setIndexValue('created_by'));
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
        currentData.map((qun, idx) => (
          <tr key={qun.id} style={{borderWidth: 1,}}>
            {/* Checkbox */}
            {(can_delete || user_detail?.is_superuser) && (
              <td
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => {
                  handlefunn(qun.id);
                  dispatch(setSelect(true));
                  dispatch(setDeleteId(false));
                  dispatch(setClose(false));
                }}>
                {selected.includes(qun.id) ? <FiCheckSquare size={14} /> : <FiSquare size={14} />}
              </td>
            )}
            <td style={{ textAlign: 'left'}}>
              <Link to='/quiz/add/question' state={{ data: qun }}>
                {renderCell(qun.question, 50)}
              </Link>
            </td>
            <td style={{ textAlign: 'left'}}>{renderCell(qun.option1, 30)}</td>
            <td style={{ textAlign: 'left'}}>{renderCell(qun.option2, 30)}</td>
            <td style={{ textAlign: 'left'}}>{renderCell(qun.option3, 30)}</td>
            <td style={{ textAlign: 'left'}}>{renderCell(qun.option4, 30)}</td>
            <td style={{ textAlign: 'left'}}>{renderCell(qun.answare, 25)}</td>
            <td style={{ textAlign: 'left'}}>{qun.time ? qun.time : '-'}</td>
            <td style={{ textAlign: 'left'}}>{qun.age_grup ? toTitleCase(qun.age_grup) : '-'}</td>
            <td style={{ textAlign: 'left'}}>{qun.created_at ? <DateTimeConvertor inputDateTime={qun.created_at} /> : '-'}</td>
            <td style={{ textAlign: 'left'}}>{renderCell(qun.bkp_created_by, 25)}</td>
          </tr>
        ))
      )}
    </>
  );
};

export default QuestionDataFormat;
