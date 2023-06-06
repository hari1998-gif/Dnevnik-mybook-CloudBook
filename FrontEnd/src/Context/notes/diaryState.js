import DiariesContext from "./diariesContext";
import { useState } from "react";

const DiaryState = (props) => {
  const data = {
    name: "Hari",
    age: 25,
  };
  const [state, setState] = useState(data);
  const update = () => {
    setTimeout(() => {
      setState({
        name: "Ganesh",
        age: 23,
      });
    }, 2000);
  };
  return (
    <DiariesContext.Provider value={{ state, update }}>
      {props.children}
    </DiariesContext.Provider>
  );
};
export default DiaryState;
