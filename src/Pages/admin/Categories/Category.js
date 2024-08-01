import React, { useRef, useEffect, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { FaEdit, FaEye, FaTimes, FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import courseImg from "../../../assets/client/pythone.png";
import CategoryAdd from "./CategoryAdd";
import CategoryEdit from "./CategoryEdit";
import CategoryView from "./CategoryView";

const tableData = [
  {
    id: 1,
    image: courseImg,
    title: "Java",
    description: "Full Stack Master Programme",
  },
  {
    id: 2,
    image: courseImg,
    title: "Python",
    description: "Data Science Programme",
  },
  {
    id: 3,
    image: courseImg,
    title: "JavaScript",
    description: "Web Development Programme",
  },
];

function Category() {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    $(tableRef.current).DataTable({
      responsive: true,
    });
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  return (
    <div>
      <div className="card-header d-flex align-items-center p-2 bg-light">
        <h3 className="fw-bold">Categories</h3>
        <div className="container-fluid d-flex justify-content-end">
          <button className="btn btn-sm btn-primary mx-2">
            <CategoryAdd />
          </button>
          <button className="btn btn-sm btn-danger">Publish</button>
        </div>
      </div>
      <div>
        <div className="table-responsive p-2">
          <table ref={tableRef} className="display">
            <thead className="thead-light">
              <tr className="text-start">
                <th
                  scope="col"
                  className="text-center"
                  style={{ whiteSpace: "nowrap" }}
                >
                  S.NO
                </th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col" className="text-center">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={data.id} className="text-start">
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <img
                      src={data.image}
                      alt={data.title}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{data.title}</td>
                  <td>{data.description}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-light border-2 btn-sm mx-1">
                        <CategoryView tableData={data} />
                      </button>
                      <button className="btn btn-light border-2 btn-sm mx-1">
                        <CategoryEdit tableData={data} />
                      </button>
                      <button className="btn btn-light border-2 btn-sm mx-1">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Category;
