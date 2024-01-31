#!/usr/bin/env python3
"""contains the class BasicCache that inherits from
BaseCaching"""
from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """subclass of BaseCaching"""

    def put(self, key, item):
        """instatanc emethod to append properties to self.cache_data"""
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """returns self.cache_data[key]"""
        if key is not None:
            try:
                return self.cache_data[key]
            except KeyError:
                return None
        return None
