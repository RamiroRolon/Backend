import { ProductModel } from "../models/Product.model.js";

export default class ProductDaoMongoDB {
  async getAll(page = 1, limit = 10, name, sort) {
    try {
      const filter = name ? { 'name': name } : {};
      let sortOrder = {};
      if (sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
      const response = await ProductModel.paginate(filter, { page, limit, sort: sortOrder });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      return await ProductModel.create(obj);
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      return await ProductModel.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
