#!/usr/bin/env python3
"""app setup"""
from flask import Flask
from flask import render_template
from flask_babel import Babel

app = Flask(__name__)


@app.route('/')
def index():
    """index page"""
    return render_template("1-index.html")


class Config:
    """language config in app"""
    LANGUAGE = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel = Babel(app)
