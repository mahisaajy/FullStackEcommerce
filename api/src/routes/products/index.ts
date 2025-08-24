import { Router } from 'express';
import { listProducts, getProductById, createProduct, updateProduct, deleteProduct } from './productsController';
import { validateData } from '../../middlewares/validationMiddleware';

import { z } from 'zod';
import { createProductSchema, updateProductSchema, productsTable } from '../../db/productsSchema';

import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

// const createProductSchema = z.object({
//     name: z.string(),
//     price: z.number({ message: "Price should be a number" }),
// });

// type ProductType = z.infer<typeof createProductSchema>;

const router = Router();

// products endpoints
router.get('/', listProducts);
router.get('/:id', getProductById)
router.post('/', validateData(createProductSchema), createProduct);
router.put('/:id', validateData(updateProductSchema), updateProduct);
router.delete('/:id', deleteProduct);

export default router;