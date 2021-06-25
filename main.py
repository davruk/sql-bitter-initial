from flask import Flask
from handlers.bitts import bitt_handlers
from models.settings import db
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(bitt_handlers)

# IMPORTANT: CORS allows clients from other sources to send requests to your API.
# If your front-end code is on the same domain, turn this off by deleting this line:
CORS(app)

# create tables in a database (important: this does not update tables, only creates new ones)
db.create_all()

if __name__ == '__main__':
    app.run(debug=True, host="localhost", port="5000")
