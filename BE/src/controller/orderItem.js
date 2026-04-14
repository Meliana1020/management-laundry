const { ordersItemModel } = require("../model/ordersItemModel");

exports.addOrderItem = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { quantity, unit_price } = req.body;

    const item = await ordersItemModel.create({
      order_id,
      quantity,
      unit_price,
      updated_by: req.user?.username || "system",
    });

    return res.status(201).json({
      message: "Item berhasil ditambahkan",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error add item",
      error: error.message,
    });
  }
};

exports.updateOrderItem = async (req, res) => {
  try {
    const { item_id } = req.params;
    const { quantity, unit_price } = req.body;

    const item = await ordersItemModel.findByPk(item_id);

    if (!item) {
      return res.status(404).json({
        message: "Item tidak ditemukan",
      });
    }

    await item.update({
      quantity: quantity ?? item.quantity,
      unit_price: unit_price ?? item.unit_price,
      updated_by: req.user?.username || "system",
    });

    return res.status(200).json({
      message: "Item berhasil diupdate",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error update item",
      error: error.message,
    });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const { item_id } = req.params;

    const item = await ordersItemModel.findByPk(item_id);

    if (!item) {
      return res.status(404).json({
        message: "Item tidak ditemukan",
      });
    }

    await item.destroy();

    return res.status(200).json({
      message: "Item berhasil dihapus",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error delete item",
      error: error.message,
    });
  }
};