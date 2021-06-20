import datetime
from sqlalchemy import desc
from models.settings import db
from utils.redis_helper import set_last_bitt, get_last_bitt


class Bitt(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=False)
    text = db.Column(db.String, unique=False)
    created = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def insert(self):
        db.add(self)
        db.commit()

        # save ID into Redis (last Bitt ID)
        set_last_bitt(self.id)

    @property
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "text": self.text,
            "created": self.created.strftime('%Y-%m-%dT%H:%M:%S'),
        }

    @classmethod
    def get_all_bitts(cls):
        bitts = db.query(cls).order_by(desc(cls.created)).all()  # get all bitts from the database

        if not bitts:
            # some pre-made bitts (you can delete them)
            bitt1 = cls(username="Bittman", text="I'm fine. Thanks for not asking.")
            db.add(bitt1)

            bitt2 = cls(username="bossbabe", text="Sometimes you have to unfollow people in real life.")
            db.add(bitt2)

            bitt3 = cls(username="karmalicious", text="I hope karma slaps you in the face before I do.")
            db.add(bitt3)

            db.commit()

            bitts.append(bitt1)
            bitts.append(bitt2)
            bitts.append(bitt3)

        return bitts

    @classmethod
    def get_last_bitt_id(cls):
        last_bitt_id = get_last_bitt()

        if last_bitt_id:
            last_bitt_id = last_bitt_id.decode()
        else:
            last_bitt = cls.get_all_bitts()[0]
            last_bitt_id = str(last_bitt.id)
            set_last_bitt(last_bitt_id)

        return last_bitt_id
