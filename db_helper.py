import sqlite3

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

if __name__ == '__main__':
    test()