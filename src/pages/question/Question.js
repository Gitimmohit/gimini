import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import PageTitle from '../../components/common/pagetitle/PageTitle';
import SearchList from '../../components/listDisplay/searchList/SearchList';
import NavBtn from '../../components/btn/NavBtn';
import NumPagination from '../../components/listDisplay/numPagination/NumPagination';
import DataList from '../../components/listDisplay/dataList/DataList';
import { setToggle } from '../../redux/parentFilter/ParentFilter';
import QuestionDataTitle from '../../data/question/QuestionDataTitle';
import QuestionDataFormat from '../../data/question/QuestionDataFormat';
import Filter from '../../components/listDisplay/filter/Filter';
import Title from '../../components/common/title/Title';
// import Title from "../../components/title/Title";

const Question = () => {
  const dispatch = useDispatch();
  const is_ban = useSelector((state) => state.filtervalue.data_a);
  const filter_by = useSelector((state) => state.filtervalue.data_b);
  const caller_name = useSelector((state) => state.filtervalue.data_c);

  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  return (
    <>
      <PageTitle page='Quiz Question' />
      <Title title={'Quiz Question'} parent_title={'Question'} />
      <div className='mx-1'>
        <div className='container-fluid ' style={{ background: 'white' }}>
          <div className='mb-2 row '>
            <div className='col-sm-4'>{<SearchList />}</div>
            <div className='col-sm-8'>
              <div className='text-sm-end'>
                <NavBtn btn_name='Add Question' icon={<MdAdd size={15} />} form_path='/quiz/add/question' />
                {/* Filter Tool */}
                {/* <Filter type={"inviteuser"} /> */}
              </div>
            </div>
          </div>

          {/* DataTable */}
          <DataList can_delete={true} Data_Title={QuestionDataTitle} Data_Format={QuestionDataFormat} path={`cards/get_question_details/?search=${search}&p=${page_num}&records=${data_len}`} />
          <NumPagination path={'path'} />
        </div>
      </div>
    </>
  );
};
export default Question;
