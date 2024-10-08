import React, { useRef, useEffect, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import { FaEdit, FaEye, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../../config/BaseUrl";
import DeleteModel from "../../../components/DeleteModel";

const Course = () => {
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState([]);
  const [loader, setLoader] = useState(true);
  const [loadIndicator, setLoadIndicator] = useState(false);

  // useEffect(() => {
  //   $(tableRef.current).DataTable({
  //     responsive: true,
  //   });
  //   return () => {
  //     destroyDataTable();
  //   };
  // }, [loading]);

  const initializeDataTable = () => {
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      return;
    }
    $(tableRef.current).DataTable({
      responsive: true,
    });
  };
  const destroyDataTable = () => {
    const table = $(tableRef.current).DataTable();
    if (table) {
      table.destroy();
    }
  };
  // const destroyDataTable = () => {
  //   const table = $(tableRef.current).DataTable();
  //   if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
  //     table.destroy();
  //   }
  // };

  const getData = async () => {
    setLoader(true);
    setLoading(true);
    try {
      const response = await api.get("courses");
      if (response.data.status === 200) {
        setDatas(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoader(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loader ? (
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      ) : (
        <div className="container-fluid shadow px-0 ">
          <div className="card-header d-flex align-items-center p-2 bg-light">
            <h3 className="fw-bold">Course</h3>
            <div className="container-fluid d-flex justify-content-end">
              <Link to={"/courseadd"}>
                <button className="btn btn-primary">Add +</button>
              </Link>
              {/* <button className="btn btn-danger mx-2" disabled={loadIndicator}>
              {loadIndicator && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Publish</button> */}
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
                    <th scope="col">Course</th>
                    <th scope="col">Description</th>
                    <th scope="col" className="text-center">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas?.map((data, index) => (
                    <tr key={data.id} className="text-start">
                      <td className="text-center">{index + 1}</td>
                      <td>{data.title}</td>
                      <td>{data.description}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <Link to={`/courseView/${data.id}`}>
                            <button className="btn btn-light border-2 btn-sm mx-1">
                              <FaEye />
                            </button>
                          </Link>
                          {/* <Link to={`/courseEdit/${data.id}`}>
                            <button className="btn btn-light border-2 btn-sm mx-1">
                              <FaEdit />
                            </button>
                          </Link> */}
                          <DeleteModel
                            path={`course/${data.id}`}
                            onSuccess={getData}
                            className={"btn btn-light border-2 btn-sm mx-1"}
                          />
                          {/* <button className="btn btn-light border-2 btn-sm mx-1">
                        <FaTrash /> 
                      </button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
