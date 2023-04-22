from pydantic import BaseModel
from typing import Optional, List, Union
from datetime import datetime
from .pool import pool

class ReplyIn(BaseModel):
    forum_id: int
    answer: str
    image: Optional[str]
    rating: int


class ReplyOut(BaseModel):
    id: int
    author_id: int
    forum_id: int
    answer: str
    image: Optional[str]
    created_on : datetime = datetime.now()
    rating: int


class ReplyOutUser(BaseModel):
    id: int
    author_id: int
    forum_id: int
    answer: str
    image: Optional[str]
    created_on : datetime = datetime.now()
    rating: int
    username: str
    avatar: str
    first: str
    last: str

class Error(BaseModel):
    message:str


class ReplyRepository:

  def reply_in_to_out(
      self,
      id: int,
      reply: ReplyIn,
      account_id: int,
  ) -> ReplyOut:
      old_data = reply.dict()
      return ReplyOut(
          id=id,
          **old_data,
          author_id=account_id
      )


  def create(
    self,
    reply: ReplyIn,
    account_id: int,
    ) -> Union[ReplyOut, Error]:
      with pool.connection() as conn:
        with conn.cursor() as db:
            result = db.execute(
              """
              insert into reply
              (forum_id, answer, image, author_id, rating)
              values
                  (%s,%s,%s,%s, 0)
              returning id, created_on;
              """,
              [
                reply.forum_id,
                reply.answer,
                reply.image,
                account_id,
              ],
            )
            id = result.fetchone()[0]
            return self.reply_in_to_out(
                        id,
                        reply,
                        account_id,
            )


  def record_to_reply_out(self, record):
    return ReplyOutUser(
        id=record[0],
        author_id=record[1],
        forum_id=record[2],
        answer=record[3],
        image=record[4],
        created_on=record[5],
        rating=record[6],
        username=record[7],
        avatar=record[8],
        first=record[9],
        last=record[10]
    )



  def get_replies(
          self,
          forum_id: int
  ) -> List[ReplyOutUser]:
      with pool.connection() as conn:
          with conn.cursor() as db:
              result = db.execute(
                  """
                    select z.id, z.author_id,
                    z.forum_id, z.answer,
                    z.image, z.created_on AT TIME ZONE 'UTC' AT TIME ZONE 'US/Pacific',
                    z.rating, a.username,
                    a.avatar, a.first, a.last
                    from reply as z
                    left join accounts as a
                    on a.id= z.author_id
                    where z.forum_id = %s;
                  """,
                  [forum_id],
              )
              return [ self.record_to_reply_out(record) for record in result ]
