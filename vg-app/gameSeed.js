const mongoose = require('mongoose');
const Game = require('./routes/models/games');
const gameSeed = require('./game.json');
require('dotenv').config();


const seedFunc = async() => {
    try {
        const data = await Game.create(gameSeed);
        console.log(`${data.length} records created`);
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
        process.exit(0);

    } catch (error) {
        console.error(error)
        process.exit(1)
    }


}

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}, () => {
    mongoose.connection.db.dropDatabase()
}
)
.then(()=> {
    console.log('MongoDB connected')
    seedFunc()
}).catch((err) => {console.log(`mongodb error ${err}`)})