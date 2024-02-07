import userModel from "../models/userModel.js";
export const updateUserController = async (req, res, next) => {
  const { name, email, lastName, location } = req.body;
  if (!name || !email || !lastName || !location) {
    next("Please Provide All Fields");
  }
  const user = await userModel.findOne({ _id: req.user.userId });
  user.name = name;
  user.lastName = lastName;
  user.email = email;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(200).json({
    user,
    token
  });
};

export const getUserController = async (req, res, next) => {
  try {
    const user = await userModel.findById({ _id: req.user.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false
      });
    } else {
      res.status(200).send({
        success: true,
        data: user
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error: error.message
    });
  }
};

// ======= GET USERS WITH PAGINATION, SORTING and Searching===========
export const getAllUsersController = async (req, res, next) => {
  const { search, sort } = req.query;
  //conditons for searching filters
  const queryObject = {
    _id: { $ne: req.user.userId }
  };

  if (search) {
    queryObject.name = { $regex: search, $options: "i" };
  }

  let queryResult = userModel.find(queryObject);

  //sorting
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }
  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }
  if (sort === "a-z") {
    queryResult = queryResult.sort("location");
  }
  if (sort === "z-a") {
    queryResult = queryResult.sort("-location");
  }
  //pagination

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  /*  const startIndex = (page - 1) * limit;
     const lastIndex = page * limit; */

  const totalUsers = await userModel.countDocuments(queryResult);
  queryResult = queryResult.skip(skip).limit(limit);
  const pageCount = Math.ceil(totalUsers / limit);

  const users = await queryResult;
  const results = {};
  /* if (lastIndex < totalUsers) {
      results.next = {
        page: page + 1
      };
    }
    if (startIndex > 0) {
      results.prev = {
        page: page - 1
      };
    } */
  res.status(200).json({
    totalUsers,
    pageCount,
    results,
    users
  });
};
