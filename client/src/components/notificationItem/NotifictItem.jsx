import React from "react";

function NotifictItem({ data }) {
  return (
    <div className="p-5 bg-white text-main border-4 border-main rounded-md m-2">
      {data}
    </div>
  );
}

export default NotifictItem;
