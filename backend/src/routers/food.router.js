import { Router } from "express";
import { FoodModel } from "../models/food.model.js";
import asyncHandler from "express-async-handler";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const foods = await FoodModel.find({});
    res.send(foods);
  })
);

router.get(
  "/tags",
  asyncHandler(async (req, res) => {
    const tags = await FoodModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 });

    const all = {
      name: "All",
      count: await FoodModel.countDocuments(),
    };

    tags.unshift(all);
    res.send(tags);
  })
);

router.get(
  "/search/:searchTerm",
  asyncHandler(async (req, res) => {
    const { searchTerm } = req.params;
    const searchRegex = new RegExp(searchTerm, "i");
    const foods = await FoodModel.find({ name: { $regex: searchRegex } });
    res.send(foods);
  })
);

router.get(
  "/tag/:tag",
  asyncHandler(async (req, res) => {
    const { tag } = req.params;
    const foods = await FoodModel.find({ tags: tag });
    res.send(foods);
  })
);

router.get(
  "/:foodId",
  asyncHandler(async (req, res) => {
    const { foodId } = req.params;
    const food = await FoodModel.findById(foodId);
    res.send(food);
  })
);

export default router;
