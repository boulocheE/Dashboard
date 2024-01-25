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