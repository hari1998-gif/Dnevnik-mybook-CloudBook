import React, { useContext, useState } from "react";
import DiariesContext from "../Context/notes/diariesContext";

const AddPage = () => {
  const context = useContext(DiariesContext);
  const { addANewPage } = context;

  const [newPage, setNewPage] = useState({
    title: "",
    description: "",
    tag: "",
  });

  // Clicking on Submit button will add a new page to the Exising Pages:

  const handleClick = (e) => {
    e.preventDefault();
    addANewPage(newPage.title, newPage.description, newPage.tag);
    setNewPage({
      title: "",
      description: "",
      tag: "",
    })
  };

  // OnChange event will set the diary with the new title and description:

  const handleChange = (e) => {
    setNewPage({ ...newPage, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container my-3">
        <h2>Create a new page</h2>
        <div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <strong>Title</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={handleChange}
              minLength={5}
              value={newPage.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <strong>Description</strong>
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              autoComplete="current-password"
              onChange={handleChange}
              minLength={5} 
              value={newPage.description} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              <strong>Tag</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              autoComplete="current-password"
              onChange={handleChange}
              minLength={5}
              value={newPage.tag}
            />
          </div>
          <button
            disabled={newPage.title.length < 5 || newPage.description.length < 5}
            type="submit"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Add Page
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPage;
