const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/*business logic: create queue*/
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
    console.error("createQueue error:", err);
    res.status(500).json({ message: "Failed to create queue" })
  }
};

/* customer logic: joinoing queue */
exports.joinQueue = async (req, res) => {
  try {
    const { queueId } = req.body;
    const userId = req.user.id;

    const entry = await prisma.queueEntry.create({
      data: {
        queueId,
        userId
      }
    })
    res.json({
      message: "Joined queue",
      entry
    });


  } catch (err) {
    console.error("joinQueue error:", err);
    res.status(500).json({ message: "Failed to join queue" })
  }
};

/* for business: call next, for customer WAITING -> CALLED*/
exports.callNext = async (req, res) => {
  try {
    const { queueId } = req.body;

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
      return res.json({ message: "No customers waiting" });
    }

    await prisma.queueEntry.update({
      where: { id: nextEntry.id },
      data: { status: "CALLED" }
    })

    res.json({
      message: "Customer called",
      userId: nextEntry.userId
    });
  } catch (err) {
    console.error("callNext error:", err)
    res.status(500).json({ message: "Failed to call next" });
  }
};

/* (GPT logic) get queue status */
exports.getQueueStatus = async (req, res) => {
  try {
    const { queueId } = req.params;
    const userId = req.user.id;

    const entries = await prisma.queueEntry.findMany({
      where: { queueId },
      orderBy: { joinedAt: "asc" }
    });

    const waitingEntries = entries.filter(
      entry => entry.status === "WAITING"
    );

    const myIndex = waitingEntries.findIndex(
      entry => entry.userId === userId
    );

    const myEntry = entries.find(
      entry => entry.userId === userId
    );

    res.json({
      status: myEntry ? myEntry.status : null,
      position: myIndex === -1 ? null : myIndex + 1,
      totalWaiting: waitingEntries.length
    });
  } catch (err) {
    console.error("🔥 getQueueStatus error:", err);
    res.status(500).json({ message: "Failed to get queue status" });
  }
};

/* all active queues */
exports.getAllQueues = async (req, res) => {
  try {
    const queues = await prisma.queue.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        createdAt: true
      }
    })
    res.json(queues);
  } catch (err) {
    console.error("getAllQueues error:", err);
    res.status(500).json({ message: "Failed to fetch queues" });
  }
};

/* logic for served screen
   business: serve customer
   CALLED -> SERVED */
exports.serveCustomer = async (req, res) => {
  try {
    const { queueId } = req.body
    const called = await prisma.queueEntry.findFirst({
      where: {
        queueId,
        status: "CALLED"
      }
    })

    if(!called){
      return res.json({ message: "No customer being served" });
    }

    await prisma.queueEntry.update({
      where: { id: called.id },
      data: { status: "SERVED" }
    })

    res.json({ message: "Customer served" });
  } catch (err) {
    console.error("serveCustomer error:", err);
    res.status(500).json({ message: "Failed to serve customer" });
  }
}






// BUSINESS: get own queues
exports.getBusinessQueues = async (req, res) => {
  try {
    const businessId = req.user.id;

    const queues = await prisma.queue.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" }
    })

    res.json(queues);
  } catch (err) {
    console.error("getBusinessQueues error:", err)
    res.status(500).json({ message: "Failed to fetch business queues" })
  }
}