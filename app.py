from flask import Flask, render_template


app = Flask(__name__)

# dossier static : utilisation des images, js, css
app.static_folder = 'static'



# FICHIER HTML INDEX
@app.route('/')
def index() :
	return render_template('index.html')

@app.route('/pages/CheckList')
def checkList() :
	return render_template('pages/checkList.html')

@app.route('/pages/coursRessources')
def coursRessources() :
	return render_template('pages/coursRessources.html')

@app.route('/pages/planning')
def planning() :
	return render_template('pages/planning.html')

@app.route('/pages/recettes')
def recettes() :
	return render_template('pages/recettes.html')

@app.route('/pages/sport')
def sport() :
	return render_template('pages/sport.html')




@app.route('/ajoutRecette', methods = ['POST'])
def ajoutRecette() :
	


	if 'text' in request.form:
		text = request.form['text']

		if len(text.split()) <= 3 :
			return render_template('pages/text.html', erreur = "Your text must contain at least 4 words. Try again.")

		if len(text.split()) > 100 :
			return render_template('pages/text.html', erreur = "Your text must contain less than 100 words. Try again.")


		res = main(text)


		return render_template('pages/text.html', resultat = res)

	return render_template( 'pages/text.html', erreur = "Failure in the sending process. Try again." )




if __name__ == '__main__':
	app.run(debug=True)
