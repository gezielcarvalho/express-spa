import express, { Router } from "express";
import * as cartItemController from "../controllers/CartItemController";

const router: Router = express.Router();

/**
 * @swagger
 * /cartitems:
 *   post:
 *     summary: Add a new item to cart
 *     tags: [Cart Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       201:
 *         description: Cart item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItemResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", cartItemController.createCartItem);

/**
 * @swagger
 * /cartitems:
 *   get:
 *     summary: Get all cart items
 *     tags: [Cart Items]
 *     responses:
 *       200:
 *         description: List of all cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItemResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", cartItemController.getAllCartItems);

/**
 * @swagger
 * /cartitems/{id}:
 *   get:
 *     summary: Get a specific cart item by ID
 *     tags: [Cart Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID (UUID without hyphens)
 *     responses:
 *       200:
 *         description: Cart item found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItemResponse'
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", cartItemController.getCartItemById);

/**
 * @swagger
 * /cartitems/{id}:
 *   put:
 *     summary: Update a cart item
 *     tags: [Cart Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID (UUID without hyphens)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItem'
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartItemResponse'
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", cartItemController.updateCartItem);

/**
 * @swagger
 * /cartitems/{id}:
 *   delete:
 *     summary: Remove a cart item
 *     tags: [Cart Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cart item ID (UUID without hyphens)
 *     responses:
 *       204:
 *         description: Cart item deleted successfully
 *       404:
 *         description: Cart item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", cartItemController.deleteCartItem);

export default router;
