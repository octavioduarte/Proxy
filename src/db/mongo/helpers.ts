import { MongoClient } from 'mongodb'

export class MongoHelper {
    client: MongoClient | null = null

    async connect(url: string): Promise<void> {
        this.client = await MongoClient.connect(url)
    }

    async disconnect(): Promise<void> {
        await this.client.close()
        this.client = null
    }
}