const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1 : Endpoint to fetch all notes: "/api/notes/fetchallnotes". Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    userId = req.id;
    const notes = await Notes.find({ user: userId });
    res.send(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server Error in" });
  }
});

//ROUTE 2 : Create a new user diary: "/api/notes/addnewdiary". Login required

router.post(
  "/addnewdiary",
  fetchuser,
  [
    body("title", "Title should be more that 3 charachters")
      .notEmpty()
      .isLength({ min: 3 }),
    body("description", "Description should be more that 5 charachters")
      .notEmpty()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      //Check if user is validated with the above requirements
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag, user } = req.body;

      const newDiary = new Notes({
        title,
        description,
        tag,
        user: req.id,
      });

      const savedDiary = await newDiary.save();
      res.json(savedDiary);
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .send({ error: "Internal server Error in adding new Diary" });
    }
  }
);

//ROUTE 3:  Update the existing diary using PUT: "/api/notes/updatediary". Login required

router.put("/updatediary/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body; // Destructuring the data
    let newDiary = {};

    //Create a new diary to change with existing diary:
    if (title) {
      newDiary.title = title;
    }
    if (description) {
      newDiary.description = description;
    }
    if (tag) {
      newDiary.tag = tag;
    }

    //Find the diary which needs to be updated:
    {
      // Validating requested idary is present in DB or not:
      let requestedDiary = await Notes.findById(req.params.id);
      if (!requestedDiary) {
        return res.status(404).send("Data not found");
      }
      userId = req.id;
      if (requestedDiary.user.toString() !== userId) {
        return res.status(401).send("Invalid data");
      }
    }
    requestedDiary = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newDiary },
      { new: true }
    );
    res.json({ requestedDiary });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send({ error: "Internal server Error in updating the Diary" });
  }
});

//ROUTE 4:  Delete the existing diary using DELETE: "/api/notes/deletediary". Login required

router.delete("/deletediary/:id", fetchuser, async (req, res) => {
  //Find the diary from the DB which needs deletion:
  try {
    let diaryNeedsToBeDeleted = await Notes.findById(req.params.id);
    if (!diaryNeedsToBeDeleted) {
      return res.status(404).send("Data not found");
    }

    //Authorize the user(checking if the user owns this page):

    userId = req.id;
    if (diaryNeedsToBeDeleted.user.toString() !== userId) {
      return res.status(401).send("Not allowed to delete");
    }

    //Using the Delete operation to delete the Dairy:

    diaryNeedsToBeDeleted = await Notes.findByIdAndDelete(req.params.id);
    res.json({
      Success: "Dairy with the provided id is deleted",
      diaryNeedsToBeDeleted: diaryNeedsToBeDeleted,
    });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .send({ error: "Internal server Error in updating the Diary" });
  }
});
module.exports = router;
