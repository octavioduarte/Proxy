export const env = {
    HTTP_METHODS: ["get", "post", "delete", "patch", "put"],
    HTTP_PORT: 8000 || process.env.HTTP_PORT,
    DB: {
        MONGO_URI: process.env.MONGO_URI
    }
}