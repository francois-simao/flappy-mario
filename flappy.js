
//ON DEFINI TOUTES NOS VARIABLES
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
var mario = new Image();
var fond = new Image();
var tuyau1 = new Image();
var tuyau2 = new Image();
var gameover = new Image();
var saut = new Audio();
var gos = new Audio();
var button = document.getElementById("toPlay");
var title = document.getElementById("title");
var gap = 110;
var constant;
var score = 0;
var state;





//ON ASSIGNE LES VALEURS
mario.src = "images/mario.png";
fond.src = "images/fond.png";
fond.src = "images/fond.png";
tuyau1.src = "images/tuyau1.png";
tuyau2.src = "images/tuyau2.png";
gameover.src = "images/game-over.jpg";
saut.src = "images/souffrir.mp3";


//ON DEFINI LA POSITION INITIALE DE NOTRE PERSONNAGE
var MarioX = 20;
var MarioY = 150;
var MarioH = 50;
var tuyau1X = 500;
var tuyau1Y = 300;
var tuyau2X = 500;
var tuyau2Y = 0;

//ON DEFINI LA GRAVITE
var gravite = 0.8;

//ON DEFINI LES ACTIONS AU CLAVIER OU AU CLIC
document.addEventListener("keydown", monte)


// document.addEventListener("click", reload)

//ON DEFINI L'ACTION A FAIRE LORSQUE L'ON CLIQUE
function monte() {
	MarioY -= 35;
	saut.play();
}
//ON DEFINI LA FONCTION DE RELOAD DE LA PAGE
function reload() {
	location.reload();
}

//ON DEFINI LA FONCTION GAME OVER
function gameOver(){
	ctx.drawImage(gameover, 0,0); //(nom de la variable, x, y)
}

//ON DEFINI NOTRE TABLEAU DES POSITION DES TUBES
var pipe = [];
pipe[0] = { // POSITION INITIALE, INDEX 0
	x: cvs.width, //POSITION X INITIALE
	y: 0 //POSITION Y INITIALE
};






//ON MET EN PLACE TOUS LES ELEMENTS DANS NOTRE CANEVAS
function dessineAnimation() {

	button.style.visibility ="hidden";
	title.style.visibility = "hidden";

	
// SI ETAT = 1 DONC PERDU TU APPELLES LA FONCTION GAMEOVER GAME OVER SINON TU DESSINES LE FOND
if(state=="1"){
	gameOver();
}
else{
	ctx.drawImage(fond, 0, 0);
}

	// on dessine les obstacles
	for (var i = 0; i < pipe.length; i++) {
		constant = tuyau2.height + gap;
		//ON DESSINE LE TUYAUX DU HAUT
		ctx.drawImage(tuyau2, pipe[i].x, pipe[i].y);
		//ON DESSINE LE TUYAUX DU BAS
		ctx.drawImage(tuyau1, pipe[i].x, pipe[i].y + constant);
	

		pipe[i].x--;

		//AJOUTE UN NOUVEL ENREGISTEMENT DANS LE TABLEAU QUAND UN TUBE ATTEIND 320PX EN X
		if (pipe[i].x == 320 ) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * tuyau2.height) - tuyau2.height //floor -> arrondi, random -> aléatoire

				//EXPLACTION 
				//si tuyaux = 250px de haut alors y = (nombre aleatoire entre 0 et 1 * 250) - 250

			});
		}
		//mise en place du score
		if(pipe[i].x === 0){ // si le tuyau atteint x0 on accrémente le score de +1
			score++
			}

		//mise en place des colisions
			if(
					 MarioX + mario.width >= pipe[i].x && MarioX <= pipe[i].x + tuyau2.width && (MarioY <= pipe[i].y + tuyau2.height
					|| MarioY+mario.height >= pipe[i].y+constant)
					|| MarioY + MarioH >=  cvs.height || MarioY <= 0){


						//si colision
						gravite = 0;
						pipe = []
						MarioX = -500;
					
						state="1";
						setTimeout (reload, 2000);


			        }

	
	}// fin de la boucle for

	//on dessine mario
	ctx.drawImage(mario, MarioX, MarioY);

	//on applique la gravité à mario
	MarioY += gravite;

//affichage du score
ctx.fillStyle = "red";
ctx.font = "3rem Arial";
ctx.fillText(score, 20, cvs.height-350); //(nom de la variable, pos x , pos y)

	//ON NOTIFIE AU NAVIGATEUR QUE L'ON SOUHAITE EXECUTER UNE ANIMATION ET ON DEMANDE QUE CELUI-CI EXECUTE UNE FONCTION SPECIFIQUE DE MISE A JOUR
	requestAnimationFrame(dessineAnimation);

}
