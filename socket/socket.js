const { Server } = require("socket.io");
const userRepository = require("../repositories/user.repository");
function handleSocket(server) {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", async (socket) => {
    const userId = socket.handshake.query.user_id;
    let userId1 = userId.replace(/['"]+/g, "");
    const user = await userRepository.retrieve(userId1);
    let userTasks = user.tasks;
    userTasks.forEach((taskId) => {
      socket.join(taskId);
    });
    socket.on("chat message", ({ messageInput, user }) => {
      userTasks.forEach((taskId) => {
        io.to(taskId).emit("chat message", { messageInput, user });
      });
    });
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
}

module.exports = handleSocket;
