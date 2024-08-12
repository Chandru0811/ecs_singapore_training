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
      logo: Yup.string().required("*Logo is required"),
      title: Yup.string().required("*Title is required"),
      description: Yup.string().required("*Description is required"),
      category_id: Yup.string().required("*Category is required"),
      offer_price: Yup.number()
        .required("*Offer Price is required")
        .positive("*Offer Price must be a positive number"),
      price: Yup.number()
        .required("*Original Price is required")
        .positive("*Original Price must be a positive number"),
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
        offer_price: "",
        price: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        console.log("object", values);
        setLoadIndicators(true)
        try {
          const formData = new FormData();
          Object.entries(values).forEach(([key,value])=>(
            formData.append(key,value)
          ))

          const response = await api.post("courses", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.status === 200) {
            toast.success(response.data.message);
            setFormData(response.data.data);
            handleNext();
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }finally{
          setLoadIndicators(false)
        }
      },

    });
    useImperativeHandle(ref, () => ({
      courseDetails: formik.handleSubmit,
    }));

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        formik.setFieldValue("logo", file);
      }
    };
    useEffect(() => {
      formik.setValues(formData);
    }, []);

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
                  onChange={handleImageChange}
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
                  id="price"
                  name="price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.price}</small>
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
                  id="offer_price"
                  name="offer_price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.offer_price}
                />
                {formik.touched.offer_price && formik.errors.offer_price && (
                  <div className="error text-danger text-start">
                    <small>{formik.errors.offer_price}</small>
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
