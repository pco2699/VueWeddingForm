// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//
const admin = require('firebase-admin');
const functions = require('firebase-functions');
admin.initializeApp();

exports.userlist = functions.https.onRequest((request, response) => {
  const json2csv = require("json2csv").parse;
  const db = admin.firestore();
  const ordersRef = db.collection('presences');
  return ordersRef.get()
    .then((querySnapshot) => {
      const orders = [];
      querySnapshot.forEach(doc => {
        const order = doc.data();
        orders.push(order);
      });
      const csv = json2csv(orders);
      response.setHeader(
        "Content-disposition",
        "attachment; filename=users.csv"
      );
      response.set("Content-Type", "text/csv");
      response.status(200).send(csv);
      return ""
    }).catch((err) => {
      response.status(200).send("エラー発生： " + err);
      return Promise.resolve();
    });
})
