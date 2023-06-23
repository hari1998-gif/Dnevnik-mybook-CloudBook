import DiariesContext from "./diariesContext";
import { useState } from "react";

const DiaryState = (props) => {
  const host = "http://localhost:2000";
  const initialPages = [];
  const [pagesInDiary, setPagesInDiary] = useState(initialPages);


  // Get All pages in the diary:
  const getAllPagesInDiary = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    setPagesInDiary(json);
  };

  // Add a New Page:
  const addANewPage = async (title, description, tag) => {
    // API CALL:
    const response = await fetch(`${host}/api/notes/addnewdiary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newPage = await response.json();
    setPagesInDiary(pagesInDiary.concat(newPage));
    props.showAlert("New data created", "success");
  };

  // Edit the page:
  const editTheExistingPage = async (id, title, description, tag) => {
    // API CALL:
    const response = await fetch(`${host}/api/notes/updatediary/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    // Logic for Editing the page:
    const editPageInDiary = JSON.parse(JSON.stringify(pagesInDiary));

    for (let index = 0; index < editPageInDiary.length; index++) {
      const element = editPageInDiary[index];
      if (element._id === id) {
        editPageInDiary[index].title = title;
        editPageInDiary[index].description = description;
        editPageInDiary[index].tag = tag;

        break;
      }
    }
    setPagesInDiary(editPageInDiary);
    props.showAlert("page edited successfully", "success");
  };

  // Delete the Page:
  const deleteTheExistingPage = async (id) => {
    // API CALL:
    const response = await fetch(`${host}/api/notes/deletediary/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    // Logic for client side running:
    const newPages = pagesInDiary.filter((page) => page._id !== id);
    setPagesInDiary(newPages);
    props.showAlert("Page deleted successfully", "success");
  };

  return (
    <DiariesContext.Provider
      value={{
        pagesInDiary,
        addANewPage,
        editTheExistingPage,
        deleteTheExistingPage,
        getAllPagesInDiary,
      }}
    >
      {props.children}
    </DiariesContext.Provider>
  );
};

export default DiaryState;
