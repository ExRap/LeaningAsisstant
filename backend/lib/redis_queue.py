import redis

class RedisQueue(object):
    """Simple Queue with Redis Backend"""
    def __init__(self, name, redis_connection, namespace='queue'):
       self.__db= redis_connection
       self.key = '%s:%s' %(namespace, name)

    def qsize(self):
        """Return the approximate size of the queue."""
        return self.__db.llen(self.key)

    def empty(self):
        """Return True if the queue is empty, False otherwise."""
        return self.qsize() == 0

    def put(self, item, priority=False):
        """Put item into the queue."""
        if not priority:
            self.__db.rpush(self.key, item)
        else:
            self.__db.lpush(self.key, item)

    def get(self, block=True, timeout=None):
        """Remove and return an item from the queue. 

        If block is True, then block until we have an item or we hit the timeout (if not None)"""
        if block:
            item = self.__db.blpop(self.key, timeout=timeout)
        else:
            item = self.__db.lpop(self.key)

        #check if the queue is empty
        if item is None:
            return None
        try:
            return item[1]
        except IndexError as ex:
            print(ex)
            return None

    def get_nowait(self):
        """Equivalent to get(False)."""
        return self.get(False)