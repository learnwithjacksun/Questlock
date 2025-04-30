import { Client, Account, Databases} from 'appwrite';

export const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export const DB = import.meta.env.VITE_DB;
export const USERS = import.meta.env.VITE_USERS;
export const ITEMS = import.meta.env.VITE_ITEMS;
export const VALUES = import.meta.env.VITE_VALUES;