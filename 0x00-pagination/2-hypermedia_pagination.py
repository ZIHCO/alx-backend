#!/usr/bin/env python3
"""contains the class Server"""
import csv
import math
from typing import List


def index_range(page: int, page_size: int) -> tuple:
    """computes start_index and end_index"""
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """instantiate an object"""
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """return empty list if arg out of range"""
        non_int = "page and/or page_size must be ints"
        non_positive_int = "page and/or page_size must be > 0"
        assert (type(page) is int and type(page_size) is int), non_int
        assert (page > 0 and page_size > 0), non_positive_int
        list_of_names = []
        with open('Popular_Baby_Names.csv', 'r') as file:
            csvfile = csv.reader(file)
            for line in csvfile:
                list_of_names.append(line)

        try:
            start_index, end_index = index_range(page, page_size)
            data = list_of_names[start_index: end_index]
            return data
        except Exception:
            return []

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """returns a dict"""
        total_items = len(get_page())
        total_pages = (total_items + page_size - 1) // page_size
        result_dict = {
                       "page_size": page_size,
                       "page": page,
                       "data": get_page(page, page_size),
                       "next_page": 0,
                       "prev_page": 0,
                       "total_pages": total_pages
                      }
        if page == total_pages:
            result_dict["next_page"] = None
        else:
            result_dict["next_page"] = page + 1

        if page == 1:
            result_dict["prev_page"] = None
        else:
            result_dict["prev_page"] = page - 1
