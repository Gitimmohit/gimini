import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../components/common/pagetitle/PageTitle";
import SearchList from "../../components/listDisplay/searchList/SearchList";
import NavBtn from "../../components/btn/NavBtn";
import NumPagination from "../../components/listDisplay/numPagination/NumPagination";
import DataList from "../../components/listDisplay/dataList/DataList";
import { setToggle } from "../../redux/parentFilter/ParentFilter";
import QuestionDataTitle from "../../data/question/QuestionDataTitle";
import QuestionDataFormat from "../../data/question/QuestionDataFormat";
import Filter from "../../components/listDisplay/filter/Filter";
import Title from "../../components/common/title/Title";
import TransactionDataTitle from "../../data/transaction/TransactionDataTitle";
import TransactionDataFormate from "../../data/transaction/TransactionDataFormate";
import AmountDataFormate from "../../data/amount/AmountDataFormate";
import AmountDataTitle from "../../data/amount/AmountDataTitle";

const Amount = () => {
  const dispatch = useDispatch();
  // Additional Fields
  const data_len = useSelector((state) => state.pagination.data_length);
  const page_num = useSelector((state) => state.pagination.page_number);
  const search = useSelector((state) => state.searchbar.search_item);

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  return (
    <>
      <div className="main-cont">
        <PageTitle page="Transaction" />
        <Title title={"Transaction"} parent_title={"Transaction"} />
        <div className="mx-1">
          <div className="container-fluid " style={{ background: "white" }}>
            <div
              className="mb-2 row "
              style={{ textAlign: "left" }}
            >
              <div className="col-sm-4">{<SearchList />}</div>
              <div className="col-sm-8">
                <div className="text-sm-end">
                  
                  {/* Filter Tool */}
                  {/* <Filter type={"question"} /> */}
                </div>
              </div>
            </div>

            {/* DataTable */}
            <DataList
              can_delete={false}
              Data_Title={AmountDataTitle}
              Data_Format={AmountDataFormate}
              path={`cards/transaction-request/?search=${search}&p=${page_num}&records=${data_len}&filter_type=${'USER'}`}
            />
            <NumPagination path={"path"} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Amount;
