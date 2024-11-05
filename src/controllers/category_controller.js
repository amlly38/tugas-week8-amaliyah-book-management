const DB = require('../models');
const ResponseHelper = require('../utils/response');

class CategoryController  {

  static async create(req, res) {
    try {
    const items = await DB.Category.create(req.body);
    return ResponseHelper.success(res, items, 'sukses menambahkan data kategori');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async getAll(req, res) {
    try {
      const items = await DB.Category.find({
        isDeleted: false
      });
      return ResponseHelper.success(res, items, 'sukses mengambil semua data kategori');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async getById(req, res) {
    try {
      const items = await DB.Category.findOne({_id: req.params.id, isDeleted: false});
      return ResponseHelper.success(res, items, 'sukses mengambil data kategori');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async update(req, res) {
    try {

      if(!req.params.id) {
        return ResponseHelper.error(res, 'ID not provided!', 400);
      }

      const updatedData = {
        ...req.body,
        updatedAt: Date.now()
      };

      const items = await DB.Category.findByIdAndUpdate(req.params.id, req.body);
      return ResponseHelper.success(res, items, 'sukses mengupdate data kategori');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async delete(req, res) {
    try {
      
      if(!req.params.id) {
        return ResponseHelper.error(res, 'ID not provided!', 400);
      }

      const items = await DB.Category.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
      return ResponseHelper.success(res, items, 'sukses menghapus data kategori');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }
}

module.exports = CategoryController