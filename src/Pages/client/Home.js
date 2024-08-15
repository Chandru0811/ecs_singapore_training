import React, { useState } from "react";
import Section1 from "./Home/Section1";
import Section2 from "./Home/Section2";
import Section3 from "./Home/Section3";
import Section4 from "./Home/Section4";
import Section5 from "./Home/Section5";
import Section6 from "./Home/Section6";

function Home() {

  return (
    <div className="container Home">
      {/* Hero */}
      <Section1 />
      {/* {/ Why Join Us /} */}
      <Section2 />
      {/* {/ Top Companies Hiring /} */}
      <Section3 />
      {/* {/ Courses /} */}
      <Section4 />
      {/* {/ Training Overview /} */}
      <Section5 />
      {/* {/ Training and Placements /} */}
      <Section6 />
    </div>
  );
}

export default Home;
