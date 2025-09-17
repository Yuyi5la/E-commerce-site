import prisma from "../prismaClient.js";

export const addToCart = async (req, res) => {
  const userId = req.user.id; 
  const { product_id, quantity } = req.body;

  try {
    // check for active cart
    let cart = await prisma.orders.findFirst({
      where: { user_id: userId, status: "cart" },
      include: { order_items: true },
    });

    if (!cart) {
      cart = await prisma.orders.create({
        data: { user_id: userId, status: "cart" },
      });
    }

    // check if product already exists in cart
    const existingItem = await prisma.order_items.findFirst({
      where: { order_id: cart.id, product_id },
    });

    if (existingItem) {
      await prisma.order_items.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
      });
    } else {
      const product = await prisma.products.findUnique({ where: { id: product_id } });

      await prisma.order_items.create({
        data: {
          order_id: cart.id,
          product_id,
          quantity,
          price: product.price,
        },
      });
    }

    res.status(200).json({ success: true, message: "Item added to cart" });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await prisma.orders.findFirst({
      where: { user_id: userId, status: "cart" },
      include: {
        order_items: {
          include: { products: true },
        },
      },
    });

    if (!cart) {
      return res.status(200).json({ order_items: [] });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("Error getting cart:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCartItem = async (req, res) => {
  const userId = req.user.id; // logged in user
  const { id } = req.params; // cart item id
  const { quantity } = req.body; // new quantity

  try {
    // check if cart item belongs to this user’s active cart
    const cartItem = await prisma.order_items.findUnique({
      where: { id: Number(id) },
      include: { orders: true },
    });

    if (!cartItem || cartItem.orders.user_id !== userId || cartItem.orders.status !== "cart") {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // update quantity
    const updated = await prisma.order_items.update({
      where: { id: Number(id) },
      data: { quantity },
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeCartItem = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params; // cart item id

  try {
    const cartItem = await prisma.order_items.findUnique({
      where: { id: Number(id) },
      include: { orders: true },
    });

    if (!cartItem || cartItem.orders.user_id !== userId || cartItem.orders.status !== "cart") {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await prisma.order_items.delete({ where: { id: Number(id) } });

    res.json({ message: "Item removed from cart" });
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const checkoutCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await prisma.orders.findFirst({
      where: { user_id: userId, status: "cart" },
    });

    if (!cart) {
      return res.status(400).json({ message: "No active cart found" });
    }

    // mark current cart as completed
    await prisma.orders.update({
      where: { id: cart.id },
      data: { status: "completed" },
    });

    // optional: create new empty cart for user
    await prisma.orders.create({
      data: { user_id: userId, status: "cart" },
    });

    res.json({ message: "Checkout successful" });
  } catch (err) {
    console.error("Error checking out:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
