import { Collection, MongoClient } from 'mongodb'

export class MongoHelper {
    client: MongoClient | null = null

    async connect(uri: string): Promise<void> {
        if (!uri) {
            throw new Error('Connection string not loaded')
        }
        this.client = await MongoClient.connect(uri)
    }

    async disconnect(): Promise<void> {
        await this.client.close()
        this.client = null
    }

    async getCollection(name: string): Promise<Collection> {
        return this.client.db().collection(name)
    }
}