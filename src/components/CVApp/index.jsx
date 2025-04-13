import React from "react";
import FormComponent from "../Form";
import TableComponent from "../Table";
import ResultComponent from "../Result";

const CVApp = () => {
   return (
      <div className="mx-20 py-12">
         <div className="flex-column gap-20">
            <div className="flex justify-between gap-20">
               <FormComponent />
               <ResultComponent />
            </div>
            <TableComponent />
         </div>
      </div>
   );
};

export default CVApp;
