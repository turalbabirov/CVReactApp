import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import withErrorBoundary from "../../ErrorBoundary";
import { reducersSync } from "../../features/cv/cvSlice";

const FormComponent = () => {
   const dispatch = useDispatch();

   const formik = useFormik({
      initialValues: {
         fullName: "",
         email: "",
         phonePrefix: "50",
         phoneBody: "",
         imageUrl: "",
         experience: ""
      },
      validationSchema: Yup.object({
         fullName: Yup.string().required("Full name is required"),
         email: Yup.string().email("Invalid email format").required("Email is required"),
         phoneBody: Yup.string()
            .matches(/^\d{7}$/, "Phone number must be exactly 7 digits")
            .required("Phone number is required"),
         imageUrl: Yup.string().url("Invalid URL format").required("Image URL is required"),
         experience: Yup.string().required("Experience is required")
      }),
      onSubmit: ({ fullName, email, imageUrl, experience, phonePrefix, phoneBody }, { resetForm }) => {
         const sanitizedPhone = `+994${phonePrefix}${phoneBody}`;
         const id = uuidv4();
         const cv = { id, fullName, email, phone: sanitizedPhone, imageUrl, experience };
         dispatch(reducersSync.addCV(cv));
         resetForm();
      }
   });

   const formatPhoneBody = (value) => {
      const onlyNumbers = value.replace(/\D/g, "");
      if (onlyNumbers.length <= 7) {
         const formatted = onlyNumbers.replace(/^(\d{3})(\d{2})(\d{2})$/, "$1 $2-$3");
         return formatted;
      }
      return value;
   };

   return (
      <div className="bg-gray-100 p-7 border flex-grow-[5] rounded">
         <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
               <label className="block text-sm font-medium">Full Name</label>
               <input
                  type="text"
                  name="fullName"
                  value={formik.values.fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
               />
               {formik.touched.fullName && formik.errors.fullName && (
                  <p className="text-red-500 text-sm">{formik.errors.fullName}</p>
               )}
            </div>
            <div>
               <label className="block text-sm font-medium">Email</label>
               <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
               />
               {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm">{formik.errors.email}</p>
               )}
            </div>
            <div>
               <label className="block text-sm font-medium">Phone</label>
               <div className="flex gap-2">
                  <span className="flex items-center">(+994)</span>
                  <select
                     name="phonePrefix"
                     value={formik.values.phonePrefix}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     className="border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  >
                     <option value="50">50</option>
                     <option value="55">55</option>
                     <option value="70">70</option>
                     <option value="77">77</option>
                     <option value="99">99</option>
                  </select>
                  <input
                     type="text"
                     name="phoneBody"
                     value={formatPhoneBody(formik.values.phoneBody)}
                     onChange={(e) => {
                        const onlyNumbers = e.target.value.replace(/\D/g, "");
                        if (onlyNumbers.length <= 7) {
                           formik.setFieldValue("phoneBody", onlyNumbers);
                        }
                     }}
                     onBlur={formik.handleBlur}
                     placeholder="123 12-31"
                     className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
               </div>
               {formik.touched.phoneBody && formik.errors.phoneBody && (
                  <p className="text-red-500 text-sm">{formik.errors.phoneBody}</p>
               )}
            </div>
            <div>
               <label className="block text-sm font-medium">Image URL</label>
               <input
                  type="text"
                  name="imageUrl"
                  value={formik.values.imageUrl}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
               />
               {formik.touched.imageUrl && formik.errors.imageUrl && (
                  <p className="text-red-500 text-sm">{formik.errors.imageUrl}</p>
               )}
            </div>
            <div>
               <label className="block text-sm font-medium">Experience</label>
               <textarea
                  name="experience"
                  value={formik.values.experience}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="h-32 w-full border rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
               ></textarea>
               {formik.touched.experience && formik.errors.experience && (
                  <p className="text-red-500 text-sm">{formik.errors.experience}</p>
               )}
            </div>
            <button
               type="submit"
               disabled={formik.isSubmitting}
               className={`text-white py-2 px-5 rounded ${
                  formik.isSubmitting ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
               } flex items-center justify-center`}
            >
               {formik.isSubmitting ? "Submitting..." : "Submit"}
            </button>
         </form>
      </div>
   );
};

export default withErrorBoundary(FormComponent);
