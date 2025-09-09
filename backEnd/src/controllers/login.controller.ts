import { Request, Response } from "express";
import UserModel from "../models/usuario.model";
import { generateToken } from "../utils/jtw";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    const emailNorm = email?.trim().toLowerCase();

    if (!emailNorm) {
      return res.status(400).json({ message: "Email é obrigatório" });
    }

    if (!password) {
      return res.status(400).json({ message: "Senha é obrigatória" });
    }

    const user = await UserModel.findOne({ where: { email: emailNorm } });
    if (!user) {
      return res.status(400).json({ message: "Email incorreto" });
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    const token = generateToken(user);
    return res.status(200).json({ message: "Login realizado com sucesso", token });
  } catch (err) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};
