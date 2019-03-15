import os
are_we_live = os.environ.get('APP_LOCATION') == 'heroku'
#are_we_live = True

SERVER_PATH = os.path.dirname(os.path.realpath(__file__))
STATIC_PATH = os.path.join(SERVER_PATH, 'static')
IMAGES_1024_PATH = os.path.join(STATIC_PATH, 'images_1024')  

DATA_SELECTION_QUERY_FIELDS = [
    'page_number', 
    'line_number', 
    'sura_number', 
    'ayah_number', 
    'position', 
    'min_x', 
    'min_y', 
    'max_x', 
    'max_y'
]

DATA_SELECTION_QUERY_FIELDS_MAP = [
    'page', 
    'line', 
    'sura', 
    'ayah', 
    'position', 
    'min_x', 
    'min_y', 
    'max_x', 
    'max_y'
]

DATA_SELECTION_ORDER_FIELDS = [
    'sura_number', 
    'ayah_number', 
    'position'
]

PAGE_RESOLUTION = {
    '1024': [1024, 1656],
    '1260': [1260, 2038],
    '1920': [1920, 3106]
}
