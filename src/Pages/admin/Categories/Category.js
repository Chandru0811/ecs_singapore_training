import React, { useEffect, useRef, useState } from "react";
import "datatables.net-dt";
import "datatables.net-responsive-dt";
import $ from "jquery";
import CategoryAdd from "./CategoryAdd";
import CategoryEdit from "./CategoryEdit";
import CategoryView from "./CategoryView";
import DeleteModel from "../../../components/DeleteModel";
import api from "../../../config/BaseUrl";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";

function Category() {
  const tableRef = useRef(null);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("category");
        setDatas(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!loading) {
      initializeDataTable();
    }
    return () => {
      destroyDataTable();
    };
  }, [loading]);

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
    if (table && $.fn.DataTable.isDataTable(tableRef.current)) {
      table.destroy();
    }
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await api.get("category");
      setDatas(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error refreshing data:", error);
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
    refreshData();
  }, []);

  const handlePublish = async () => {
    try {
      const response = await api.post('publish/categories');
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      refreshData();
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <div className="card-header d-flex align-items-center p-2 bg-light">
        <h3 className="fw-bold">Categories</h3>
        <div className="container-fluid d-flex justify-content-end">
          <CategoryAdd onSuccess={refreshData} />
          <button className="btn btn-danger mx-2" onClick={handlePublish}>Publish</button>
        </div>
      </div>
      <div>
        <div className="table-responsive p-2">
          {loading ? (
            <div className="spinner-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <table ref={tableRef} className="display">
              <thead className="thead-light">
                <tr className="text-start">
                  <th scope="col" className="text-center" style={{ whiteSpace: "nowrap" }}>
                    S.NO
                  </th>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col" className="text-center">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {datas.map((data, index) => (
                  <tr key={data.id} className="text-start">
                    <td className="text-center">{index + 1}</td>
                    <td>
                      <img
                        src={`${ImageURL}${data.logo_path}`}
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
                        <button className="btn">
                          <CategoryView id={data.id} />
                        </button>
                        <button className="btn mx-2">
                          <CategoryEdit id={data.id} onSuccess={refreshData} />
                        </button>
                        <DeleteModel onSuccess={refreshData} path={`category/${data.id}`} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;