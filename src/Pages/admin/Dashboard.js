import React from "react";

function Dashboard() {
  const handelLogin =()=>{
    alert("Hii")
  }
  return (
    <div>
      Dashboard
      <button onClick={handelLogin} type="submit" >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
