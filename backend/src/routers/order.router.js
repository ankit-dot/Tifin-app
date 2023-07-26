import { Router } from "express";
import asyncHandler from "express-async-handler";
import auth from "../middlewares/auth.mid.js";
import { BAD_REQUEST } from "../constants/httpStatus.js";
import { OrderModel } from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";
const router = Router();
router.use(auth);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const order = req.body;

    if (order.items.length <= 0)
      res.status(BAD_REQUEST).send("Cart Is Empty!1");

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

export default router;
