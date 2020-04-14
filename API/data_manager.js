const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);


const carSchema = require('./msc_cars.js');



module.exports = function(mongoDBConnectionString) {
  let Car;

  return {
      connect: function(){
          return new Promise(function (resolve, reject) {
              let db = mongoose.createConnection(mongoDBConnectionString);

              db.on('error', (error) => {
                  reject(error);
              });

              db.once('open', () => {
                  Car = db.model("Cars", carSchema, "Cars");

                  resolve();
              });
          });
      },

      carGetAll: function() {
          return new Promise(function (resolve, reject) {
              Car.find()
              .exec((err, cars) => {
                  if(err) {
                      return reject(err.message);
                  }
                  return resolve(cars);
              });
          })
      },

      carGetById: function (carId) {
          return new Promise(function (resolve, reject) {
              Car.findById(carId, (err, item) => {
                  if (err) {
                      return reject(err.message);
                  }
                  if (item) { 
                      return resolve(item);
                  } else {
                      return reject ("Not found");
                  }
              })
          })
      },
      //Search for Cars based on color
      /*carByColour: function(color) {
        return new  Promise(function (resolve, reject) {
          Car.find({ Colour: {$regex: 'color'} })
          .exec((err,cars) => {
            if(err) {
              return reject(err.message);
            }
            return resolve(cars);
          })
        })
      },
      */
      carAdd: function (newCar) {
          return new Promise(function (resolve, reject) {
              Car.create(newCar, (err, item) => {
                  if (err) {
                      return reject(err.message)
                  }
                  return resolve(item);
              })
          })
      },

      carEdit: function (newCar) {
          return new Promise(function (resolve, reject) {
              Car.findByIdAndUpdate(newCar._id, newCar, {new:true}, (err, car) => {
                  if (err) {
                      return reject(err.message);
                  }
                  if (car) {
                      return resolve(car);
                  } else {
                      return reject('Not found');
                  }
              });
          })
      },

      carDelete: function (carId) {
          return new Promise(function (resolve, reject) {

              Car.findByIdAndRemove(carId, (err) => {
                  if (err) {
                      return reject(err.message);
                  }
                  return resolve();
              })
          })
      }

  }
}