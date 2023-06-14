import React, { useContext, useState } from "react";
import DiariesContext from "../Context/notes/diariesContext";

const AddPage = () => {
  const context = useContext(DiariesContext);
  const { addANewPage } = context;

  const [newPage, setNewPage] = useState({
    title: "",
    description: "",
    tag: "default",
  });

  // Clicking on Submit button will add a new page to the Exising Pages:

  const handleClick = (e) => {
    e.preventDefault();
    addANewPage(newPage.title, newPage.description, newPage.tag);
  };

  // OnChange event will set the diary with the new title and description:

  const handleChange = (e) => {
    setNewPage({ ...newPage, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-3">
        <h2>New Notes</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              autoComplete="current-password"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              autoComplete="current-password"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddPage;
