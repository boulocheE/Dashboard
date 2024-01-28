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



function supprimerLigne(event) {
	const bouton = event.target;
	const ligneASupprimer = bouton.parentNode.parentNode;

	ligneASupprimer.remove();
}


function ajouterLigne() {
	const table = document.getElementById("tableAjoutIngr").getElementsByTagName('tbody')[0];
	const nouvelleLigne = table.insertRow(-1);

	for ( let cpt = 0; cpt < 3; cpt ++ )
		nouvelleLigne.insertCell(cpt).innerHTML = "<input type = \"text\"></input>";

	nouvelleLigne.insertCell(3).innerHTML = "<input type = \"button\" onclick = \"supprimerLigne(event)\" value = \"Supprimer\">";
}



function newCatRecette () {
	const label = document.getElementById("newCatRecette");
	label.style.display = "bloc";
}