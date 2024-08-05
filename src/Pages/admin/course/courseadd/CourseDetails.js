import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../../../config/BaseUrl";

const CourseDetails = forwardRef(
  ({ formData, setLoadIndicators, setFormData, handleNext }, ref) => {
    const [categoryData, setCategoryData] = useState([]);
    const validationSchema = Yup.object({
      logo: Yup.string().required("Logo is required*"),
      title: Yup.string().required("Title is required*"),
      description: Yup.string().required("Description is required*"),
      category_id: Yup.string().required("Category is required*"),
      offerPrice: Yup.number()
        .required("Offer Price is required*")
        .positive("Offer Price must be a positive number"),
      orginalPrice: Yup.number()
        .required("Original Price is required*")
        .positive("Original Price must be a positive number"),
    });

    const getCategoryData = async () => {
      try {
        const categoryResponse = await api.get("category");
        setCategoryData(categoryResponse.data.data);
      } catch (error) {
        toast.error(
          "Error Fetching Data: " + error?.categoryResponse?.data?.message
        );
      }
    };
    useEffect(() => {
      getCategoryData();
    }, []);

    const formik = useFormik({
      initialValues: {
        logo: "",
        title: "",
        description: "",
        category_id: "",
        offerPrice: "",
        orginalPrice: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("object", values);
        try {
          const formData = new FormData();

          // Add each data field manually to the FormData object
          formData.append("logo", values.logo);
          formData.append("title", values.title);
          formData.append("description", values.description);
          formData.append("category_id", values.category_id);
          formData.append("price", values.orginalPrice);
          formData.append("offer_price", values.offerPrice);
          // Perform the API call to create a new user with profile image

          const response = await api.post("courses", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            toast.success(response.data.message);
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error);
        }
      },
    });
    useImperativeHandle(ref, () => ({
      courseDetails: formik.handleSubmit,
    }));
    return (
      <div className="container my-5">
        <h4 className="mb-4 fw-bold text-start">Course Batch</h4>
        <form onSubmit={formik.handleSubmit}>
          <div className="container">
            <div className="row px-1">
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>
                    Logo<span className="text-danger">*</span>
                  </label>
                </div>
                <input
                  className="form-control"
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.logo && formik.errors.logo && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.logo}</small>
                  </div>
                )}
              </div>

              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Title</label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.title}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Category</label>
                </div>
                <select
                  className={`form-select ${
                    formik.touched.category_id && formik.errors.category_id
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("category_id")}
                >
                  <option value="">Select a category</option>
                  {categoryData &&
                    categoryData.map((data) => (
                      <option key={data.id} value={data.id}>
                        {data.title}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Description</label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.description}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Orginal Price</label>
                </div>
                <input
                  type="number"
                  className="form-control"
                  id="orginalPrice"
                  name="orginalPrice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.orginalPrice}
                />
                {formik.touched.orginalPrice && formik.errors.orginalPrice && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.orginalPrice}</small>
                  </div>
                )}
              </div>
              <div className="col-md-6 col-12 mb-3">
                <div className="text-start">
                  <label>Offer Price</label>
                </div>
                <input
                  type="number"
                  className="form-control"
                  id="offerPrice"
                  name="offerPrice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.offerPrice}
                />
                {formik.touched.offerPrice && formik.errors.offerPrice && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.offerPrice}</small>
                  </div>
                )}
              </div>

              {/* <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-sm btn-primary">
              Submit
            </button>
          </div> */}
            </div>
          </div>
        </form>
      </div>
    );
  }
);
export default CourseDetails;
