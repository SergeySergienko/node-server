import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { roleCollection, userCollection } from '../repositories';
import { RequestWithBody, RoleType, UserType } from '../types';
import { SignUpDto } from '../models/userDto/SignUpDto';
import { UserErrorModel, UserViewModel } from '../models/userDto/UserViewModel';
import { generateAccessToken } from '../utils';

class AuthController {
  async signup(
    req: RequestWithBody<SignUpDto>,
    res: Response<UserViewModel | UserErrorModel>
  ) {
    try {
      const { username, password } = req.body;
      const users = await userCollection.find({}).toArray();
      const candidate = users.some((u) => u.username === username);
      if (candidate) {
        return res
          .status(409)
          .json({ errorMessage: 'User with this username already exists' });
      }
      const userRole = await roleCollection.findOne({ value: 'USER' });
      if (!userRole) {
        return res
          .status(400)
          .json({ errorMessage: "User's role is not found" });
      }
      const newUser: UserType = {
        username,
        password: bcrypt.hashSync(password, 7),
        role: [userRole.value],
      };
      const result = await userCollection.insertOne(newUser);
      if (result.insertedId) {
        const { password, ...rest } = newUser;
        return res.status(201).json(rest);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: 'Registration Error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const user = await userCollection.findOne({ username });
      if (!user) {
        return res
          .status(404)
          .json({ errorMessage: 'Incorrect username or password' });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(404)
          .json({ errorMessage: 'Incorrect username or password' });
      }

      const token = generateAccessToken(user._id, user.role);
      return res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Login Error' });
    }
  }
}

export default new AuthController();
