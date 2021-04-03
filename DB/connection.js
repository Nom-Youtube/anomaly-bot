const mongoose = require('mongoose');

const URI ="mongodb+srv://dbUser:dbUser@cluster0.o5jeg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('[MongoDB] Connection Successful');
};

module.exports = connectDB;