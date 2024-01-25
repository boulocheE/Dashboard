function choixPage ( event, pageActuelle, pageSuivante, menu1, menu2 ) {
	pageSuivante = document.getElementById( pageSuivante );
	pageSuivante.style.display = 'block';

	pageActuelle = document.getElementById( pageActuelle );
	pageActuelle.style.display = 'none';


	menu1 = document.getElementById( menu1 );
	menu1.classList.remove("choix");

	menu2 = document.getElementById( menu2 );
	menu2.classList.add("choix");
}


function choixModifRecettesAction(event, id) {
	const tabIdFormulaires = ['formAjoutRecette', 'formSupprimerRecette', 'formModifierRecette'];

	document.getElementById(tabIdFormulaires[id]).style.display = 'block';

	for (var cpt = 0; cpt < tabIdFormulaires.length; cpt++)
		if ( cpt != id )
			document.getElementById(tabIdFormulaires[cpt]).style.display = 'none';
}