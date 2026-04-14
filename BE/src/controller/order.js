const { ordersModel } = require("../model/ordersModel");
const { ordersItemModel } = require("../model/ordersItemModel");

exports.addOrder = async (req, res) => {
  try {
    const {
      user_id,
      order_date,
      jenis_layanan,
      weight_amount,
      price_amount,
    } = req.body;

    if (!user_id || !order_date || !jenis_layanan) {
      return res.status(400).json({
        message: "user_id, order_date, jenis_layanan wajib diisi",
      });
    }

    const order = await ordersModel.create({
      user_id,
      order_date,
      jenis_layanan,
      weight_amount: weight_amount || 0,
      price_amount: price_amount || 0,
      updated_by: req.user?.username || "system",
    });

    return res.status(201).json({
      message: "Order berhasil dibuat",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error add order",
      error: error.message,
    });
  }
};

exports.getAllOrder = async (req, res) => {
  try {
    const orders = await ordersModel.findAll({
      where: { deleted_at: null },
      include: [
        {
          model: ordersItemModel,
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "Success get all orders",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error get orders",
      error: error.message,
    });
  }
};

exports.getOrderByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const orders = await ordersModel.findAll({
      where: {
        user_id,
        deleted_at: null,
      },
      include: [ordersItemModel],
    });

    return res.status(200).json({
      message: "Success get order by user",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error get order by user",
      error: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await ordersModel.findOne({
      where: { id, deleted_at: null },
      include: [ordersItemModel],
    });

    if (!order) {
      return res.status(404).json({
        message: "Order tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "Success get order",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error get order",
      error: error.message,
    });
  }
};

exports.updateOrderByStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status_cucian } = req.body;

    const order = await ordersModel.findOne({
      where: { id, deleted_at: null },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order tidak ditemukan",
      });
    }

    await order.update({
      status_cucian,
      updated_by: req.user?.username || "system",
    });

    return res.status(200).json({
      message: "Status cucian berhasil diupdate",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error update status",
      error: error.message,
    });
  }
};

exports.updateOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      jenis_layanan,
      weight_amount,
      price_amount,
      status_payment,
    } = req.body;

    const order = await ordersModel.findOne({
      where: { id, deleted_at: null },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order tidak ditemukan",
      });
    }

    await order.update({
      jenis_layanan: jenis_layanan ?? order.jenis_layanan,
      weight_amount: weight_amount ?? order.weight_amount,
      price_amount: price_amount ?? order.price_amount,
      status_payment: status_payment ?? order.status_payment,
      updated_by: req.user?.username || "system",
    });

    return res.status(200).json({
      message: "Order berhasil diupdate",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error update order",
      error: error.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await ordersModel.findOne({
      where: { id, deleted_at: null },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order tidak ditemukan",
      });
    }

    await order.update({
      deleted_at: new Date(),
      deleted_by: req.user?.username || "system",
    });

    return res.status(200).json({
      message: "Order berhasil dihapus",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error delete order",
      error: error.message,
    });
  }
};