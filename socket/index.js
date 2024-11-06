const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const { timeStamp, time } = require("console");
const {
  deleteOrder,
  checkPaid,
  updateBlockStatus,
  checkBlockStatus,
} = require("../controllers/UserOrderController");

const {
  activateEvents,
  deactivateEvents,
} = require("../controllers/SaleEventController");
const app = express();
//**Socket Connection */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
});

let orders = {};
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("cancelOrder", async (data) => {
    console.log("cancelOrder", data);
    const { orderID, selectedVoucher, timeStamp } = data;
    const timeStampMs = new Date(timeStamp).getTime();
    if (isNaN(timeStampMs)) {
      console.error("Invalid timeStamp format:", timeStamp); // In log nếu `timeStamp` không hợp lệ
      return;
    }
    const interval = setInterval(async () => {
      const timeLeft = Date.now() - timeStampMs;

      console.log("timeLeft: ", timeLeft);
      if (timeLeft >= 2 * 60 * 1000) {
        const isNotPaid = await checkPaid(orderID);
        const isUnBlocked = await checkBlockStatus(orderID);
        if (isNotPaid) {
          if (isUnBlocked) {
            await deleteOrder(orderID, selectedVoucher);
            console.log(
              `Đơn hàng ${orderID} đã bị xóa do chưa thanh toán và chỉ có trạng thái "Chờ thanh toán".`
            );
            clearInterval(interval);
          } else {
            console.log(`Đơn hàng ${orderID} đã bị chặn, không xóa.`);
          }
        } else {
          clearInterval(interval);
          console.log(`Đơn hàng ${orderID} đã có trạng thái khác, không xóa.`);
        }
      }
    }, 60000);
  });

  socket.on("updateBlockStatus", async (data) => {
    const { orderID, timeStamp } = data;
    const timeStampMs = new Date(timeStamp).getTime();
    if (isNaN(timeStampMs)) {
      console.error("Invalid timeStamp format:", timeStamp);
      return;
    }
    const delay = 1 * 60 * 1000; // 1 phút
    setTimeout(async () => {
      const isUpdated = await updateBlockStatus(orderID);

      if (isUpdated) {
        console.log(`Đơn hàng ${orderID} đã cập nhật trạng thái thành công.`);
      } else {
        console.log(`Đơn hàng ${orderID} không thể cập nhật trạng thái.`);
      }
    }, delay);
  });
  const monitorEventStatuses = () => {
    activateEvents();
    deactivateEvents();
  };
  setInterval(monitorEventStatuses, 60000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

module.exports = {
  io,
  app,
  server,
};
