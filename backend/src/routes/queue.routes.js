const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  createQueue,
  joinQueue,
  callNext,
  getQueueStatus
} = require("../controllers/queue.controller");


router.use(authMiddleware);


router.post("/create", createQueue);


router.post("/join", joinQueue);


router.post("/call-next", callNext);


router.get("/:queueId", getQueueStatus);

module.exports = router;
