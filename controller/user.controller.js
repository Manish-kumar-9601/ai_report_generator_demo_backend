import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existingUser = await User.findOne({ where: { email:email } });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res
        .status(400)
        .json({ message: "User already exists. please log in." });
    }

  await User.create({
      username: username,
      email: email,
      password: password,
    }).then((user) => {
      console.log("User created successfully:", user);
      
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 86400, // 24 hours
        });
   res
     .status(201)
     .json({
       message: "User created successfully",
       id: user.id,
       username: user.username,
       email: user.email,
       roles: user.role,
       department: user.department,
       accessToken: token,
     });
    }).catch((error) => {
      console.error("Error creating user:", error); 
      res.status(500).json({ message: "Error creating user." });
    }
  );

 
     
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user." });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email, "and password:", password);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({where: { email:email }});
    console.log("User found:", user);
   
    const isValid=await bcryptjs.compare(password, user.password)
 

    if (!isValid) {
      console.error(
        "Invalid password for user:",
        isValid
      );
    
      return res.status(401).json({ message: "Invalid password." });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
        roles: user.role,
        department: user.department,
      accessToken: token,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in." });
  }
};
