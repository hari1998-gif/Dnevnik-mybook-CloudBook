import React, {useContext} from "react";
import DiariesContext from "../Context/notes/diariesContext";


function SinglePage(props) {
  const context = useContext(DiariesContext);
  const { deleteTheExistingPage } = context;

  const { singlePage, EditThePage } = props;

  return (
    <div className="col-md-3">
      <div className="card my-2 overflow-auto">
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{singlePage.title}</h5>
            <i className="fa-solid fa-pen-to-square" onClick={() => {EditThePage(singlePage)}}></i>
            <i className="fa-sharp fa-solid fa-trash " onClick={()=>{deleteTheExistingPage(singlePage._id)}}></i>
          </div>
          <p className="card-text">{singlePage.description}</p>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
