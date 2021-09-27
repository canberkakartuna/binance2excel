from flask import Flask, request

app = Flask(__name__)

@app.route('/flask', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        print(request.get_json()['myFile'])
        return 'POST'
    else:
        return {'result': [
            {'id': 1, 'number': '1'},
            {'id': 2, 'number': '2'},
            {'id': 3, 'number': '3'},
            {'id': 4, 'number': '4'},
        ]}

if __name__ == "__main__":
    app.run(port=5000, debug=True)