// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { ServerAddress } from '../../server/ServerAddress';
// import { FiCheckSquare, FiSquare } from 'react-icons/fi';
// import { Link, useNavigate } from 'react-router-dom';
// import { setIsDeleted, setToggle } from '../../redux/pagination/Pagination';
// import { setClose, setDeleteId, setIds, setIndexValue, setSelect } from '../../redux/dataList/DataList';
// import toTitleCase from '../../components/toTitleCase/toTitleCase';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { setAlertType, setDataExist, setShowAlert } from '../../redux/alert/Alert';
// import DateTimeConvertor from '../../components/dateConvertor/DateTimeConvertor';
// import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// const QuestionDataFormat = ({ data, data1, can_delete }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user_detail = useSelector((state) => state.user.userdetails);
//   const accessToken = useSelector((state) => state.user.access_token);
//   const data_len = useSelector((state) => state.pagination.data_length);
//   const page_num = useSelector((state) => state.pagination.page_number);
//   const list_toggle = useSelector((state) => state.datalist.list_toggle);
//   const index = useSelector((state) => state.datalist.index);
//   const is_deleted = useSelector((state) => state.pagination.is_deleted);

//   const [refresh, setrefresh] = useState(false);
//   //Multi Delete function
//   const ids = useSelector((state) => state.datalist.ids);
//   const select_all = useSelector((state) => state.datalist.select_all);
//   const delete_id = useSelector((state) => state.datalist.delete_id);
//   const [selected, setselected] = useState([]);

//   const handlefunn = (id) => {
//     if (selected.includes(id)) {
//       let lis = [...selected];
//       setselected(lis.filter((e) => e !== id));
//     } else {
//       setselected([...selected, id]);
//     }
//   };

//   const delete_item_row = (id) => {
//     alert(id);
//     axios
//       .post(
//         ServerAddress + 'cards/delete_question_details/',
//         {
//           data: id
//         }
//         // {
//         //   headers: {
//         //     Authorization: `Bearer ${accessToken}`
//         //   }
//         // }
//       )
//       .then(function (response) {
//         if (response.statusText === 'OK') {
//           dispatch(setDeleteId(false));
//           dispatch(setIds([]));
//           dispatch(setSelect(false));
//           setselected([]);
//           dispatch(setShowAlert(true));
//           dispatch(setDataExist(`Data Deleted Sucessfully`));
//           dispatch(setAlertType('danger'));
//           setrefresh(!refresh);
//           dispatch(setIsDeleted(!is_deleted));
//           // dispatch(setToggle(true));
//         }
//       })
//       .catch((err) => {
//         console.error(`Error While delete Item ${err}`);
//       });
//   };

//   useEffect(() => {
//     dispatch(setToggle(false));
//     dispatch(setIsDeleted(false));
//   }, []);

//   useEffect(() => {
//     dispatch(setIds(selected));
//   }, [selected]);
//   useEffect(() => {
//     if (ids !== '' && select_all === true) {
//       setselected(ids);
//     }
//   }, [ids]);
//   useEffect(() => {
//     if (select_all === false) {
//       setselected([]);
//     }
//   }, [select_all]);
//   useEffect(() => {
//     if (delete_id === true) {
//       delete_item_row(ids);
//     }
//   }, [delete_id]);

//   //For Shorting

//   useEffect(() => {
//     if (index === 0) {
//       dispatch(setIndexValue('id'));
//     } else if (index === 1) {
//       dispatch(setIndexValue('question'));
//     } else if (index === 2) {
//       dispatch(setIndexValue('option1'));
//     } else if (index === 3) {
//       dispatch(setIndexValue('option2'));
//     } else if (index === 4) {
//       dispatch(setIndexValue('option3'));
//     } else if (index === 5) {
//       dispatch(setIndexValue('option4'));
//     } else if (index === 6) {
//       dispatch(setIndexValue('answare'));
//     } else if (index === 7) {
//       dispatch(setIndexValue('age_grup'));
//     } else if (index === 8) {
//       dispatch(setIndexValue('created_at'));
//     } else if (index === 9) {
//       dispatch(setIndexValue('created_by'));
//     }
//   }, [index]);

//   // Function to truncate to characters
//   const truncateData = (data, maxLength = 60) => {
//     if (!data) return '';
//     return data.length > maxLength ? `${data.slice(0, maxLength)}...` : data;
//   };
//   // Check if Data is truncated
//   const isDataTruncated = (data) => {
//     return data && data.length > 60;
//   };
//   return (
//     <>
//       <ToastContainer />
//       {(list_toggle === true ? data1 : data)?.length === 0 ? (
//         <tr>
//           <td colSpan={9} style={{ textAlign: 'left' }}>
//             No Data Found
//           </td>
//         </tr>
//       ) : (
//         (list_toggle === true ? data1 : data).map((qun, index) => {
//           // <ToastContainer />;
//           return (
//             <tr key={index} style={{ borderWidth: 1 }}>
//               {(can_delete || user_detail?.is_superuser) && (
//                 <td
//                   className='selection-cell'
//                   onClick={() => {
//                     handlefunn(qun.id);
//                     dispatch(setSelect(true));
//                   }}>
//                   {selected.includes(qun.id) ? <FiCheckSquare size={14} /> : <FiSquare size={14} />}
//                 </td>
//               )}
//               {/* <td>{page_num == 1 ? index + 1 : index + 1 + data_len * (page_num - 1)}</td> */}
//               <td>
//                 <Link to='/quiz/add/question' state={{ data: qun }}>
//                   {qun.question ? qun.question : '-'}
//                 </Link>
//               </td>
//               <td>
//                 {qun?.option1 ? (
//                   isDataTruncated(qun.option1) ? (
//                     <OverlayTrigger placement='top' overlay={<Tooltip id={`tooltip-${index}`}>{toTitleCase(qun.option1)}</Tooltip>}>
//                       <span style={{ cursor: 'pointer' }}>{toTitleCase(truncateData(qun.option1))}</span>
//                     </OverlayTrigger>
//                   ) : (
//                     toTitleCase(qun.option1)
//                   )
//                 ) : (
//                   ' '
//                 )}
//               </td>
//               <td>{qun.option2 ? qun.option2 : '-'}</td>
//               <td>{qun.option3 ? qun.option3 : '-'}</td>
//               <td>{qun.option4 ? qun.option4 : '-'}</td>
//               <td>{qun.answare ? qun.answare : '-'}</td>
//               <td>{qun.age_grup ? qun.age_grup : '-'}</td>
//               <td>{qun.created_at ? <DateTimeConvertor inputDateTime={qun.created_at} /> : '-'}</td>
//               <td>{qun.created_by ? qun.created_by : '-'}</td>
//             </tr>
//           );
//         })
//       )}
//     </>
//   );
// };

// export default QuestionDataFormat;

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
      .post(ServerAddress + 'cards/delete_question_details/', { data: idList })
      .then((response) => {
        if (response.statusText === 'OK' || response.status === 200) {
          dispatch(setDeleteId(false));
          dispatch(setIds([]));
          dispatch(setSelect(false));
          setSelected([]);
          toast.success(`Question Deleted successfully !`, { position: 'top-center', autoClose: 2000 });
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
    const fields = ['id', 'question', 'option1', 'option2', 'option3', 'option4', 'answare', 'age_grup', 'created_at', 'created_by'];
    dispatch(setIndexValue(fields[index] || 'id'));
  }, [index, dispatch]);

  useEffect(() => {
    dispatch(setToggle(false));
    dispatch(setIsDeleted(false));
  }, [dispatch]);

  const currentData = list_toggle ? data1 : data;

  return (
    <>
      <ToastContainer />
      {currentData?.length === 0 ? (
        <tr>
          <td>
            No Data Found
          </td>
        </tr>
      ) : (
        currentData.map((qun, idx) => (
          <tr key={qun.id} style={{ borderBottom: '1px solid #eee' }}>
            {/* Checkbox */}
            {(can_delete || user_detail?.is_superuser) && (
              <td
                style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => {
                  handleSelect(qun.id);
                  dispatch(setSelect(true));
                }}>
                {selected.includes(qun.id) ? <FiCheckSquare size={16} /> : <FiSquare size={16} />}
              </td>
            )}
            <td>
              <Link to='/quiz/add/question' state={{ data: qun }}>
                {renderCell(qun.question, 60)}
              </Link>
            </td>
            <td>{renderCell(qun.option1, 30)}</td>
            <td>{renderCell(qun.option2, 30)}</td>
            <td>{renderCell(qun.option3, 30)}</td>
            <td>{renderCell(qun.option4, 30)}</td>
            <td>{renderCell(qun.answare, 25)}</td>
            <td>{qun.time ? qun.time : '-'}</td>
            <td>{qun.age_grup ? toTitleCase(qun.age_grup) : '-'}</td>
            <td>{qun.created_at ? <DateTimeConvertor inputDateTime={qun.created_at} /> : '-'}</td>
            <td>{renderCell(qun.created_by, 25)}</td>
          </tr>
        ))
      )}
    </>
  );
};

export default QuestionDataFormat;
