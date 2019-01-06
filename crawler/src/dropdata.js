const mongoose = require('mongoose');
const config = require('../../config');

mongoose.connect(config.mongodb, { useNewUrlParser: true }, function () {
    mongoose.connection.db.dropDatabase();
});
