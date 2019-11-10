"use strict";

const mongoose = require("mongoose");
const validator = require("validator");
var Schema = mongoose.Schema;

var departmentSchema = new Schema(
  {
    department: {
      type: String,
      unique: true,
      uppercase: true,
      required: true,
    },
  },
  {
    //timestamps: true
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    strict: false
  }
);

module.exports = mongoose.model("Department", departmentSchema);
