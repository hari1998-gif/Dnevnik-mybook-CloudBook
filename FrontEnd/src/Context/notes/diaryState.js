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
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmYxYzMyYjhmYjA4NDQ5Y2QxYjg1NSIsImlhdCI6MTY4NTAwMzUzMX0.YfJqeWcYIJGt1Vn6sIi-WruVpZ95f6VHGyyrVuyRbIo",
      },
    });
    const json = await response.json();
    setPagesInDiary(json)
  };

  // Add a New Page:
  const addANewPage = async (title, description, tag) => {
    // API CALL:
    const response = await fetch(`${host}/api/notes/addnewdiary`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmYxYzMyYjhmYjA4NDQ5Y2QxYjg1NSIsImlhdCI6MTY4NTAwMzUzMX0.YfJqeWcYIJGt1Vn6sIi-WruVpZ95f6VHGyyrVuyRbIo",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    // Logic for Creating new Page on client side:
    const newPage = {
      _id: "647f40ca59c92smdbbksbklsndad001ea7cacc",
      user: "646f1c32b8fb08449cd1b855",
      title: title,
      description: description,
      tag: tag,
      date: "2023-06-06T14:20:58.039Z",
      __v: 0,
    };

    setPagesInDiary(pagesInDiary.concat(newPage));
  };

  // Edit the page:
  const editTheExistingPage = async (id, title, description, tag) => {
    // API CALL:
    const response = await fetch(`${host}/api/notes/updatediary/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmYxYzMyYjhmYjA4NDQ5Y2QxYjg1NSIsImlhdCI6MTY4NTAwMzUzMX0.YfJqeWcYIJGt1Vn6sIi-WruVpZ95f6VHGyyrVuyRbIo",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);


    // Logic for Editing the page:
    const editPageInDiary = JSON.parse(JSON.stringify(pagesInDiary))

    for (let index = 0; index < editPageInDiary.length; index++) {
      const element = editPageInDiary[index];
      if (element._id === id) {
        editPageInDiary[index].title = title;
        editPageInDiary[index].description = description;
        editPageInDiary[index].tag = tag;

        break;
      }
    }
    setPagesInDiary(editPageInDiary)
  };

  // Delete the Page:
  const deleteTheExistingPage = async (id) => {
    // API CALL:
    const response = await fetch(`${host}/api/notes/deletediary/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NmYxYzMyYjhmYjA4NDQ5Y2QxYjg1NSIsImlhdCI6MTY4NTAwMzUzMX0.YfJqeWcYIJGt1Vn6sIi-WruVpZ95f6VHGyyrVuyRbIo",
      },
    });
    const json = await response.json();
    console.log(json);

    // Logic for client side running:
    const newPages = pagesInDiary.filter((page) => page._id !== id);
    setPagesInDiary(newPages);
  };

  return (
    <DiariesContext.Provider
      value={{
        pagesInDiary,
        addANewPage,
        editTheExistingPage,
        deleteTheExistingPage,
        getAllPagesInDiary
      }}
    >
      {props.children}
    </DiariesContext.Provider>
  );
};

export default DiaryState;