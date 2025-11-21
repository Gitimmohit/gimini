import React from 'react';

const DateConvertor = ({ inputDate }) => {
  const convertDate = (dateString) => {
    if (!dateString){
      return " ";
    }
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formattedDate = convertDate(inputDate);

  return (
    <span>
      {formattedDate}
      {/* {formattedDate && isNaN(Date.parse(formattedDate)) ? formattedDate : " "} */}
      {/* {formattedDate && isNaN(new Date(formattedDate).getTime()) ? formattedDate : "Invalid date"} */}
    </span>
  );
};

export default DateConvertor;

