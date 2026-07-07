const { inventoryModel } = require("../model/inventoryModel");

exports.getAllStocks = async (_req, res) => {

  try {
    const cekData = await inventoryModel.findAll({
      attributes: ["id", "item_name", "stock", "satuan"],
      where: {
        deleted_at: null, 
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Sukses",
      data: cekData
    });
  } catch (error) {
    console.error("Error get stock:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.addStocks = async (req, res) => {
  try {
    const { item_name, stock, satuan } = req.body;

    if (!item_name || !stock || !satuan) {
      return res.status(400).json({
        message: "Field wajib diisi",
      });
    }

    const newStock = await inventoryModel.create({
      item_name,
      stock,
      satuan,
      updated_by: req.user?.username || "system", 
    });

    return res.status(201).json({
      message: "Stock berhasil ditambahkan",
      data: {
        item_name:newStock.item_name,
        stock:newStock.stock,
        satuan:newStock.satuan
      }
    });
  } catch (error) {
    console.error("Error add stock:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });

  }
};

exports.updateStocks = async (req, res) => {
  try {
    const { id } = req.query;
    const { item_name, stock, satuan } = req.body;

    const cekData = await inventoryModel.findOne({
      where: { 
        id, 
        deleted_at: null 
    },
    });

    if (!cekData) {
      return res.status(404).json({
        message: "Stock tidak ditemukan",
      });
    }

    await cekData.update({
      item_name: item_name ?? cekData.item_name,
      stock: stock ?? cekData.stock,
      satuan: satuan ?? cekData.satuan,
      updated_by: req.user?.username || "system",
    });

    return res.status(200).json({
      message: "Stock berhasil diupdate",
    });
  } catch (error) {
    console.error("Error update stock:", error.message);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

exports.deleteStocks = async (req, res) => {
  try {
    const { id } = req.query;

    const stock = await inventoryModel.findOne({
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