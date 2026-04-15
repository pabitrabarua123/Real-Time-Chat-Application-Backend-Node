import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";

const userController = {
    // New user registration
    registerUser: async (req: Request, res: Response) => {
      try {
       // console.log("Registering user with data:", req.body);
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
           return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({
           name,
           email,
           password,
        });

        res.status(201).json({
          message: "User registered successfully",
        });

      } catch (error) {
          res.status(500).json({ message: "Server error", error });
      }
    },

    loginUser: async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body;
        if (!email || !password) {
             return res.status(400).json({ message: "All fields required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Generate token
        const token = generateToken(user._id.toString());
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
          message: "Login successful",
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        });
        
      } catch (error) {
          res.status(500).json({ message: "Server error" });
      }
    },

    // User logout
    logoutUser: async (req: Request, res: Response) => {
      try {
        res.cookie("token", "", {
          httpOnly: true,
          expires: new Date(0),
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

       res.status(200).json({ message: "Logout successful" });
      } catch (error) {
       res.status(500).json({ message: "Server error" });
     }
    },

    // get all users
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await User.find().select("_id name email");
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    },
    
    // user profile
    getUserProfile: async (req: any, res: Response) => {
       try {
         if (!req.user) {
              return res.status(404).json({ message: "User not found" });
         }

         res.json(req.user);
       } catch (error) {
         res.status(500).json({ message: "Server error" });
       }
    }
};

export default userController;