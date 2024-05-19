from flask import Flask, request, jsonify
from flask_cors import CORS
from chat import processUserText


app = Flask(__name__)
cors = CORS(app)
@app.route('/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        if 'userText' not in data:
            return jsonify({'error': 'Missing userText in the request JSON'}), 400

        userText = data['userText']
        try:
            return jsonify(processUserText(userText))
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)