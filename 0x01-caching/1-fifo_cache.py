#!/usr/bin/env python3
"""contains the class FIFOCache that inherits from
BaseCaching"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """subclass of BaseCaching"""
    __FIFO = []

    def __init__(self):
        """instantiate an object"""
        super().__init__()

    def put(self, key, item):
        """instatanc emethod to append properties to self.cache_data"""
        if key is not None and item is not None:
            if self.is_compulsory_miss():
                self.cache_data[key] = item
                type(self).__FIFO.append(key)
            else:
                if self.hit_validator(key):
                    self.cache_data[key] = item
                else:
                    print(f"DISCARD: {type(self).__FIFO[0]}")
                    del self.cache_data[type(self).__FIFO[0]]
                    self.cache_data[key] = item
                    type(self).__FIFO = type(self).__FIFO[1:]
                    type(self).__FIFO.append(key)

    def get(self, key):
        """returns self.cache_data[key]"""
        if key is not None:
            try:
                return self.cache_data[key]
            except KeyError:
                return None
        return None

    def hit_validator(self, key):
        """return a boolean"""
        if key in self.cache_data:
            return True
        return False

    def is_compulsory_miss(self):
        """return a boolean"""
        if len(self.cache_data) < type(self).MAX_ITEMS:
            return True
        return False
