from flask import*
from flask import render_template, send_file
import os, shutil, datetime
from PyPDF2 import PdfReader
import requests

YOUR_BARD_API_HERE="" # Add your bard api

def generate_gemini_content(prompt):
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDt3z1rGvxjWYSB-6ontun8Usplgw3wXqU"
    data = {"contents": [{"parts": [{"text": prompt}]}]}
    headers = {"Content-Type": "application/json"}
    response = requests.post(url.format(api_key=YOUR_BARD_API_HERE), json=data, headers=headers)
    response.raise_for_status()  # Raise an exception for error responses
    return response.json()["candidates"][0]["content"]["parts"][0]["text"].replace("*","")

def rndm():
	return str(datetime.datetime.now()).replace(" ","").replace(".","").replace("-","").replace(":","")

def get_text_from_pdf(folder):
	text = ""
	for x in os.listdir(folder):
		u =PdfReader(folder+"/"+x).pages
		n=0
		while n < len(u):
			text=text+u[n].extract_text()
			n=n+1
	return text

app = Flask(__name__, static_folder="static", template_folder=os.getcwd())

@app.route("/", methods=["GET","POST"])
def a():
	if request.method == "POST":
		w= [request.form["username"],request.form["password"],request.form["email"]]
		if w[0] in os.listdir("accounts"):
			if w[1] == open(f"accounts/{w[0]}/details.txt","r").read().split("\n")[0]:
				return render_template("dashboard.html", msg="none")
			else:
				return render_template("index.html", msg="Wrong credentials")
		else:
			return render_template("index.html", msg="Wrong credentials")
	else:
		return render_template("index.html", msg="none")

@app.route("/create", methods=["GET","POST"])
def b():
	if request.method == "POST":
		w= [request.form["username"],request.form["password"],request.form["email"], request.form["name"]]
		if " " not in w[0]:
			if w[0] not in os.listdir("accounts"):
				os.mkdir(f"accounts/{w[0]}")
				open(f"accounts/{w[0]}/details.txt","w").write(f"{w[1]}\n{w[2]}\n{w[3]}")
				return render_template("dashboard.html", msg="none")
			else:
				return render_template("register.html", msg="Account already exists")
		else:
			return render_template("register.html", msg="Don't use space in username")
	else:
		return render_template("register.html", msg="none")

@app.route("/sub", methods=["POST"])
def c():
	t = rndm()
	os.mkdir(t)
	w= request.files.getlist("files")
	for i in w:
		i.save(f"{t}/{i.filename}")
	p = get_text_from_pdf(t)
	shutil.rmtree(t)
	c=generate_gemini_content(p)
	return render_template("result.html",data=p)

@app.route("/query", methods=["POST"])
def d():
	return generate_gemini_content(request.form["data"])

if __name__ == '__main__':
	app.run(debug=True)