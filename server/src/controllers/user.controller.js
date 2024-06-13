import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are mandatory");
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "Email is already registered");
  }

  const user = await User.create({ username, email, password });

  const createdUser = await User.findById(user._id);
  if (createdUser) {
    res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered Successfully"));
  }
});

export { registerUser };
