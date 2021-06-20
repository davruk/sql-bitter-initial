### How to run tests

1. Install PyTest: `pip install pytest`
2. Make sure you have `__init__.py` in the `tests` folder
3. Run: `pytest -p no:warnings`

> Be aware that tests will use your default localhost (TinyDB) database and also purge it in the end.
