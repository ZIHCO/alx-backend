#!/usr/bin/env python3
"""app setup"""
from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route('/')
def hello():
    """index page"""
    return render_template("0-index.html")
