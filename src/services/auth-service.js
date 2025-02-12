import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const SECRET = process.env.JWT_SECRET || "BASICSECRET";

export default {
  async register(userData) {
    // Check if email exists in MySQL
    const userCount = await User.count({ where: { email: userData.email } });
    if (userCount > 0) {
      throw new Error("Email already exists");
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create user in MySQL
    return User.create({
      email: userData.email,
      password: hashedPassword, // Save hashed password
    });
  },

  async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid email or password!");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid email or password!");
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    // Generate JWT token
    const token = jwt.sign(payload, SECRET, { expiresIn: "2h" });

    return token;
  },
};
