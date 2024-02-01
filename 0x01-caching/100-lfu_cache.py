#!/usr/bin/env python3
"""contains the class LFUCache that inherits from
BaseCaching"""
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """subclass of BaseCaching"""

    __LFU = {}
    __MFC = []

    def __init__(self):
        """instantiate the object"""
        super().__init__()

    def put(self, key, item):
        """instance method to append properties to self.cache_data"""
        if key is not None and item is not None:
            if self.is_compulsory_miss():
                self.cache_data[key] = item
                type(self).__MFC.append(key)
                type(self).__LFU[key] = 1
            elif self.hit_validator(key):
                self.cache_data[key] = item
                type(self).__LFU[key] += 1
                index = type(self).__MFC.index(key)
                hit_key = type(self).__MFC[index]
                del type(self).__MFC[index]
                type(self).__MFC.append(hit_key)
            else:
                lfu = min(type(self).__LFU)
                print(f"DISCARD: {lfu}")
                del type(self).__LFU[lfu]
                del self.cache_data[lfu]
                self.cache_data[key] = item
                type(self).__LFU[key] = 1
                type(self).__MFC = type(self).__MFC[1:]
                type(self).__MFC.append(key)

    def get(self, key):
        """returns self.cache_data[key]"""
        if key is not None:
            try:
                return self.cache_data[key]
            except KeyError:
                return None
        return None

    def hit_validator(self, key):
        """validate that if entry is a hit"""
        if key in self.cache_data:
            return True
        return False

    def is_compulsory_miss(self):
        """validate compulsory_miss"""
        if len(self.cache_data) < type(self).MAX_ITEMS:
            return True
        return False
