var express = require("express");
var bodyParser = require("body-parser");
var ObjectId = require('mongodb').ObjectID;
var app = express();
var myGenericMongoClient = require('./my_generic_mongo_client');

var jsonParser = bodyParser.json();
app.use(jsonParser);

/*// Exemple : CORS enabled with express/node-js :
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*"); //"*" ou "xy.com , ..."
res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE,OPTIONS"); //default: GET, ...
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept , Authorization");
next();
});*/

var idProdMax = 3;

//POST http://localhost:8282/catalogue/private/products 
// with body {  "name" : "gomme" , "price" : 3.5 }
app.post('/catalogue/private/products', function(req , res ) {
	var nouveauProduit = req.body ; //as javascript object

	myGenericMongoClient.genericInsertOne('products', nouveauProduit,
	   (err,newId) => {
         nouveauProduit._id = newId;
         res.send(nouveauProduit); //on renvoie souvent une copie des données postées
                          // avec un id auto incrémenté
	});
});

//http://localhost:8282/catalogue/private/products/1 (suppression selon id/pk)
app.delete("/catalogue/private/products/:id" , function(req,res,next){
	let idProd = req.params.id;
	console.log("Delete : " + idProd);
	myGenericMongoClient.genericDeleteOne('products',
		{ '_id' : new ObjectId(req.params.id) },
	   	(err,prodMongo) => {

		if (prodMongo==null) {
		  	res.status(404).send(null);	//404 = status HTTP notfound .	
		} else {
			res.send(prodMongo);
		}
	});
});


//http://localhost:8282/catalogue/public/products/1 (recherche unique par id/pk)
app.get("/catalogue/public/products/:id" , function(req,res,next){
	let idProd = req.params.id;
	console.log("Find : " + idProd);
	myGenericMongoClient.genericFindOne('products',
     	{ '_id' : new ObjectId(req.params.id) },
	   	(err,prodMongo) => {

		if (prodMongo==null) {
		  	res.status(404).send(null);	//404 = status HTTP notfound .	
		} else {
			res.send(prodMongo);
		}

	});
});
//http://localhost:8282/catalogue/public/products
//ou bien http://localhost:8282/catalogue/public/products?prixMax=2
app.get("/catalogue/public/products" , function(req,res,next){
	myGenericMongoClient.genericFindList('products',{},
	   (err,listeProduitsMongo) => {
	
		let prixMaxi = req.query.prixMax;	console.log("prixMaxi="+prixMaxi);
		if(prixMaxi == null) {
		   	res.send(/*listeProduits*/ listeProduitsMongo);
	    } else { //ne renvoyer que les produits pas trop chers .
			let listeProduitsPasTropChers = [];
			for (let p of /*listeProduits*/ listeProduitsMongo) {
				if(p.price < Number(prixMaxi)){
					listeProduitsPasTropChers.push(p);
			    }
			}
		    res.send(listeProduitsPasTropChers);
	    }   
	});
});

app.listen(8282 , function () {
console.log("http://localhost:8282/catalogue/public/products");
});

//node server.js

//npm install -g nodemon
//nodemon server.js 