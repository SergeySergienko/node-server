import 'dotenv/config';

const user = process.env.mongodb_user as string;
const password = process.env.mongodb_passwort as string;
export const uri = process.env.mongodb_uri as string;
export const uploadUrl = `mongodb+srv://${user}:${password}@cluster0.oqfu7vk.mongodb.net/uploads?retryWrites=true&w=majority`;
