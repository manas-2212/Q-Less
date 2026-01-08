const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  createQueue,
  joinQueue,
  callNext,
  getQueueStatus
} = require("../controllers/queue.controller");

// All queue routes are protected
router.use(authMiddleware);

// for business
router.post("/create", createQueue);

// customer join queue
router.post("/join", joinQueue);

// business calls next customer
router.post("/call-next", callNext);

// loggedin user: view queue status
router.get("/:queueId", getQueueStatus);

module.exports = router;
