import os
import json
import pytest
from main import app
from models.settings import db


@pytest.fixture
def client():
    app.config['TESTING'] = True
    os.environ["DATABASE_URL"] = "sqlite:///:memory:"
    client = app.test_client()

    cleanup()  # clean up before every test

    db.create_all()

    yield client


def cleanup():
    # clean up the DB
    db.drop_all()


def test_index(client):
    response = client.get('/')
    assert b'Post new bitt' in response.data


def test_bitt_create(client):
    response_post = client.post('/create-bitt',
                                data=json.dumps({"text": "Some bitt text", "username": "bittmeister"}),
                                content_type='application/json',
                                follow_redirects=True)

    assert 'Some bitt text' in response_post.json.get("text")
