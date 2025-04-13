import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import withErrorBoundary from "../../ErrorBoundary";
import { reducersSync } from "../../features/cv/cvSlice";

// Modal Component
const Modal = ({ show, onClose, onConfirm, selectedCv }) => {
   if (!show) return null;

   return ReactDOM.createPortal(
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
         <div className="bg-white rounded-lg p-8 shadow-lg ">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete {selectedCv.fullName}'s CV?</p>
            <div className="flex justify-end gap-2">
               <button onClick={onClose} className="py-2 px-4 rounded bg-gray-400 hover:bg-gray-500 text-white">
                  Cancel
               </button>
               <button onClick={onConfirm} className="py-2 px-4 rounded bg-red-400 hover:bg-red-500 text-white">
                  Delete
               </button>
            </div>
         </div>
      </div>,
      document.body
   );
};

// TableComponent
const TableComponent = () => {
   const dispatch = useDispatch();
   const { data } = useSelector((state) => state.cv);
   const [showModal, setShowModal] = useState(false);
   const [selectedCv, setSelectedCv] = useState(null);

   if (!data || data.length === 0) {
      return;
   }

   const handleShowClick = (cvID) => {
      dispatch(reducersSync.changeCVStatus(cvID));
   };

   const handleDeleteClick = (cv) => {
      dispatch(reducersSync.deleteCv(cv.id));
      setSelectedCv(cv);
      setShowModal(true);
   };

   const handleConfirmDelete = () => {
      setShowModal(false);
      setSelectedCv(null);
   };

   return (
      <>
         <table className="mt-20 text-left bg-white rounded-lg w-full table-auto border-separate border-spacing-4">
            <thead>
               <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Image</th>
                  <th className="text-center">Actions</th>
               </tr>
            </thead>
            <tbody>
               {data.map((cv, index) => (
                  <tr key={cv.id}>
                     <td>{index + 1}</td>
                     <td>{cv.fullName}</td>
                     <td>{cv.email}</td>
                     <td>{cv.phone}</td>
                     <td className="h-12">
                        <img
                           src={cv.imageUrl}
                           onError={(e) =>
                              (e.target.src =
                                 "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500")
                           }
                           className="h-full object-contain me-auto rounded-lg object-center"
                           alt="User"
                        />
                     </td>
                     <td className="px-4 py-2 flex justify-center gap-2">
                        <button
                           onClick={() => handleShowClick(cv.id)}
                           className="text-white py-2 px-5 rounded bg-blue-400 hover:bg-blue-500"
                        >
                           Show CV
                        </button>
                        <button
                           onClick={() => handleDeleteClick(cv)}
                           className="text-white py-2 px-5 rounded bg-red-400 hover:bg-red-500"
                        >
                           Delete CV
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>

         <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirmDelete}
            selectedCv={selectedCv}
         />
      </>
   );
};

export default withErrorBoundary(TableComponent);
