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



if __name__ == '__main__':
	app.run(debug=True)
