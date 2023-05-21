const TAB_SEMAINE = [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ];

const TAB_MOIS    = [ 'Janvier', 'Février' , 'Mars'     , 'Avril'  , 'Mai'     , 'Juin'     ,
                      'Juillet', 'Août'    , 'Septembre', 'Octobre', 'Novembre', 'Décembre'  ];



window.addEventListener('load', function ()
{
	var date = new Date();

	var titreDate = document.getElementById("dateJour");
	titreDate.textContent = TAB_SEMAINE[date.getDay()] + " " + date.getDate() + " " + TAB_MOIS[date.getMonth()] + " " + date.getFullYear();

	var titreSemaine = document.getElementById("semaineAct");
	titreSemaine.textContent = "Semaine du " + ( date.getDate() - date.getDay() + 1 ) +
	                           " au "        + ( date.getDate() - date.getDay() + 7 ) +
	                           " "           + TAB_MOIS[date.getMonth()];
})