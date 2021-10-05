from flask import Flask, request, send_from_directory
from main import main
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
cors = CORS(app)

@app.route('/file', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return 'No file part'

        file = request.files['file']
        main(file)
        return 'File uploaded'
    else:
        return 'Method not allowed'

@app.route('/file/<path:filename>')
def download_excel(filename):
    return send_from_directory('.', 'kripto.xlsx', as_attachment=True)

if __name__ == "__main__":
    app.run(port=5000, debug=True)