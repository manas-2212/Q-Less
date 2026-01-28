const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  createQueue,
  joinQueue,
  callNext,
  getQueueStatus,
  getAllQueues,
  serveCustomer,
  getBusinessQueues
} = require("../controllers/queue.controller");


router.use(authMiddleware);

router.get("/business", getBusinessQueues);

router.post("/create", createQueue);


router.post("/join", joinQueue);



router.post("/call-next", callNext);

router.post("/serve", serveCustomer);

router.get("/", getAllQueues);


router.get("/:queueId", getQueueStatus);

module.exports = router;
