import mongoose from 'mongoose';

const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log('데이터베이스에 이미 연결됨');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('데이터베이스에 대한 이전 연결을 사용합니다.');
      return;
    }
    await mongoose.disconnect();
  }
  mongoose.set('strictQuery', false);
  const db = await mongoose.connect(`${process.env.MONGODB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('데이터베이스에 새로 연결.');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_END === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('데이터베이스에서 연결이 끊어지지 않습니다.');
    }
  }
}

const db = { connectDb, disconnectDb };
export default db;
