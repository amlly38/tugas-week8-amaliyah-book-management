const DB = require('../models');
const ResponseHelper = require('../utils/response');

class BorrowerController  {

  static async create(req, res) {
    try {
    const createBorrower = await DB.Borrower.create(req.body);
    return ResponseHelper.success(res, createBorrower, 'sukses menambahkan data pengunjung');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async getAll(req, res) {
    try {
      const borrowers = await DB.Borrower.find({ isDeleted: false });
      return ResponseHelper.success(res, borrowers, 'sukses mengambil semua data pengunjung');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async getById(req, res) {
    try {
      const borrower = await DB.Borrower.findOne({_id: req.params.id, isDeleted: false});

      if(!borrower) {
        return ResponseHelper.error(res, 'ID not found! - bad request', 404);
      }

      return ResponseHelper.success(res, borrower, 'sukses mengambil data pengunjung');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async update(req, res) {
    try {
      const updateBorrower = await DB.Borrower.findByIdAndUpdate(req.params.id, req.body);

      if(!updateBorrower) {
        return ResponseHelper.error(res, 'ID not found! - bad request', 404);
      }

      const updatedData = {
        ...req.body,
        updatedAt: Date.now()
      };

      return ResponseHelper.success(res, updateBorrower, 'sukses mengupdate data pengunjung');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async delete(req, res) {
    try {
      const deleteBorrower = await DB.Borrower.findByIdAndUpdate(req.params.id, 
        { isDeleted: true,
          membershipStatus: 'inactive'
        }, 
        { new: true }
      );

      if(!deleteBorrower) {
        return ResponseHelper.error(res, 'ID not found! - bad request', 404);
      }

      return ResponseHelper.success(res, deleteBorrower, 'sukses menghapus data pengunjung');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }
}

module.exports = BorrowerController