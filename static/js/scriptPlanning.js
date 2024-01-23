const TAB_SEMAINE = [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];

const TAB_MOIS    = [ 'Janvier', 'Février' , 'Mars'     , 'Avril'  , 'Mai'     , 'Juin'     ,
					  'Juillet', 'Août'    , 'Septembre', 'Octobre', 'Novembre', 'Décembre'  ];

const TAB_JOUR    = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var moisAffiche;
var anneeAffichee;

var moisActuel;
var anneeActuelle;


window.addEventListener('load', function ()
{
	var date = new Date();

	// Calendrier → mis à jour mois
	moisAffiche    = date.getMonth();
	anneeAffichee = date.getFullYear();

	moisActuel    = date.getMonth();
	anneeActuelle = date.getFullYear();
	majMoisCalendrier( 0 );
})



function majDate (date, ajout)
{
	var jour  = date.getDate () - ajout;
	var mois  = date.getMonth() + 0;
	var annee = date.getFullYear();

	var eDateCorrecte = jour > 0 && jour <= TAB_JOUR[date.getMonth()];

	while ( !eDateCorrecte )
	{
		if ( jour <= 0 )
		{
			mois --;
			jour = TAB_JOUR[date.getMonth()] + jour;

			if ( mois <= 0 ) { mois = 11; annee --;}

			eDateCorrecte = true;
		}

		if ( jour > TAB_JOUR[date.getMonth()] )
		{
			jour = jour - TAB_JOUR[date.getMonth()];
			mois ++;

			if ( mois >= 12 ) { mois = 0; annee ++; }

			eDateCorrecte = true;
		}
	}


	// renvoyer un tableau : [ JJ , MM , AAAA ]
	return [ jour, mois, annee ];
}


function majMoisCalendrier ( ecart )
{
	moisAffiche    += ecart;


	var eMoisCorrect = moisAffiche >= 0 && moisAffiche < 12;

	while ( !eMoisCorrect )
	{
		if ( moisAffiche < 0 )
		{
			moisAffiche += 12;
			anneeAffichee --;
			eMoisCorrect = true;
		}

		if ( moisAffiche >= 12 )
		{
			moisAffiche -= 12;
			anneeAffichee ++;
			eMoisCorrect = true;
		}
	}


	// Calendrier → mis à jour jours
	majJourCalendrier();


	var hauteurPage = Math.max(
		document.documentElement.scrollHeight,
		document.body.scrollHeight             );

	var divMenu     = document.getElementById('menuPlanning');
	var hauteurMenu = divMenu.offsetHeight;

	var divJourSemaine = document.getElementById('jourSemaine');
	var hauteurJour    = divJourSemaine.offsetHeight;

	for ( let cpt = 1; cpt <= 42; cpt ++ )
	{
		var jourCalendrier = document.getElementById("jour" + cpt);
		jourCalendrier.style.height = ( hauteurPage - hauteurMenu - hauteurJour - 20 ) / 6 + 'px';
	}




	var calendrierMois;
	var celluvarab        = document.getElementById("jour1");
	var tailleCelluvarabW = celluvarab.offsetWidth;

	calendrierMois = document.getElementById("mois");
	calendrierMois.value = TAB_MOIS[moisAffiche].toUpperCase() + " " + anneeAffichee;
	calendrierMois.style.width = (tailleCelluvarabW + 5) + "px";
	calendrierMois.style.marginLeft = ( tailleCelluvarabW - calendrierMois.offsetWidth + 20 ) + tailleCelluvarabW / 2 + "px";


	var fleche;
	var hauteurFleche;

	fleche        = document.getElementById("flecheG");
	hauteurFleche = fleche.offsetHeight + "px";

	fleche.style.width = hauteurFleche;
	fleche.style.marginLeft = tailleCelluvarabW / 2 + ( tailleCelluvarabW - calendrierMois.offsetWidth + 5 ) + "px";

	fleche = document.getElementById("flecheD");
	fleche.style.width = hauteurFleche;
	fleche.style.marginLeft = "2%";
}



function majJourCalendrier ()
{
	var dateAjd = new Date();

	var datePremierJourMois = new Date ( anneeAffichee, moisAffiche, 01 );

	var iPremierJour = datePremierJourMois.getDay() > 0 ? datePremierJourMois.getDay() : 7;
	var jour = 1;


	while ( jour <= TAB_JOUR[moisAffiche] )
	{
		var calendrierMois = document.getElementById("jour" + iPremierJour);

		var divJours       = calendrierMois.querySelector("div");

		divJours.textContent      = jour;
		divJours.style.background = "white";
		divJours.style.color      = "black";

		if ( jour == dateAjd.getDate() && moisAffiche == dateAjd.getMonth() && anneeAffichee == dateAjd.getFullYear() )
		{
			divJours.style.background = "#005656";
			divJours.style.color      = "white";
		}

		iPremierJour ++;
		jour ++;
	}

	var jourMoisSuivant = 1;

	for ( let i = iPremierJour; i <= 42; i ++ )
	{
		calendrierMois = document.getElementById("jour" + i);
		divJours       = calendrierMois.querySelector("div");

		divJours.textContent = jourMoisSuivant;
		divJours.style.color = "#A2A3A3";


		jourMoisSuivant ++;
	}

	if ( datePremierJourMois.getDay() > 0 )
	{
		iPremierJour = datePremierJourMois.getDay() - 1;
		jour = moisAffiche - 1 >= 0 ? TAB_JOUR[moisAffiche - 1] : TAB_JOUR[11];

		while ( iPremierJour > 0 )
		{
			var calendrierMois = document.getElementById("jour" + iPremierJour);
			divJours       = calendrierMois.querySelector("div");

			divJours.textContent = jour;
			divJours.style.color = "#A2A3A3";

			iPremierJour --;
			jour --;
		}
	}


	for ( let i = 1; i <= 42; i++ )
	{
		calendrierMois = document.getElementById("jour" + i);
		var taille     = calendrierMois.offsetHeight - calendrierMois.offsetHeight / 3;

		calendrierMois.style.margin = "5px 0 " + taille + " 0";
	}

}


function majStyleCalendrier ()
{
	var tailleMenu = document.getElementById('maDiv');;
	tailleMenu = tailleMenu.offsetHeight;
}


function actualiser()
{
	majMoisCalendrier((anneeActuelle - anneeAffichee) * 12 + moisActuel - moisAffiche);
}



function affichage( type )
{
	var tabJour = document.getElementById("affichageJour");
	var tabMois = document.getElementById("affichageMois");
	var tabAnnee = document.getElementById("affichageAnnee");

	tabJour .style.display = "none";
	tabMois .style.display = "none";
	tabAnnee.style.display = "none";



	// Change la couleurs des boutons selon la demande de l'utilisateur
	var btnJour = document.getElementById("btnJour");
	btnJour.style.background = "#FFFFFF";
	btnJour.style.color      = "#A2A3A3";
	btnJour.style.width      = "25%";

	var btnMois = document.getElementById("btnMois");
	btnMois.style.background = "#FFFFFF";
	btnMois.style.color      = "#A2A3A3";
	btnMois.style.width      = "25%";

	var btnAnnee = document.getElementById("btnAnnee");
	btnAnnee.style.background = "#FFFFFF";
	btnAnnee.style.color      = "#A2A3A3";
	btnAnnee.style.width      = "25%";



	// Affiche le calendrier demander
	var choixAffichageTab;
	var choixAffichageBtn;
	switch (type) {
		case 1 :
			choixAffichageTab = tabJour;
			choixAffichageBtn = btnJour;
			break;

		case 2 :
			choixAffichageTab = tabMois;
			choixAffichageBtn = btnMois;
			break;

		case 3 :
			choixAffichageTab = tabAnnee;
			choixAffichageBtn = btnAnnee;
			break;
	}

	choixAffichageTab.style.display = "block";
	choixAffichageBtn.style.background = "#005656";
	choixAffichageBtn.style.color      = "#FFFFFF";
	choixAffichageBtn.style.width      = "calc( 45% + 4% / 2 )";

}