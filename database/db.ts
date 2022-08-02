import mongoose from 'mongoose';

const mongooseConnection = {
    isConnected: 0
}

export const connect = async () => {
    if (mongooseConnection.isConnected) {
        console.log('Database is [already] connected ✅')
        return;
    }

    if (mongoose.connections.length > 0) {
        mongooseConnection.isConnected = mongoose.connections[0].readyState;

        if (mongooseConnection.isConnected === 1) {
            console.log('Using later connection ✅')
            return;
        }

        await mongoose.disconnect()
    }

    await mongoose.connect(process.env.MONGO_URL as string);
    mongooseConnection.isConnected = 1
    console.log('Database is connected ✅: ' + process.env.MONGO_URL)
}


export const disconnect = async () => {

    if (process.env.NODE_ENV === 'development') return;

    if (mongooseConnection.isConnected === 0) return;

    await mongoose.disconnect()
    mongooseConnection.isConnected = 0;
    console.log('Database is disconnected ✅')
}
