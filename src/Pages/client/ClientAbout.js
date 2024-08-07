import React from "react";
import Testimonial from "./Testimonial";
import Section1 from "./About/Section1";
import Section2 from "./About/Section2";

function ClientAbout() {
  return (
    <section>
      {/* Section 1 */}
      <Section1 />
      {/* Section 2 Accordion */}
      <Section2 />
       {/* Testimonial */}
      <Testimonial />
    </section>
  );
}

export default ClientAbout;
