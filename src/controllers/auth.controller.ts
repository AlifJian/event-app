import { Request, Response } from "express";
import { object, ref, string } from "yup";

import userModel from "../models/user.model";

type TRegister = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const registerSchema = object({
  fullname: string().required(),
  username: string().required(),
  email: string().email().required(),
  password: string().min(8).required(),
  confirmPassword: string().min(8).oneOf([ref("password"), ""], "Password and Confirm Password not match").required(),
});

export default {
  async register(req: Request, res: Response) {
    const { fullname, username, email, password, confirmPassword } =
      req.body as unknown as TRegister;

    try {
      await registerSchema.validate({
        fullname,
        username,
        email,
        password,
        confirmPassword,
      });

      const createUserResult = await userModel.create({
        fullname,
        username,
        email,
        password
      }) 


      res.status(200).json({
        message: "Register Success",
        data : createUserResult
      });

    } catch (error) {
      const err = error as unknown as Error
      res.status(200).json({
        message: err.message,
        data : null
      });
    }
  },
};
