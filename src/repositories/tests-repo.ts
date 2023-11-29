import { db } from '../db/db';

export const testsRepo = {
  deleteProducts() {
    db.products = [];
  },
};
