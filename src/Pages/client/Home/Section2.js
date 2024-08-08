import React, { useEffect, useState } from 'react'
import api from '../../../config/BaseUrl';
import ImageURL from "../../../config/ImageURL";

function Section2() {
  const [datas, setDatas] = useState([]);
  const [showAll, setShowALL] = useState(false);

  const getData = async () => {
    try {
      const response = await api.get("joinwithus");
      setDatas(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const toggleView = () => {
    setShowALL((prve) => !prve);
  };
  const displayCards = showAll ? datas : datas.slice(0, 6);

  return (
    <section>
      <div className='whyjoinus mb-5'>
      <div className="d-flex justify-content-between align-items center mb-4">
        <div>
          <h1 className="secondheading text-start mb-3">Why Join with Us</h1>
        </div>
        <div>
          <button className="btn btn-primary" onClick={toggleView}>
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      </div>
        <div className='row'>
          {displayCards.map((data) => (
            <div key={data.id} className='col-md-4 mb-3'>
              <div className='card'>
                <div className='card-body'>
                  <div className='d-flex'>                
                    <img
                    src={`${ImageURL}${data?.image_path}`}
                    alt={data?.image_path}
                    style={{ width: "30px", height: "30px" }}
                  />   <p className='pt-2 mx-2'><b>{data?.title}</b></p>
                  </div>
                  <p className='text-start subpara paraContent'>{data?.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Section2