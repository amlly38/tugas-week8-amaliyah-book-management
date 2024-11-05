const mongoose = require('mongoose');
const DB = require('../models');
const ResponseHelper = require('../utils/response');

class BorrowingController  {

  static async getAll(req, res) {
    try {
      const filter = {}

      if(req.query.status) {
        filter.status = req.query.status
      }

      const items = await DB.Borrowing.find(filter).populate('bookId', 'title description').populate('borrowerId', 'name phoneNumber address');
      return ResponseHelper.success(res, items, "sukses mengambil semua data peminjaman");
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async getById(req, res) {
    try {
      const items = await DB.Borrowing.findById(req.params.id);
      return ResponseHelper.success(res, items, "sukses mengambil data peminjaman");
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async create(req, res) {
    const session = await mongoose.startSession() 
    try {
      session.startTransaction()

      const book = await DB.Book.findById(req.body.bookId)
      const borrower = await DB.Borrower.findById(req.body.borrowerId)

      if(!book || !borrower) {
        return ResponseHelper.error(res, 'Book or Borrower Not Found', 400);
      }

      const createdBorrowingData = await DB.Borrowing.create(req.body);

      await borrower.save()

      await session.commitTransaction()

      return ResponseHelper.success(res, createdBorrowingData);
    } catch (error) {
      await session.abortTransaction()

      return ResponseHelper.error(res, error.message);
    } finally {
      await session.endSession()
    }
  }

  static async return(req, res) {
    try {
    const item = await DB.Borrowing.findById(req.body.id);

      if(!item) {
        return ResponseHelper.error(res, 'ID not provided!', 400);
      }

      item.status = 'RETURNED'
      item.returnDate = new Date()

      await item.save()

      return ResponseHelper.success(res, item, "sukses mengembalikan buku");
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }
}

module.exports = BorrowingController