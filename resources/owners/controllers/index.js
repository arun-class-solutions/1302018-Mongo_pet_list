// MongoDB connection
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const mongoUrl = "mongodb://localhost:27017/pet_list_db";

module.exports = (req, res) => {
  // Find all owners from the "owners" collection here
  // Aggregate them using the $lookup operator to join their associated pets
  // Call the method below, passing in the owners array:
  MongoClient.connect(mongoUrl, (err, db) => {
    db
    .collection("owners")
    .aggregate([
      {
        $lookup: {
          from: "pets",
          localField: "_id",
          foreignField: "ownerId",
          as: "pets"
        }
      }
    ])
    .toArray((err, owners) => {
      db.close();
      // Render index template with owner records from Mongo
      res.render("index", {
        owners: owners
      });
    });
  });

  // res.render("index", {
  //   owners: ownersArray
  // });
}
