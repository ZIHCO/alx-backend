#!/usr/bin/env python3
"""contains index_range function"""


def index_range(page: int, page_size: int) -> tuple:
    """computes start_index and end_index"""
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)
