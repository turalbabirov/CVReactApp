import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withErrorBoundary from "../../ErrorBoundary";
import { reducersSync } from "../../features/cv/cvSlice";

const ResultComponent = React.memo(() => {
   const dispatch = useDispatch();
   const { activeData, cvdata } = useSelector((state) => state.cv);

   useEffect(() => {
      if (activeData.id) {
         dispatch(reducersSync.updateCvData());
      }
   }, [activeData.id, dispatch]);

   const generatePDF = useCallback(async () => {
      const input = document.getElementById("cvPreview");
      const buttons = input.querySelectorAll("button");

      buttons.forEach((button) => (button.style.display = "none"));

      const canvas = await html2canvas(input, {
         useCORS: true,
         allowTaint: false
      });

      buttons.forEach((button) => (button.style.display = "block"));

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
         position = heightLeft - imgHeight;
         pdf.addPage();
         pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
         heightLeft -= pageHeight;
      }

      pdf.save(`${cvdata.fullName}_CV.pdf`);
   }, [cvdata]);

   if (!activeData.id || !cvdata) {
      return (
         <div className="bg-white flex-grow-[2] rounded flex justify-center items-center">
            Submit the form to preview your CV here.
         </div>
      );
   }

   return (
      <div
         id="cvPreview"
         className="bg-[#EFF6FF] p-7 flex-grow-[0] rounded flex flex-col justify-between my-7"
         style={{
            backgroundImage: `url('${cvdata.backgroundImageUrl || ""}')`,
            backgroundSize: "cover",
            backgroundPosition: "center"
         }}
      >
         <div className="flex justify-between gap-24 p-5">
            <div className="flex flex-col gap-10">
               <h2 className="text-2xl font-bold">{cvdata.fullName}</h2>
               <div>
                  <div>
                     Email: <span id="email">{cvdata.email}</span>
                  </div>
                  <div>
                     Phone: <span id="phone">{cvdata.phone}</span>
                  </div>
               </div>
               <div>
                  Experience: <br />
                  <span id="experience">{cvdata.experience}</span>
               </div>
            </div>
            <div className="w-32 h-32 rounded-full overflow-hidden">
               <img
                  onError={(e) =>
                     (e.target.src =
                        "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500")
                  }
                  src={cvdata.imageUrl}
                  alt={`${cvdata.fullName}`}
                  className="w-full h-full object-cover"
               />
            </div>
         </div>
         <div>
            <button className="text-black py-2 px-5 rounded bg-gray-200 hover:bg-gray-300" onClick={generatePDF}>
               Download CV
            </button>
         </div>
      </div>
   );
});

export default withErrorBoundary(ResultComponent);
