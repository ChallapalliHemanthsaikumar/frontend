import React, { useEffect, useState } from "react";
import "./UploadedItems.css";

function UploadedItems() {
  const [values, setValues] = useState([]);
  useEffect(() => {
    //let old = JSON.parse(localStorage.getItem("images"));
    let old = JSON.parse(sessionStorage.getItem("display"));
    setValues(old);
  }, []);
  console.log(values);

  return (
    <div className="uploadedItems">
      
      {values && (
          <>
          {values.map((e) => {
            return (
              <>
              <div className="uploadedItems__data">
              <img src={e.val} alt="" />
              </div>
                
              </>
            );
          })}
          </>
      )}
      
    </div>
  );
}

export default UploadedItems;
