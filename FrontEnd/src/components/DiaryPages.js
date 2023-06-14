import React, { useContext, useEffect, useRef, useState } from "react";
import DiariesContext from "../Context/notes/diariesContext";
import SinglePage from "./SinglePage";

const DiaryPages = () => {
  const context = useContext(DiariesContext);
  const { pagesInDiary, getAllPagesInDiary, editTheExistingPage } = context;

  const [newPage, setNewPage] = useState({id:"", eTitle: "", eDescription: "", eTag: "" });

  useEffect(() => {
    getAllPagesInDiary();
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const EditThePage = (currentEditablePage) => {
    ref.current.click();
    setNewPage({id: currentEditablePage._id, eTitle: currentEditablePage.title, eDescription: currentEditablePage.description, eTag: currentEditablePage.tag});
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Updating", newPage )
    refClose.current.click();
    editTheExistingPage(newPage.id, newPage.eTitle, newPage.eDescription, newPage.eTag)
  };

  // OnChange event will set the diary with the new title and description:

  const handleChange = (e) => {
    setNewPage({ ...newPage, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit the Page
              </h1>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="eTitle" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" id="eTitle" name="eTitle" value={newPage.eTitle} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="eDescription" className="form-label">
                    Description
                  </label>
                  <input type="text" className="form-control" id="eDescription" name="eDescription" value={newPage.eDescription} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="eTag" className="form-label">
                    Tag
                  </label>
                  <input type="text" className="form-control" id="eTag" name="eTag" value={newPage.eTag} onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal" >
                Close
              </button>
              <button type="button" onClick={handleClick} className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

       {/* //Display of the stored notes: */}

      <div className="row">
        <h2>Your Notes</h2>
        {pagesInDiary.map((singlePage) => {
          return <SinglePage key={singlePage._id} EditThePage={EditThePage} singlePage={singlePage} />;
        })}
      </div>
    </>
  );
};

export default DiaryPages;
