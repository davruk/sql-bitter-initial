import os
import uuid
import smartninja_redis

redis = smartninja_redis.from_url(os.environ.get("REDIS_URL"))


def create_csrf_token(username):
    csrf_token = str(uuid.uuid4())
    redis.set(name=csrf_token, value=username)

    return csrf_token


def validate_csrf(csrf, username):
    redis_csrf_username = redis.get(name=csrf)  # csrf from Redis

    # if CSRF token is found in cache
    if redis_csrf_username:
        csrf_username = redis_csrf_username.decode()  # needs to be decoded from byte string
        return username == csrf_username
    else:
        return False


def set_last_bitt(bitt_id):
    redis.set(name="last-bitt-id", value=str(bitt_id))


def get_last_bitt():
    return redis.get(name="last-bitt-id")
