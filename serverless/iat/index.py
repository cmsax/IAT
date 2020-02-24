# -*- coding: utf8 -*-
import sqlalchemy as db

from datetime import datetime
from os import getenv
from sqlalchemy import BIGINT, Column, JSON, String, TIMESTAMP,
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

Base = declarative_base()
engine = db.create_engine(
    (
        'mysql+mysqlconnector://{user}:{password}@{host}:{port}/{db}'
        '?auth_plugin=mysql_native_password'
    ).format(
        host=getenv("MYSQL_HOST"),
        port=getenv("MYSQL_PORT"),
        password=getenv("MYSQL_USER_PWD"),
        user=getenv("MYSQL_USER"),
        db=getenv("MYSQL_DB")
    )
)
engine.connect()
Base = declarative_base()


class IAT(Base):
    __tablename__ = 'iat'
    id = Column(BIGINT, primary_key=True, autoincrement=True, nullable=True)
    ip = Column(String)
    user_agent = Column(String)
    submit_date = Column(TIMESTAMP, nullable=True, default=datetime.now())
    result = Column(JSON)


session_maker = sessionmaker(bind=engine)
s = session_maker()


def save_result(body, ip, ua):
    result = IAT(ip=ip, user_agent=ua, result=body)
    s.add(result)
    s.commit()


def main_handler(event, context):
    if event['httpMethod'] != 'POST':
        return {'msg': 'should post'}

    body = event['body']
    ip = event['requestContext']['sourceIp']
    ua = event['headers']['User-Agent']
    save_result(body, ip, ua)
    return {'msg': 'ok'}
