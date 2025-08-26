import { Request, Response } from "express";
import UserModel from "../models/usuario.model";
import { generateToken } from "../utils/jtw";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const user = await UserModel.findOne({ where: { email } });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isValidPassword = await user.validatePassword(password);
  if (!isValidPassword) {
    return res.status(400).json({ error: "Email or password are invalid" });
  }

  const token = generateToken(user);

  res.status(200).json({ message: "Login Sucessfull", token });
};
