import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { cookieOptions } from "../constants.js";

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    user.token = accessToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (
    [username, email, password].some((field) => !field || field.trim() === "")
  ) {
    throw new ApiError(400, "All fields are mandatory");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "Email is already registered");
  }

  const user = await User.create({ username, email, password });

  const { accessToken } = await generateAccessToken(user._id);

  const createdUser = await User.findById(user._id).select("-password");

  if (createdUser) {
    res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .json(new ApiResponse(200, createdUser, "User registered Successfully"));
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields are mandatory");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const validPassword = await user.checkPassword(password);
  if (!validPassword) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const loggedInUser = await User.findById(user._id).select("-password");

  console.log(loggedInUser);

  return res
    .status(200)
    .cookie("accessToken", loggedInUser.token, cookieOptions)
    .json(new ApiResponse(200, loggedInUser, "Logged in successfully"));
});

export { registerUser, loginUser };
