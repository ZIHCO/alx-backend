#!/usr/bin/env python3
"""contains the class LIFOCache that inherits from
BaseCaching"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """subclass of BaseCaching"""
    __LIFO = []

    def __init__(self):
        """instantiate an object"""
        super().__init__()

    def put(self, key, item):
        """instatanc emethod to append properties to self.cache_data"""
        if key is not None and item is not None:
            if self.is_compulsory_miss():
                self.cache_data[key] = item
                type(self).__LIFO.append(key)
            else:
                if self.hit_validator(key):
                    self.cache_data[key] = item
                else:
                    print(f"DISCARD: {type(self).__LIFO[-1]}")
                    del self.cache_data[type(self).__LIFO[-1]]
                    self.cache_data[key] = item
                    type(self).__LIFO.pop()
                    type(self).__LIFO = type(self).__LIFO.append(key)

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
