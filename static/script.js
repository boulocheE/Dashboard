const TAB_SEMAINE = [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];

const TAB_MOIS    = [ 'Janvier', 'Février' , 'Mars'     , 'Avril'  , 'Mai'     , 'Juin'     ,
                      'Juillet', 'Août'    , 'Septembre', 'Octobre', 'Novembre', 'Décembre'  ];

const TAB_JOUR    = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var moisActuel;
var anneeActuelle;


window.addEventListener('load', function ()
{
	var date = new Date();

	var titreDate = document.getElementById("dateJour");
	titreDate.textContent = TAB_SEMAINE[date.getDay()] + " " + date.getDate() + " " + TAB_MOIS[date.getMonth()] + " " + date.getFullYear();

	var titreSemaine = document.getElementById("semaineAct");


	// Indiquer la semaine, les dates
	let iJour = date.getDay() == 0 ? 6 : date.getDay() - 1;

	var lundi = majDate(date, iJour    );
	var dim   = majDate(date, iJour - 6 );

	var res   = "Semaine du " + lundi[0]

	if ( lundi[0] > dim[0] ) res += " " + TAB_MOIS[lundi[1]];

	res += " au " + dim[0] + " " + TAB_MOIS[dim[1]];

	titreSemaine.textContent = res;


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


	var calendrierMois = document.getElementById("mois");
	calendrierMois.textContent = TAB_MOIS[moisActuel].toUpperCase() + " " + anneeActuelle;


	// Calendrier → mis à jour jours
	majJourCalendrier();
}



function majJourCalendrier ()
{
	var dateAjd = new Date();

	var datePremierJourMois = new Date ( anneeActuelle, moisActuel, 01                   );

	var iPremierJour = datePremierJourMois.getDay() > 0 ? datePremierJourMois.getDay() : 7;
	var jour = 1;


	while ( jour <= TAB_JOUR[moisActuel] )
	{
		var calendrierMois = document.getElementById("jour" + iPremierJour);
		calendrierMois.textContent      = jour;
		calendrierMois.style.color      = "black";
		calendrierMois.style.background = "white";

		if ( jour == dateAjd.getDate() && moisActuel == dateAjd.getMonth() && anneeActuelle == dateAjd.getFullYear() )
		{
			calendrierMois.style.background = "#005656";
			calendrierMois.style.color      = "white";
		}

		iPremierJour ++;
		jour ++;
	}

	var jourMoisSuivant = 1;

	for ( let i = iPremierJour; i <= 42; i ++ )
	{
		var calendrierMois = document.getElementById("jour" + i);
		calendrierMois.textContent = jourMoisSuivant;
		calendrierMois.style.color = "#A2A3A3";

		jourMoisSuivant ++;
	}

	if ( datePremierJourMois.getDay() > 0 )
	{
		iPremierJour = datePremierJourMois.getDay() - 1;
		jour = moisActuel - 1 >= 0 ? TAB_JOUR[moisActuel - 1] : TAB_JOUR[11];

		while ( iPremierJour > 0 )
		{
			var calendrierMois = document.getElementById("jour" + iPremierJour);
			calendrierMois.textContent = jour;
			calendrierMois.style.color = "#A2A3A3";

			iPremierJour --;
			jour --;
		}
	}

}