#!/usr/bin/env python3
"""app setup"""
from flask import Flask
from flask import render_template
from flask_babel import Babel


class Config:
    """language config in app"""
    LANGUAGE = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)

babel = Babel(app)


@app.route('/', strict_slashes=False)
def hello():
    """index page"""
    return render_template("1-index.html")


if __name__ == "__main__":
    app.run(port=5000, host='0.0.0.0')
