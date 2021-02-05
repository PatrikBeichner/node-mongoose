const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect.then(() => {
  console.log('Connected correctly to server');
  // create new document based on mongoose model named Campsite
  const newCampsite = new Campsite({
    name: 'React Lake Campground',
    description: 'test',
  });
  // Save document, automatically adding it to the campsites collection
  newCampsite
    .save()
    .then((campsite) => {
      console.log(campsite);
      return Campsite.find();
    })
    // find and log all documents instantiated from the campsite model
    .then((campsites) => {
      console.log(campsites);

      // delete all documents and close connection
      return Campsite.deleteMany();
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
      mongoose.connection.close();
    });
});
