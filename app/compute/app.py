from flask import Flask, jsonify
from biosearch import align

app = Flask(__name__)

@app.route('/')
def index():
    return jsonify({'status': 'UP'})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

