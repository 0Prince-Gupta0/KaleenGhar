const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "User Already exists with the same email! Please try again",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (e) {
   // console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exists! Please register first",
      });
if (checkUser.authProvider === "google") {
  return res.json({
    success: false,
    message: "Please login using Google",
  });
}

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { 
      httpOnly: true, 
      // secure: false,
      secure: true,           
  sameSite: "none",      
  maxAge: 60 * 60 * 1000, 
    }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
 //   console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });

  try {
    const decoded = jwt.verify(token, process.env.CLIENT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

const googleLogin = async (req, res) => {
//console.log("Google login API hit");
//console.log(req.body);
  const { email, name } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
    user = new User({
  userName: name,
  email,
  authProvider: "google",
  role: "user",
});

      await user.save();
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
      },
      process.env.CLIENT_SECRET_KEY,
      { expiresIn: "60m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      // sameSite: "lax",
      // secure: false,
       secure: true,
  sameSite: "none",
  maxAge: 60 * 60 * 1000,
    });

    res.json({
      success: true,
      user: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    //console.log(err);
    res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};


module.exports = { registerUser, loginUser, logoutUser, authMiddleware, googleLogin };
