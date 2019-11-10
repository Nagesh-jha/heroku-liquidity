const User = require("../models/user.model");
const Userinfo = require("../models/userinfo.model");
const Department = require("../models/department.model");

exports.createLoginUser = async (req, res) => {
  try {
    const result = await User.create(req.body);
    return res.json({
      success: 0,
      message: "User created Successfully!",
      data: result
    });
  } catch (err) {
    return res.json({ success: -1, message: err });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await User.find({
      email: req.body.email,
      password: req.body.password
    });
    console.log(result);
    if (result.length > 0) {
      return res.json({
        success: 0,
        message: "Authorised user!!!",
        data: result
      });
    } else {
      return res.json({
        success: 0,
        message: "Unathorised user, Please enter valid email and password !",
        data: result
      });
    }
  } catch (err) {
    return res.json({ success: -1, message: err });
  }
};

exports.createNewDepartment = async (req, res) => {
  try {
    const result = await Department.create(req.body);
    return res.json({
      success: 0,
      message: "Department created Successfully!",
      data: result
    });
  } catch (err) {
    return res.json({
      success: -1,
      message: "Department already exist, Please enter unique Department."
    });
  }
};

exports.getDepartmentList = async (req, res) => {
  try {
    const data = await Department.find(
      req.body,
      { __v: 0, _id: 0, created_at: 0, updated_at: 0 },
      { sort: { updatedAt: -1 } }
    );
    if (data.length > 0) {
      let result = data.map(dep => dep.department);
      return res.json({
        success: 0,
        message: "Get all deparments Successfully!",
        data: result
      });
    } else {
      return res.json({
        success: -1,
        message: "No department foud, Please enter some first!",
        data: data
      });
    }
  } catch (err) {
    return res.json({ success: -1, message: err });
  }
};

exports.createUser = async (req, res) => {
  try {
    const result = await Userinfo.create(req.body);
    console.log(result);
    return res.json({
      success: 0,
      message: "User created Successfully!",
      data: result
    });
  } catch (err) {
    if (err.errors) {
      return res.json({
        success: -1,
        message: err.errors.email.message + " -> " + req.body.email
      });
    } else {
      return res.json({
        success: -1,
        message: "Email already exist, Please enter unique email_id."
      });
    }
  }
};

exports.getUserList = async (req, res) => {
  try {
    const data = await Userinfo.find(
      req.body,
      { __v: 0, created_at: 0, updated_at: 0 },
      { sort: { updatedAt: -1 } }
    );
    return res.json({
      success: 0,
      message: "Get all users Successfully!",
      data: data
    });
  } catch (err) {
    return res.json({ success: -1, message: err });
  }
};
exports.updateUserInfo = async (req, res) => {
  const data = await Userinfo.findByIdAndUpdate(
    req.body._id,
    {
      $set: req.body
    },
    { new: true }
  );
  if (data) {
    return res.json({
      success: 0,
      message: "User updated successfully!",
      data: data
    });
  } else {
    return res.json({
      success: -1,
      message: "User not found!"
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const data = await Userinfo.findByIdAndDelete(req.query._id);
    if (data) {
      return res.json({
        success: 0,
        message: "User removed successfully!",
        data: data
      });
    } else {
      ``;
      return res.json({
        success: -1,
        message: "Couldn't find user with id: " + req.query._id
      });
    }
  } catch (err) {
    return res.json({ success: -1, message: err });
  }
};
