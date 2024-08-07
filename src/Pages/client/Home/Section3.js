import React, { useEffect, useState } from "react";
import api from "../../../config/BaseUrl";
import ImageURL from "../../../config/ImageURL";

function Section3() {
  const [datas, setDatas] = useState([]);
  const [showAll, setShowALL] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get("companieshiring");
        setDatas(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  const toggleView = () => {
    setShowALL((prve) => !prve);
  };
  const displayCards = showAll ? datas : datas.slice(0, 12);

  return (
    <section className="topcompanies mb-5">
      <div className="d-flex justify-content-between align-items center mb-4">
        <div>
          <h1 className="secondheading text-start">Top Companies Hiring</h1>
        </div>
        <div>
          <button className="btn btn-primary" onClick={toggleView}>
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
      <div className="row">
        {displayCards.map((card) => (
          <div key={card.id} className="col-6 col-md-2 mb-4">
            <div className="card">
              <div className="card-body">
                <img
                  src={`${ImageURL}${card.company_logo_path}`}
                  alt={card.company_name}
                  style={{ width: "100px", height: "100px" }}
                />
                <h5>{card.company_name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Section3;
