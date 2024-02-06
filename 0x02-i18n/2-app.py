#!/usr/bin/env python3
"""contains get_locale function"""
from flask_babel import Babel
from flask import Flask, template_render, request

app = Flask(__name__)
babel = Babel(app)


class Config:
    """language config in app"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)

babel = Babel(app)


@app.route('/', strict_slashes=False)
def hello():
    """index page"""
    return render_template("1-index.html")


@babel.localeselector
def get_locale():
    """determines best match for language"""
    return request.accept_languages.best_match(["en", "fr"])


if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')
