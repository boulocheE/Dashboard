import pymongo



# Remplacez "nom_de_la_base_de_donnees" par le nom de votre base de données MongoDB
client = pymongo.MongoClient("mongodb+srv://boulocheeleonore28:testMdp159357@cluster0.jafpaxg.mongodb.net/?retryWrites=true&w=majority")
db     = client["Dashboard"]



# |----------------------------------------|
# |                                        |
# |  PARTIE     -    Création des tables   |
# |                                        |
# |----------------------------------------|

tableCategorie      = db["Categorie"     ]
tableIngredient     = db["Ingredient"    ]
tableRecette        = db["Recette"       ]
tableContenuRecette = db["ContenuRecette"]





# |----------------------------------------|
# |                                        |
# |  PARTIE     -    Insertions des tuples |
# |                                        |
# |----------------------------------------|

def addRecette ( nom, commRecette, categorie, ingredients ) :
	insertCategorie( categorie )

	idCategorie = list(selectParCategorie( categorie ))[0]['id']
	print( idCategorie )


	idMax     = (selectIdMaxRecette())['id']
	idRecette = idMax + 1 if idMax is not None else 0

	print(idMax)
	print(idRecette)


	# Insertion recette
	insertRecette( idRecette, idCategorie, nom, commRecette )
	print( list(selectCategorie()) )


	for ing in ingredients :
		# Insertion ingrédients
		tmp = insertIngredient( ing[0] )
		print( "tmp", tmp )
		print( list(selectIngredient()) )

		# Insertion contenu
		insertContenu ( idRecette, tmp, ing[1], ing[2] )
		print( list(selectContenuRecette()) )




# Insertion recette
def insertRecette ( idRecette, idCategorie, nom, commRecette ) :
	if tableCategorie.find_one({ "id": idRecette, "idCategorie" : idCategorie }) is None:
		tableRecette.insert_one ({ "id"          : idRecette,
		                           "idCategorie" : idCategorie,
		                           "nom"         : nom,
		                           "commentaire" : commRecette })



# Insertion catégorie
def insertCategorie(nom):
	# Check if the category with the given name already exists
	if tableCategorie.find_one({"nom": nom}) is None:
		# If it doesn't exist, get the maximum category ID and generate a new ID
		idCatMax = selectIdMaxCategorie()
		idCat = idCatMax + 1 if idCatMax is not None else 0

		# Insert the new category into the table
		tableCategorie.insert_one({"id": idCat, "nom": nom})



# Insertion ingrédient
def insertIngredient ( nom ) :
	idCatMax = selectIdMaxIngredient()["id"]
	idCat    = idCatMax + 1 if idCatMax is not None else 0

	if tableIngredient.find_one({ "nom" : nom }) is None :
		tableIngredient.insert_one ({ "id"  : idCat,
		                              "nom" : nom })

	return idCat



# Insertion contenu
def insertContenu ( idRecette, idIngredient, quantite, commentaire ) :
	tableContenuRecette.insert_one ({ "idRecette"    : idRecette,
									  "idIngredient" : idIngredient,
									  "quantite"     : quantite,
									  "commentaire"  : commentaire })





# |----------------------------------------|
# |                                        |
# |  PARTIE     -    Requêtes des tuples   |
# |                                        |
# |----------------------------------------|
def selectCategorie () :
	return tableCategorie.find()

def selectIngredient () :
	return tableIngredient.find()

def selectRecette () :
	return tableRecette.find()

def selectContenuRecette () :
	return tableContenuRecette.find()


def selectParCategorie ( categorie ) :
	return tableCategorie.find({ "nom" : categorie })


def selectIdCat ( categorie ) :
	document = tableCategorie.find({ "nom" : categorie })

	return document.get( "id", None )


def selectIdMaxCategorie () :
	return tableCategorie.find_one( sort = [("id", pymongo.DESCENDING)] )

def selectIdMaxRecette () :
	return tableRecette.find_one( sort = [("id", pymongo.DESCENDING)] )

def selectIdMaxIngredient () :
	return tableIngredient.find_one( sort = [("id", pymongo.DESCENDING)] )




addRecette ( "Test", "Test ajeal zkrj", "Plat", [("sel", "1 pincée", "test"), ("poulet", "3g", "")] )
# tableCategorie.insert_one( { "test" : "rrr" } )
# print(tuple(tableCategorie.find()))
# print ( list(tableCategorie.find()) )


"""
collection = database["nom_de_la_collection"]
data = {"nom": "John", "age": 30, "ville": "Paris"}
result = collection.insert_one(data)
print("ID du document inséré:", result.inserted_id)


# Récupérer tous les documents dans la collection
documents = collection.find()

for document in documents:
	print(document)


# Mettre à jour un document
filter_query = {"nom": "John"}
update_query = {"$set": {"age": 31}}
result = collection.update_one(filter_query, update_query)
print("Nombre de documents mis à jour:", result.modified_count)



# Supprimer un document
delete_query = {"nom": "John"}
result = collection.delete_one(delete_query)
print("Nombre de documents supprimés:", result.deleted_count)
"""