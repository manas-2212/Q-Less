const prisma = require("../prisma.js");

// business queue creation
const createQueue = async (req, res) => {
  try {
    if (req.user.role !== "BUSINESS") {
      return res.status(403).json({ message: "Only business can create queue" })
    }

    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Queue name required" })
    }

    const queue = await prisma.queue.create({
      data: {
        name,
        businessId: req.user.id
      }
    })
    res.status(201).json(queue)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Failed to create queue" })
  }
};

// queue joining  
const joinQueue = async (req, res) => {
  try {
    if (req.user.role !== "CUSTOMER") {
      return res.status(403).json({ message: "Only customers can join queue" })
    }

    const { queueId } = req.body
    if (!queueId) {
      return res.status(400).json({ message: "Queue ID required" })
    }
    const entry = await prisma.queueEntry.create({
      data: {
        userId: req.user.id,
        queueId
      }
    })

    res.status(201).json(entry)
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Already in queue " })
    }

    console.error(error);
    res.status(500).json({ message: "Failed to join queue" })
  }
}
// call next customer for business admin
const callNext = async (req, res) => {
  try {
    if (req.user.role !== "BUSINESS") {
      return res.status(403).json({ message: "Only business can call next" })
    }

    const { queueId } = req.body

    const nextEntry = await prisma.queueEntry.findFirst({
      where: {
        queueId,
        status: "WAITING"
      },
      orderBy: {
        joinedAt: "asc"
      }
    })

    if (!nextEntry) {
      return res.json({ message: "No customers in queue" })
    }

    await prisma.queueEntry.update({
      where: { id: nextEntry.id },
      data: { status: "CALLED" }
    })

    res.json({ message: "Customer called", entryId: nextEntry.id })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to call next customer" })
  }
}

// view queue status
const getQueueStatus = async (req, res) => {
  try {
    const { queueId } = req.params

    const entries = await prisma.queueEntry.findMany({
      where: { queueId },
      orderBy: { joinedAt: "asc" },
      select: {
        id: true,
        status: true,
        joinedAt: true,
        userId: true
      }
    });

    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch queue status" });
  }
};

module.exports = {
  createQueue,
  joinQueue,
  callNext,
  getQueueStatus
};
