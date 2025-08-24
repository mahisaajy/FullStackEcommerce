export {};

declare global {
  namespace Express {
    export interface Request {
      userId?: Number; // You can replace 'any' with a more specific type if needed
      cleanBody?: any;
    }
  }
}