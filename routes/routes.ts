import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", (req, res) => {
  res.send("ydrtufykgulhikj");
});

router.post("/signup", async (req, res) => {
  const { username, name, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      name,
      password,
    },
  });
  if (!username || !password || !name) {
    res.json({
      message: "Missing username or password for user",
    });
  }
  return res.json({
    message: "User created successfully",
    succrss: true,
    user,
  });
});

router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({
    users,
  });
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!user)
    return res.json({
      message: "cant find user",
    });
  return res.json({
    user: user,
  });
});

router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { username, name } = req.body;
  const user = await prisma.user.update({
    data: {
      username,
      name,
    },
    where: {
      id: id,
    },
  });
  if (!user) {
    return res.json({
      message: "User not found",
    });
  }
  return res.json({
    user: user,
    message: "user updated successfully",
  });
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  if (!user) {
    res.json({
      message: "User not found",
    });
  }
  return res.json({
    message: "User deleted successfully",
  });
});
export default router;
