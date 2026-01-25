const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// BUSINESS: create queue
exports.createQueue = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const queue = await prisma.queue.create({
      data: {
        name,
        businessId: userId
      }
    });

    res.status(201).json(queue);
  } catch (err) {
    res.status(500).json({ message: "Failed to create queue" });
  }
};

// CUSTOMER: join queue
exports.joinQueue = async (req, res) => {
  try {
    const { queueId } = req.body;
    const userId = req.user.id;

    // prevent duplicate join
    const existing = await prisma.queueEntry.findFirst({
      where: { queueId, userId }
    });

    if (existing) {
      return res.status(400).json({ message: "Already in queue" });
    }

    const entry = await prisma.queueEntry.create({
      data: {
        queueId,
        userId
      }
    });

    res.json({ message: "Joined queue", entry });
  } catch (err) {
    res.status(500).json({ message: "Failed to join queue" });
  }
};

// BUSINESS: call next customer
exports.callNext = async (req, res) => {
  try {
    const { queueId } = req.body;

    const next = await prisma.queueEntry.findFirst({
      where: {
        queueId,
        status: "WAITING"
      },
      orderBy: { createdAt: "asc" }
    });

    if (!next) {
      return res.json({ message: "No customers waiting" });
    }

    await prisma.queueEntry.update({
      where: { id: next.id },
      data: { status: "SERVED" }
    });

    res.json({ message: "Customer served" });
  } catch (err) {
    res.status(500).json({ message: "Failed to call next" });
  }
};

// ANY USER: get queue status
exports.getQueueStatus = async (req, res) => {
  try {
    const { queueId } = req.params;
    const userId = req.user.id;

    const entries = await prisma.queueEntry.findMany({
      where: { queueId },
      orderBy: { createdAt: "asc" }
    });

    const myIndex = entries.findIndex(e => e.userId === userId);

    res.json({
      position: myIndex === -1 ? null : myIndex + 1,
      total: entries.length
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to get queue status" });
  }
};
