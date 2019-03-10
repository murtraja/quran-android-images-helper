import sqlite3
from constants import DATA_SELECTION_QUERY_FIELDS, DATA_SELECTION_QUERY_FIELDS_MAP
def open_connection():
    conn = sqlite3.connect('static/databases/ayahinfo_1024.db')
    return conn.cursor()

def close_connection(cursor):
    return cursor.connection.close()

def test():
    print(get_bounds_for_surah_ayah())
    return;
    c = open_connection()
    c.execute("select min_x, min_y, max_x, max_y from glyphs where sura_number=1 and ayah_number=1")
    print(c.fetchall())
    close_connection(c)

def get_results_for_query(query):
    c = open_connection()
    c.execute(query)
    result = c.fetchall()
    close_connection(c)
    return result

def get_bounds_for_surah_ayah(surah = 1, ayah = 1):
    result = get_results_for_query('select min_x, min_y, max_x, max_y from glyphs where sura_number=1 and ayah_number=1')
    return list(map(lambda x: list(x), result))

def get_bounds_for_safah(safah = 1):
    safah = str(safah)
    result = get_results_for_query('select min_x, min_y, max_x, max_y from glyphs where page_number='+safah)
    return list(map(lambda x: list(x), result))

def get_data_for_safah(safah = 1):
    safah = str(safah)
    result = get_results_for_query('select ' + ','.join(DATA_SELECTION_QUERY_FIELDS) + ' from glyphs where page_number='+safah+' order by sura_number, ayah_number, position')
    return list(map(lambda x: keyify(DATA_SELECTION_QUERY_FIELDS_MAP, list(x)), result))

def keyify(keys, values):
    keys_len = len(keys)
    values_len = len(values)
    if keys_len!= values_len:
        print("keyify: different length of keys({}) and values({})".format(keys_len, values_len))
    dictionary = dict(zip(keys, values))
    return dictionary

if __name__ == '__main__':
    test()