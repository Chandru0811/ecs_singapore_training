import React, { useEffect, useState } from 'react'
import api from '../../config/BaseUrl';

const ClientPrivacyPolicy = () => {
    const [privacyData,setPrivacyData]=useState()
    const getData = async () => {
        try {
          const response = await api.get("privacy");
          if (response.status === 200) {
            setPrivacyData(response.data.data);
          }
        } catch (e) {
          console.log("object", e);
        }
      };
    
      useEffect(() => {
        getData();
      }, []);
  return (
    <div className="container">
    {/* Hero */}
    <div className="row mt-3">
      <div className="col-lg-7">
       
          <div className="d-flex align-items-center">
            <h3 className="display-5 text-start fw-bold">
              {privacyData?.title}
            </h3>
            
          </div>

          <div className="d-flex align-items-center">
            <p className="text-start">{privacyData?.content}</p>
           
          </div>
        
      </div>
    </div>
</div>
  )
}

export default ClientPrivacyPolicy
