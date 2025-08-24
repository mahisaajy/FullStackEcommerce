import { Request, Response } from 'express';
import { db } from '../../db/index';
import { productsTable, createProductSchema } from '../../db/productsSchema';
import { eq } from 'drizzle-orm';
import _ from 'lodash';

export async function listProducts (req: Request, res: Response) {
    // res.send('listProducts');
    try {
        const products = await db.select().from(productsTable);
        res.json(products);
    } catch (e) {
        res.status(500).send(e);
    }
}

export async function getProductById(req: Request, res: Response) {
    // res.send('getProductById');

    try {

        const {id} = req.params;
        const [product] = await db.select().from(productsTable).where(eq(productsTable.id, Number(id)));

        if (!product) {
            res.status(404).send({ message: 'Product not found' });
        } else {
            res.json(product);
        }
    } catch (e) {
        res.status(500).send(e);
    }
}

export async function createProduct(req: Request, res: Response) {
    console.log(req.body);    

    try {
        // console.log(Object.keys(createProductSchema.shape));
        // console.log(req.cleanBody);
        // const data = _.pick(req.body, 
        //     // ['name', 'price']
        //     Object.keys(createProductSchema.shape) 
        // );
        const [product] = await db.insert(productsTable)
        .values(req.cleanBody)//.values(data)
        .returning();

        // res.send('createProduct');
        res.status(201).json(product);
    } catch (e) {
        res.status(500).send(e);
    }
    
}

export async function updateProduct(req: Request, res: Response) {
    // res.send('updateProduct');
    try {
        const id = Number(req.params.id);
        const updatedFields = req.cleanBody;

        const [product] = await db.update(productsTable).set(updatedFields)
        .where(eq(productsTable.id, Number(id)))
        .returning()

        if (product) {
            res.json(product);
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (e) {
        res.status(500).send(e)
    }
}

export async function deleteProduct(req: Request, res: Response) {
    // res.send('deleteProduct');
    try {
        const id = Number(req.params.id);
        const [deletedProduct] = await db.delete(productsTable).where(eq(productsTable.id, Number(id))).returning()
        if (deletedProduct) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    } catch (e) {
        res.status(500).send(e);
    }
    
}