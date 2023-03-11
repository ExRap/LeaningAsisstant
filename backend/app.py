from flask import Flask
from flasgger import Swagger
from flask_cors import CORS
from flask_bootstrap import Bootstrap
from flask_fontawesome import FontAwesome

# from routes.users import users_endpoint
# from routes.centers import centers_endpoint

DEBUG_MODE = True
app = Flask(__name__, static_url_path="/static")
Bootstrap(app)
app.config["BOOTSTRAP_SERVE_LOCAL"] = True  # This turns file serving static
app.config["MAX_CONTENT_LENGTH"] = 20 * 1024 * 1024  # 20 Mb
FontAwesome(app)
cors = CORS(app, resources={r"*": {"origins": "*"}})

# app.register_blueprint(users_endpoint)
# app.register_blueprint(centers_endpoint)

app.config['SWAGGER'] = {
    'favicon': '/static/favicon.ico',
    'title': 'Swagger UI'
}

template = {
    "info": {
        "title": "Learning Assistant Backend API",
        "description": "",
    }
}

swagger_config = Swagger.DEFAULT_CONFIG
swagger_config["swagger_ui_css"] = "/static/swagger-ui.css"
swagger = Swagger(app, template=template, config=swagger_config)

app.run(port=5001, host="0.0.0.0", debug=DEBUG_MODE)