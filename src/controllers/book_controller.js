const DB = require('../models');
const ResponseHelper = require('../utils/response');

class BookController  {

  static async create(req, res) {
    try {
    const createBook = await DB.Book.create(req.body);
    return ResponseHelper.success(res, createBook, 'sukses menambahkan data buku');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async getAll(req, res) {
    try {
      const books = await DB.Book.find({ isDeleted: false }).populate('categoryId', 'name description').populate('authorId', 'name bio');
      return ResponseHelper.success(res, books, 'sukses mengambil semua data buku');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async getById(req, res) {
    try {
      const book = await DB.Book.findOne({_id: req.params.id, isDeleted: false}).populate('categoryId', 'name description').populate('authorId', 'name bio');

      if(!book) {
        return ResponseHelper.error(res, 'ID not found! - bad request', 404);
      }

      return ResponseHelper.success(res, book, 'sukses mengambil data buku');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async update(req, res) {
    try {
      const updateBook = await DB.Book.findByIdAndUpdate(req.params.id, req.body);

      if(!updateBook) {
        return ResponseHelper.error(res, 'ID not found! - bad request', 404);
      }

      const updatedData = {
        ...req.body,
        updatedAt: Date.now()
      };

      return ResponseHelper.success(res, updatedData, 'sukses mengupdate data buku');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async delete(req, res) {
    try {
      const deleteBook = await DB.Book.findByIdAndUpdate(req.params.id, 
        { isDeleted: true,}, 
        { new: true }
      );

      if(!deleteBook) {
        return ResponseHelper.error(res, 'ID not found! - bad request', 404);
      }

      return ResponseHelper.success(res, deleteBook, 'sukses menghapus data buku');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async uploadImage(req, res) {
    try {
      const item = await DB.Book.findById(req.body.id);

      if(!item) {
        return ResponseHelper.error(res, 'ID not found! - bad request', 404);
      }

      item.coverPicture = req.body.coverPicture

      await item.save()

      return ResponseHelper.success(res, item, 'sukses memasukkan url gambar buku');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }
}

module.exports = BookController