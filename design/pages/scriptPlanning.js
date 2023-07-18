const TAB_SEMAINE = [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];

const TAB_MOIS    = [ 'Janvier', 'Février' , 'Mars'     , 'Avril'  , 'Mai'     , 'Juin'     ,
					  'Juillet', 'Août'    , 'Septembre', 'Octobre', 'Novembre', 'Décembre'  ];

const TAB_JOUR    = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var moisActuel;
var anneeActuelle;


window.addEventListener('load', function ()
{
	var date = new Date();

	// Calendrier → mis à jour mois
	moisActuel    = date.getMonth();
	anneeActuelle = date.getFullYear();

	majMoisCalendrier( 0 );
})



function majDate (date, ajout)
{
	var jour  = date.getDate () - ajout;
	var mois  = date.getMonth() + 0;
	var annee = date.getFullYear();

	let eDateCorrecte = jour > 0 && jour <= TAB_JOUR[date.getMonth()];

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
	moisActuel    += ecart;


	let eMoisCorrect = moisActuel >= 0 && moisActuel < 12;

	while ( !eMoisCorrect )
	{
		if ( moisActuel < 0 )
		{
			moisActuel += 12;
			anneeActuelle --;
			eMoisCorrect = true;
		}

		if ( moisActuel >= 12 )
		{
			moisActuel -= 12;
			anneeActuelle ++;
			eMoisCorrect = true;
		}
	}


	// var calendrierMois = document.getElementById("mois");
	// calendrierMois.textContent = TAB_MOIS[moisActuel].toUpperCase() + " " + anneeActuelle;


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
		jourCalendrier.style.height = ( hauteurPage - hauteurMenu - hauteurJour - 30 ) / 6 + 'px';
	}
}



function majJourCalendrier ()
{
	var dateAjd = new Date();

	var datePremierJourMois = new Date ( anneeActuelle, moisActuel, 01                   );

	var iPremierJour = datePremierJourMois.getDay() > 0 ? datePremierJourMois.getDay() : 7;
	var jour = 1;


	while ( jour <= TAB_JOUR[moisActuel] )
	{
		let calendrierMois = document.getElementById("jour" + iPremierJour);

		let divJours       = document.createElement("div");
		divJours.innerHTML = jour;

		calendrierMois.appendChild(divJours);

		divJours.style.color      = "black";
		divJours.style.background = "white";

		if ( jour == dateAjd.getDate() && moisActuel == dateAjd.getMonth() && anneeActuelle == dateAjd.getFullYear() )
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
		let calendrierMois = document.getElementById("jour" + i);

		let divJours       = document.createElement("div");

		divJours.innerHTML   = jourMoisSuivant;
		divJours.style.color = "#A2A3A3";

		calendrierMois.appendChild(divJours);

		jourMoisSuivant ++;
	}

	if ( datePremierJourMois.getDay() > 0 )
	{
		iPremierJour = datePremierJourMois.getDay() - 1;
		jour = moisActuel - 1 >= 0 ? TAB_JOUR[moisActuel - 1] : TAB_JOUR[11];

		while ( iPremierJour > 0 )
		{
			let calendrierMois = document.getElementById("jour" + iPremierJour);

			let divJours       = document.createElement("div");

			divJours.innerHTML = jour;
			divJours.style.color = "#A2A3A3";

			calendrierMois.appendChild(divJours);

			iPremierJour --;
			jour --;
		}
	}


	for ( let i = 1; i <= 42; i++ )
	{
		calendrierMois = document.getElementById("jour" + i);
		var taille     = calendrierMois.offsetHeight - calendrierMois.offsetHeight / 3;

		calendrierMois.style.margin = "5px 0 taille 0";
	}

}


function majStyleCalendrier ()
{
	var tailleMenu = document.getElementById('maDiv');;
	tailleMenu = tailleMenu.offsetHeight;
}	