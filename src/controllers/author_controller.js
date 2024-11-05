const DB = require('../models');
const ResponseHelper = require('../utils/response');

class AuthorController  {

  static async create(req, res) {
    try {
    const createAuthor = await DB.Author.create(req.body);
    return ResponseHelper.success(res, createAuthor, 'sukses menambahkan data penulis');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async getAll(req, res) {
    try {
      const authors = await DB.Author.find({ isDeleted: false });
      return ResponseHelper.success(res, authors, 'sukses mengambil semua data penulis');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async getById(req, res) {
    try {
      const author = await DB.Author.findOne({_id: req.params.id, isDeleted: false});

      if(!author) {
        return ResponseHelper.error(res, 'ID not found! - bad request', 404);
      }

      return ResponseHelper.success(res, author, 'sukses mengambil data penulis');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async update(req, res) {
    try {
      const updateAuthor = await DB.Author.findByIdAndUpdate(req.params.id, req.body);

      if(!updateAuthor) {
        return ResponseHelper.error(res, 'ID not found! - bad request', 404);
      }

      const updatedData = {
        ...req.body,
        updatedAt: Date.now()
      };

      return ResponseHelper.success(res, updateAuthor, 'sukses mengupdate data penulis');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async delete(req, res) {
    try {
      const deleteAuthor = await DB.Author.findByIdAndUpdate(req.params.id, 
        { isDeleted: true,}, 
        { new: true }
      );

      if(!deleteAuthor) {
        return ResponseHelper.error(res, 'ID not found! - bad request', 404);
      }

      return ResponseHelper.success(res, deleteAuthor, 'sukses menghapus data penulis');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async uploadImage(req, res) {
    try {
      const item = await DB.Author.findById(req.body.id);

      if(!item) {
        return ResponseHelper.error(res, 'ID not found! - bad request', 404);
      }

      item.profilePicture = req.body.profilePicture

      await item.save()

      return ResponseHelper.success(res, item, 'sukses memasukkan url foto penulis');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }
}

module.exports = AuthorController