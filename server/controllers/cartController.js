import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import User from "../models/Users.js";

export const getCart = async (req, res) => {
    try {
        const user = await User.findById(
            req.user.id
        );

        if (!user || !user.isActive) {
            return res.status(401).json({
                message:
                    "User account is not available.",
            });
        }

        const cart = await Cart.findOne({
            user: req.user.id,
        });

        if (!cart) {
            return res.json({
                items: [],
                totalItems: 0,
                totalAmount: 0,
            });
        }

        const totalItems =
            cart.items.reduce(
                (total, item) =>
                    total +
                    Number(
                        item.quantity || 1
                    ),
                0
            );

        const totalAmount =
            cart.items.reduce(
                (total, item) =>
                    total +
                    Number(
                        item.price || 0
                    ) *
                    Number(
                        item.quantity || 1
                    ),
                0
            );

        return res.json({
            items: cart.items,
            totalItems,
            totalAmount,
        });
    } catch (error) {
        console.error(
            "Get cart error:",
            error
        );

        return res.status(500).json({
            message:
                "Unable to load cart.",
        });
    }
};


export const addToCart = async (
    req,
    res
) => {
    try {
        const {
            title,
            price,
        } = req.body;

        if (
            !title ||
            price === undefined
        ) {
            return res.status(400).json({
                message:
                    "Product title and price are required.",
            });
        }

        const numericPrice =
            Number(price);

        if (
            !Number.isFinite(
                numericPrice
            ) ||
            numericPrice < 0
        ) {
            return res.status(400).json({
                message:
                    "Invalid product price.",
            });
        }

        const user =
            await User.findById(
                req.user.id
            );

        if (
            !user ||
            !user.isActive
        ) {
            return res.status(401).json({
                message:
                    "User account is not available.",
            });
        }

        let cart =
            await Cart.findOne({
                user: req.user.id,
            });

        const cleanTitle =
            String(title).trim();

        let existingItem = null;

        if (cart) {
            existingItem =
                cart.items.find(
                    (item) =>
                        item.name ===
                        cleanTitle &&
                        Number(
                            item.price
                        ) ===
                        numericPrice
                );
        }

        if (existingItem) {

            existingItem.quantity =
                Number(
                    existingItem.quantity ||
                    1
                ) + 1;
        } else {

            const itemId =
                new mongoose.Types.ObjectId();

            if (!cart) {
                cart =
                    await Cart.create({
                        user: req.user.id,

                        items: [
                            {
                                itemId,
                                name: cleanTitle,
                                price:
                                    numericPrice,
                                quantity: 1,
                            },
                        ],
                    });
            } else {
                cart.items.push({
                    itemId,
                    name: cleanTitle,
                    price:
                        numericPrice,
                    quantity: 1,
                });
            }
        }

        await cart.save();

        const totalItems =
            cart.items.reduce(
                (total, item) =>
                    total +
                    Number(
                        item.quantity || 1
                    ),
                0
            );

        const totalAmount =
            cart.items.reduce(
                (total, item) =>
                    total +
                    Number(
                        item.price || 0
                    ) *
                    Number(
                        item.quantity || 1
                    ),
                0
            );

        const addedItem =
            cart.items.find(
                (item) =>
                    item.name ===
                    cleanTitle &&
                    Number(
                        item.price
                    ) ===
                    numericPrice
            );

        return res.status(201).json({
            message:
                existingItem
                    ? "Item quantity updated in cart."
                    : "Item added to cart.",

            item: addedItem,

            items: cart.items,

            totalItems,

            totalAmount,
        });
    } catch (error) {
        console.error(
            "Add to cart error:",
            error
        );

        return res.status(500).json({
            message:
                "Unable to add item to cart.",

            error: error.message,
        });
    }
};


export const updateCartItem = async (
    req,
    res
) => {
    try {
        const {
            itemId,
        } = req.params;

        const {
            quantity,
        } = req.body;

        const numericQuantity =
            Number(quantity);

        if (
            !Number.isInteger(
                numericQuantity
            ) ||
            numericQuantity < 1
        ) {
            return res.status(400).json({
                message:
                    "Quantity must be at least 1.",
            });
        }

        const cart =
            await Cart.findOne({
                user: req.user.id,
            });

        if (!cart) {
            return res.status(404).json({
                message:
                    "Cart not found.",
            });
        }

        const item =
            cart.items.find(
                (cartItem) =>
                    cartItem.itemId.toString() ===
                    itemId
            );

        if (!item) {
            return res.status(404).json({
                message:
                    "Cart item not found.",
            });
        }

        item.quantity =
            numericQuantity;

        await cart.save();

        const totalItems =
            cart.items.reduce(
                (total, cartItem) =>
                    total +
                    Number(
                        cartItem.quantity ||
                        1
                    ),
                0
            );

        const totalAmount =
            cart.items.reduce(
                (total, cartItem) =>
                    total +
                    Number(
                        cartItem.price || 0
                    ) *
                    Number(
                        cartItem.quantity ||
                        1
                    ),
                0
            );

        return res.json({
            message:
                "Cart updated.",

            items: cart.items,

            totalItems,

            totalAmount,
        });
    } catch (error) {
        console.error(
            "Update cart error:",
            error
        );

        return res.status(500).json({
            message:
                "Unable to update cart.",
        });
    }
};

export const removeCartItem = async (
    req,
    res
) => {
    try {
        const {
            itemId,
        } = req.params;

        const cart =
            await Cart.findOne({
                user: req.user.id,
            });

        if (!cart) {
            return res.status(404).json({
                message:
                    "Cart not found.",
            });
        }

        const itemIndex =
            cart.items.findIndex(
                (item) =>
                    item.itemId.toString() ===
                    itemId
            );

        if (itemIndex === -1) {
            return res.status(404).json({
                message:
                    "Cart item not found.",
            });
        }

        cart.items.splice(
            itemIndex,
            1
        );

        await cart.save();

        const totalItems =
            cart.items.reduce(
                (total, item) =>
                    total +
                    Number(
                        item.quantity || 1
                    ),
                0
            );

        const totalAmount =
            cart.items.reduce(
                (total, item) =>
                    total +
                    Number(
                        item.price || 0
                    ) *
                    Number(
                        item.quantity || 1
                    ),
                0
            );

        return res.status(200).json({
            message:
                "Item removed from cart.",

            items: cart.items,

            totalItems,

            totalAmount,
        });
    } catch (error) {
        console.error(
            "Remove cart item error:",
            error
        );

        return res.status(500).json({
            message:
                "Unable to remove item from cart.",
        });
    }
};


export const clearCart = async (
    req,
    res
) => {
    try {
        const cart =
            await Cart.findOne({
                user: req.user.id,
            });

        if (!cart) {
            return res.json({
                message:
                    "Cart is already empty.",

                items: [],
            });
        }

        cart.items = [];

        cart.total = 0;

        await cart.save();

        return res.json({
            message:
                "Cart cleared.",

            items: [],
        });
    } catch (error) {
        console.error(
            "Clear cart error:",
            error
        );

        return res.status(500).json({
            message:
                "Unable to clear cart.",
        });
    }
};