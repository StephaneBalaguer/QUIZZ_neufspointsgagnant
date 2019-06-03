var buzzBuzzers = require('buzz-buzzers');
const buzzers = buzzBuzzers();

var express = require('express');
var ent = require('ent'); // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


app.use(express.static('public'));


var buzzerlock = false; //TRUE = DESACTIVE
// Chargement de la page index.html
app.get('/', function (req, res) {
    //  res.sendfile(__dirname + '/img/1.bmp');
    //  res.sendfile(__dirname + '/img/2.bmp');
    res.sendFile(__dirname + '/neuf_points_gagnants.html');

});

app.get('/master', function (req, res) {
	res.sendFile(__dirname + '/master.html');
});




io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('reset', function (pseudo) { 
    	buzzers.setLeds(true,true,true,true);
    	buzzerlock=false;
    	socket.broadcast.emit("reset", "reset");

    });
    socket.on('cligno3s', function (pseudo) { 
    	test();
    });
    socket.on('son', function (pseudo) { 
    	socket.broadcast.emit("son", pseudo);
    });

    socket.on('test', function (pseudo) { 
    	
    	swag2();
    });

    socket.on('buzz', function(message){
    	socket.broadcast.emit("ajoutpoint", message);
    });


});



function test(){
	var i =0 ;
	while(i<3000) {
		setTimeout(allumer,i);
		setTimeout(eteindre, i+100);
		i+=200;
	}
	setTimeout(allumer,	3100);
}

function swag(){
	buzzers.setLeds(true, false, false, false);
	setTimeout(function() {
		buzzers.setLeds(true, true, false, false);
		setTimeout(function() {
			buzzers.setLeds(true, true, true, false);
			setTimeout(function() {
				buzzers.setLeds(true, true, true, true);
				setTimeout(function() {
					buzzers.setLeds(false, true, true, true);
					setTimeout(function() {
						buzzers.setLeds(false, false, true, true);
						setTimeout(function() {
							buzzers.setLeds(false, false, false, true);
							setTimeout(function() {
								buzzers.setLeds(false, false, false, false);
								setTimeout(function() {
									buzzers.setLeds(true, true, true, true);
									setTimeout(function() {
										buzzers.setLeds(false, false, false, false);
										setTimeout(function() {
											buzzers.setLeds(true, true, true, true);
											setTimeout(function() {
												buzzers.setLeds(false, false, false, false);
												setTimeout(function() {
													buzzers.setLeds(true, true, true, true);
													setTimeout(function() {
														buzzers.setLeds(false, false, false, false);
														setTimeout(function() {
															buzzers.setLeds(true, true, true, true);

														}, 250);
													}, 250);
												}, 250);
											}, 250);
										}, 250);
									}, 250);
								}, 250);
							}, 250);
						}, 250);
					}, 250);
				}, 250);
			},250);
		},250);
	},250);
}

function blinkBuzzerLeds() {

	setInterval(function() {

		buzzers.setLeds(true, true, true, true);

		setTimeout(function() {

			buzzers.setLeds(false, false, false, false);

		}, 500);

	}, 5000);
}

function allumer(){

	buzzers.setLeds(true,true,true,true);
}

function eteindre(){

	buzzers.setLeds(false,false,false,false);
}



function swag2(){
	var i =0 ;

	setTimeout(function() {buzzers.setLeds(false,false,false,false)},i);
	setTimeout(function() {buzzers.setLeds(true,false,false,false)},i+200);
	setTimeout(function() {buzzers.setLeds(true,true,false,false)},i+400);
	setTimeout(function() {buzzers.setLeds(true,true,true,false)},i+600);
	setTimeout(function() {buzzers.setLeds(false,true,true,true)},i+800);
	i=1000;
	while(i<5600) {
		
		setTimeout(function() {buzzers.setLeds(true,false,true,true)},i);
		setTimeout(function() {buzzers.setLeds(true,true,false,true)},i+200);
		setTimeout(function() {buzzers.setLeds(true,true,true,false)},i+400);
		setTimeout(function() {buzzers.setLeds(false,true,true,true)},i+600);
		i+=800;
	}
	setTimeout(allumer,	5800);
}



function clignoter(){
	buzzerlock=true;
	setTimeout(function() {
		allumer()
		setTimeout(function() {
			eteindre();
			setTimeout(function() {
				allumer()
				setTimeout(function() {
					eteindre();
					setTimeout(function() {
						allumer()
						setTimeout(function() {
							eteindre();
							setTimeout(function() {
								allumer()
								setTimeout(function() {
									eteindre();
									setTimeout(function() {
										allumer()
										setTimeout(function() {
											eteindre();
											setTimeout(function() {
												allumer()
												setTimeout(function() {
													eteindre();
													setTimeout(function() {
														allumer()
														setTimeout(function() {
															eteindre();
															setTimeout(function() {
																allumer()
																setTimeout(function() {
																	eteindre();
																	setTimeout(function() {
																		allumer()
																		setTimeout(function() {
																			eteindre();
																			setTimeout(function() {
																				allumer()
																				buzzerlock=false;
																			}, 125);
																		}, 125);
																	}, 125);
																}, 125);
															}, 125);
														}, 125);
													}, 125);
												}, 125);
											}, 125);
										}, 125);
									}, 125);
								}, 125);
							}, 125);
						}, 125);
					}, 125);
				}, 125);
			}, 125);
		}, 125);
	}, 125);
}

buzzers.onError(function(err) {

	console.log('Error:', err);

});



buzzers.onPress(function(ev) {
	if(buzzerlock == false && ev.button==0){
		console.log("[BUZZER] le buzzer " +ev.controller+ " a buzzé");
		io.sockets.emit("qui",ev.controller);
		buzzerlock=true;
		if(ev.controller == 1) {
			buzzers.setLeds(true,false,false,false);
		}
		if(ev.controller == 2) {
			buzzers.setLeds(false,true,false,false);
		}
		if(ev.controller == 3) {
			buzzers.setLeds(false,false,true,false);
		}
		if(ev.controller == 4) {
			buzzers.setLeds(false,false,false,true);
		}
	}

});

swag();
console.log("QPUC 2K19 : BOOT OK");
console.log("Neufs Points Gagnants");
console.log("Configuration : ");
console.log("Port : 8080");
console.log("Page joueurs : / ");
console.log("Page presentateur : /master");

server.listen(8080);