import * as dotenv from 'dotenv-flow';

dotenv.config()

export const env = {
    HTTP_PORT: 8000 || process.env.HTTP_PORT,
    DB: {
        MONGO_URI: process.env.MONGO_URI,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_HOST: process.env.REDIS_HOST,
        SERVERS_RULES_KEY: "servers_rules"
    }
}