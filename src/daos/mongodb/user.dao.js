import { UserModel } from "../models/User.model.js";

export default class UserDaoMongoDB {
  async getByEmail(email) {
    try {
      return await UserModel.find({ email });
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      return await UserModel.findById(id).populate("cart");
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(page = 1, limit = 10) {
    try {
      return await UserModel.paginate({}, { page, limit });
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      return await UserModel.create(obj);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      return await UserModel.updateOne({ _id: id }, obj);
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      return await UserModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
