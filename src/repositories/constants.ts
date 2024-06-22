import 'dotenv/config';

const user = process.env.mongodb_user as string;
const password = process.env.mongodb_passwort as string;
export const uri = `mongodb+srv://${user}:${password}@cluster0.oqfu7vk.mongodb.net/?retryWrites=true&w=majority`;
export const url = `mongodb+srv://${user}:${password}@cluster0.oqfu7vk.mongodb.net/uploads?retryWrites=true&w=majority`;

export const database_url = process.env.DATABASE_URL as string;
