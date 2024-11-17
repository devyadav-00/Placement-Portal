import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { TPO } from  "../models/tpoModel.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const registerTPO = catchAsyncErrors(async (req, res, next) => {
    const { firstname, lastname, email, phone, password } = req.body;
    console.log(req.body);
    

  if (!firstname || !lastname || !email || !phone || !password ) {
    return next(new ErrorHandler("Please fill all required fields!"));
  }

  const isEmail = await TPO.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }

  const tpo = await TPO.create({
    firstname,
    lastname,
    email,
    phone,
    password,
  });

  sendToken(tpo, 201, res, "TPO Registered!");
});

export const loginTPO = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password."));
  }

  const tpo = await TPO.findOne({ email }).select("+password");
  if (!tpo) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  const isPasswordMatched = await tpo.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }

  sendToken(tpo, 200, res, "TPO Logged In!");
});

export const logoutTPO = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});