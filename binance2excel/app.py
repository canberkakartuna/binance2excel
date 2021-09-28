from flask import Flask, request
from main import main

app = Flask(__name__)

@app.route('/flask', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        print(request.files)
        #main(request.data)
        return 'POST'

if __name__ == "__main__":
    app.run(port=5000, debug=True)