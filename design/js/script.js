const TAB_SEMAINE = [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];

const TAB_MOIS    = [ 'Janvier', 'Février' , 'Mars'     , 'Avril'  , 'Mai'     , 'Juin'     ,
                      'Juillet', 'Août'    , 'Septembre', 'Octobre', 'Novembre', 'Décembre'  ];

const TAB_JOUR    = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

var moisActuel;
var anneeActuelle;


window.addEventListener('load', function ()
{
	var date = new Date(2023, 00, 01);

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
	majMoisCalendrier( date, 16 );


	// // Mis en place des différents jours dans le calendrier
	// var premierJourMois = new Date ( date.getFullYear(), moisActuel, 01 );
})


function majMoisCalendrier ( date, ecart )
{
	moisActuel    = date.getMonth() + ecart;
	anneeActuelle = date.getFullYear();


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


	var calendrierMois = document.getElementById("date");
	calendrierMois.textContent = TAB_MOIS[moisActuel].toUpperCase();
}


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