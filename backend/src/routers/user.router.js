import { Router } from "express";
import jwt from "jsonwebtoken";
import { sample_users } from "../data.js";
import { BAD_REQUEST } from "../constants/httpStatus.js";

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.send(generateTokenResponse(user));
    return;
  }

  res.status(BAD_REQUEST).send("Username or Password is invalid");
});

const generateTokenResponse = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "someRandomText",
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

export default router;
