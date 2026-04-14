const { stocksModel } = require("../model/stocksModel");

exports.getAllStocks = async (_req, res) => {

  try {
    const stocks = await stocksModel.findAll({
      where: {
        deleted_at: null, 
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Success get all stocks",
      data: stocks,
    });
  } catch (error) {
    console.error("Error get stock:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.addStocks = async (req, res) => {
  try {
    const { item_name, stock_in, stock_out, unit } = req.body;

    if (!item_name || !unit) {
      return res.status(400).json({
        message: "item_name dan unit wajib diisi",
      });
    }

    const newStock = await stocksModel.create({
      item_name,
      stock_in: stock_in || 0,
      stock_out: stock_out || 0,
      unit,
      updated_by: req.user?.username || "system", 
    });

    return res.status(201).json({
      message: "Stock berhasil ditambahkan",
      data: newStock,
    });
  } catch (error) {
    console.error("Error add stock:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });

  }
};

exports.updateStocks = async (req, res) => {
  try {
    const { id } = req.params;
    const { item_name, stock_in, stock_out, unit } = req.body;

    const stock = await stocksModel.findOne({
      where: { 
        id, 
        deleted_at: null 
    },
    });

    if (!stock) {
      return res.status(404).json({
        message: "Stock tidak ditemukan",
      });
    }

    await stock.update({
      item_name: item_name ?? stock.item_name,
      stock_in: stock_in ?? stock.stock_in,
      stock_out: stock_out ?? stock.stock_out,
      unit: unit ?? stock.unit,
      updated_by: req.user?.username || "system",
    });

    return res.status(200).json({
      message: "Stock berhasil diupdate",
      data: stock,
    });
  } catch (error) {
    console.error("Error update stock:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.deleteStocks = async (req, res) => {
  try {
    const { id } = req.params;

    const stock = await stocksModel.findOne({
      where: { 
        id, 
        deleted_at: null 
      },
    });

    if (!stock) {
      return res.status(404).json({
        message: "Stock tidak ditemukan",
      });
    }

    await stock.update({
      deleted_at: new Date(),
      deleted_by: req.user?.username || "system",
    });

    return res.status(200).json({
      message: "Stock berhasil dihapus",
    });
  } catch (error) {
    console.error("Error hapus stock:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};