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

QA_PAGE_FILE_NAME_FORMAT = 'page{0:03d}.png';
MT_PAGE_FILE_NAME_FORMAT = '{}.jpg'

PAGE_CONFIG = {
    '1024': {
        'res': [1024, 1656],
        'format': QA_PAGE_FILE_NAME_FORMAT
    },
    '1260': {
        'res': [1260, 2038],
        'format': QA_PAGE_FILE_NAME_FORMAT
    },
    '1920': {
        'res': [1920, 3106],
        'format': QA_PAGE_FILE_NAME_FORMAT
    },
    '1053': {
        'res': [776, 1053],
        'format': MT_PAGE_FILE_NAME_FORMAT,
        'res_initial': [827, 1158],
    }
}

def get_page_resolution(res_key, safah):
    if res_key == '1053' and safah < 3:
        resolution = PAGE_CONFIG['1053']['res_initial']
    else:
        resolution = PAGE_CONFIG[res_key]['res']
    return resolution