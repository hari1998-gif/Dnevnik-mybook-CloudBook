import React, { useContext, useEffect } from "react";
import DiariesContext from "../Context/notes/diariesContext";

const About = () => {
  const a = useContext(DiariesContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      This is About {a.state.name} and his age is {a.state.age}
    </div>
  );
};

export default About;
