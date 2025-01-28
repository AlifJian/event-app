import { Request, RequestHandler, Response } from "express";
import { object, ref, string } from "yup";

import userModel from "../models/user.model";
import { encrypt } from "../utils/encrypt";
import { IRequestToken } from "../middlewares/auth.middleware";
import { getToken } from "../utils/jwt";

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
  confirmPassword: string()
    .min(8)
    .oneOf([ref("password"), ""], "Password and Confirm Password not match")
    .required(),
});

type TLogin = {
  identifier: string;
  password: string;
};

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
        password,
      });

      res.status(200).json({
        message: "Register Success",
        data: createUserResult,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
  async login(req: Request, res: Response): Promise<void> {
    const { identifier, password } = req.body as unknown as TLogin;

    try {
      const userByIdentifier = await userModel.findOne({
        $or: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
      });

      if (!userByIdentifier) {
        res.status(400).json({
          message: "user not found",
          data: null,
        });
        return;
      }
      const validatePassword: boolean =
        encrypt(password) === userByIdentifier?.password;

      if (!validatePassword) {
        res.status(400).json({
          message: "user not found",
          data: null,
        });
        return;
      }

      const accessToken = getToken({
        id : userByIdentifier.id,
        role : userByIdentifier.role
      }) 

      res.status(200).json({
        message: "Login success",
        data: accessToken,
      });
    } catch (error) {
      const err = error as unknown as Error;
      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
  async me(req: IRequestToken, res: Response) {
    const userToken = req.user;
    try {
      const resultUser = await userModel.findById(userToken?.id);

      res.status(200).json({
        message: "Success",
        resultUser,
      });
    } catch (error) {
      const err = error as unknown as Error;

      res.status(400).json({
        message: err.message,
        data: null,
      });
    }
  },
};
