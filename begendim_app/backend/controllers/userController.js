import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

const userRegister = async (req, res) => {
  try {
    const { username, name, email, password, gender, image } = req.body;

    const userNameExists = await User.findOne({ username: username });

    const emailExists = await User.findOne({ email: email });

    if (userNameExists && emailExists) {
      res.status(400).json({
        message: "bu kullanıcı zaten kayıtlı",
      });
    } else if (userNameExists) {
      res.status(400).json({
        message: " bu username zaten daha önce alınmış",
      });
    } else if (emailExists) {
      res.status(400).json({
        message: "bu email zaten daha önce alınmış",
      });
    } else if (
      password == "" ||
      username == "" ||
      name == "" ||
      gender == "" ||
      email == ""
    ) {
      res.status(400).json({
        message: "lütfen tüm alanları doldurunuz",
      });
    } else {
      const result = await cloudinary.uploader.upload(image, {
        use_filename: true,
        folder: "begendim",
      });

      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await User.create({
        username,
        name,
        email,
        gender,
        password: hashedPassword,
        image: result.secure_url,
      });
      res.status(200).json(createdUser);
    }
  } catch (error) {
    res.status(500).json({
      message: "kullanıcı oluşturulamadı",
      error,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!user) {
      res.status(400).json({
        message: "username yanlış",
      });
    } else if (!passwordCorrect) {
      res.status(400).json({
        message: "şifre yanliş",
      });
    } else {
      const token = createToken(user._id);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });

      res.status(200).json({
        token,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "giriş başarısız",
    });
  }
};

const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "10d",
  });
};

const getMe = async (req, res) => {
  const token = req.header("auth");
  if(token){

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user_id = decoded.userId
    
    const user = await User.findById(user_id)
    res.json(user)
  }else{
    res.status(404)
    throw Error("no token")
  }
};

export { userRegister, userLogin, createToken, getMe };
