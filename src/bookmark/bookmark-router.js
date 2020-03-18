const express = require("express");
const bookmarkRouter = express.Router();
const bodyParser = express.json();
const uuid = require("uuid/v4");
const logger = require("../logger");
const xss = require("xss");
const BookmarksService = require("./bookmarks-service");

bookmarkRouter
  .route("/bookmarks")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");

    BookmarksService.getAllBookmarks(knexInstance)
      .then(bookmarks => {
        res.json(bookmarks);
      })
      .catch(next);
  })
  .post(bodyParser, (req, res) => {
    const { title, url, description, rating } = req.body;
    if (!title) {
      logger.error("Title is requied");
      return res.status(400).send("Invalid data");
    }
    if (!url) {
      logger.error("URL is requied");
      return res.status(400).send("Invalid data");
    }
    if (!description) {
      logger.error("Description is requied");
      return res.status(400).send("Invalid data");
    }
    if (!rating) {
      logger.error("Rating is requied");
      return res.status(400).send("Invalid data");
    }
    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      logger.error("Rating must be a number within 1 and 5");
      return res.status(400).send("Invalid data");
    }
    const id = uuid();
    const bookmark = {
      id,
      title,
      url,
      description,
      rating
    };
    bookmarks.push(bookmark);
    logger.info(`Bookmark with id ${id} created.`);
    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${id}`)
      .json(bookmark);
  });

bookmarkRouter
  .route("/bookmarks/:bookmark_id")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    BookmarksService.getById(knexInstance, req.params.bookmark_id)
      .then(bookmark => {
        if (!bookmark) {
          return res.status(404).json({
            error: { message: `Bookmark not found` }
          });
        }
        res.json(bookmark);
      })
      .catch(next);
  })
  .delete((req, res) => {
    const { id } = req.params;
    const bookmarkIndex = bookmarks.findIndex(b => b.id == id);

    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found`);
      return res.status(404).send("Not found");
    }
    bookmarks.splice(bookmarkIndex, 1);
    logger.info(`Bookmark with id ${id} deleted.`);
    res.status(204).end();
  });
module.exports = bookmarkRouter;
