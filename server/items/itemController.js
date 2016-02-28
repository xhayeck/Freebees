/*itemController.js uses someFunc().then(success).catch(err) (method #1) to handle errors,
whereas controller.js uses someFunc().then(onSuccess, onFailure) to handle errors (method #2).
These two ways are similar, although method #2 is considered an anti-pattern
since onFailure only gets called if someFunc() fails, whereas .catch() gets called
if either someFunc() or .then() fails. Method #2 also closely resembles traditional callback hell
whereas method #1 more closely resembles promise methodology. Method #2 can sometimes be helpful
for some edge cases. We use both methods for practice implementing both and remain consistent within each
individual file.*/

var mongoose = require('mongoose');

//Item is a model (i.e. row) that fits into the db, it has itemName and itemLocation props
var Item = require('./itemModel.js');

//Q's nbind() method used below to promisify methods, although this will only be helpful for future features
var Q = require('q');

module.exports = {
  saveItem : function (req, res) {
    //extract itemName and itemLocation from the post request's body
    var itemName = req.body.item;
    var itemLocation = req.body.LatLng;
    var date = req.body.createdAt;
    var eventTime=req.body.eventTime;
    var create;

    //The below line returns promisified version of Item.findOne bound to context Item
    //This is necessary because we will only create a new model after we search the db to see if it already exists
    var findOne = Q.nbind(Item.findOne, Item);

    //The below line searches the database for a pre-existing row in db that exactly matches the user input
    findOne({itemName: itemName, itemLng: itemLocation.lng, itemLat: itemLocation.lat})

      .then(function(item){

        //If the item already exists in db, notify the user they need to try again
        if (item){
          console.log('That item is already being offered from that location \n Try offering something new');
          res.status(400).send('invalid request');
        //Otherwise we're going to create and save the user's submitted item
        } else {
          //Q.nbind() promisifies its first argument, so now you could chain a .then() after create
          //the .then() below could be helpful for future features
          create = Q.nbind(Item.create, Item);
          newItem = {
            itemName: itemName,
            itemLocation: itemLocation,
            itemLng: itemLocation.lng,
            itemLat: itemLocation.lat,
            eventTime: eventTime,
            createdAt: date
          };

          // In mongoose, .create() automaticaly creates AND saves simultaneously
          create(newItem)
            .then(function(data){
              res.send(data);
            })
            .catch(function(err){
              console.log('Error when create invoked - creating newItem and saving to db failed. Error: ', err);
            });
        }
      })
      .catch(function(err){
        console.log('Error when findOne invoked - searching db for specific item failed. Error: ', err);
      });
  },

  saveWork: function(req,res) {

    var worker = req.body.worker;
    var workerLocation = req.body.LatLng;
    var date = req.body.createdAt;
    var create;

    var findOne = Q.nbind(Item.findOne, Item);

    findOne({
      worker: worker,
      workerLng: workerLocation.lng, 
      workLat: workerLocation.lat
    })

    then(function(person) {
      if(person) {
        console.log("Hey! You're already asking for free labor! Knock it off!");
        res.status(400).send('invalid request');
      } else {
        create = Q.nbind(Item.findOne, Item);

        newWorker = {
            worker: worker,
            workLocation: workLocation,
            workLng: workLocation.lng,
            workLat: workLocation.lat,
            eventTime: eventTime,
            createdAt: date
          };

          create(newWorker)
            .then(function(data) {
              res.send(data);
            })
            .catch(function(err) {
              console.log("Nope. Creation FAILURE. Either didn't create or didn't save to database!")
            });
      }
    })

    .catch(function(err) {
      console.log('Whoops. Something went wrong buddy. Check error: ', err);
    });
  },

  //The below function returns all rows from the db. It is called whenever user visits '/' or '/api/links'
  getAllItems: function(req, res){

    //promisify Item.find so that it can have a .then() chained to it
    var findAll = Q.nbind(Item.find, Item);

    //search db for an empty object, i.e. return everything in the db
    findAll({})
      .then(function(items){

        //sends all the rows in the db, which then get used in initMap function within
        //success callback of loadAllItems in app.js
        res.json(items);
      })
      .catch(function(err){
        console.log('Error when findAll invoked - retrieving all items from db failed. Error: ', err);
      });
  },
  removeItem: function(req, res){
    var itemName = req.body.item;
    var itemLocation = req.body.LatLng;

    var removeItem = Q.nbind(Item.remove, Item);
    removeItem({itemName: itemName, itemLng: itemLocation.lng, itemLat: itemLocation.lat})
      .then(function(item){

        //If the item already exists, throws an error
        if (!item){
          res.status(400).send('invalid request, item does not exist');
        } else {
          res.send('item deleted');
        }
      })
      .catch(function(err){
        console.log('Error when removeItem invoked - deleting row from db failed. Error: ', err);
      });
  }
};


