
from constants import are_we_live, PAGE_CONFIG

def get_images_parent_path(resolution="1024"):
    path = ''
    if are_we_live and resolution != '1053':
        path = 'http://android.quran.com/data/width_{}'
    else:
        path = '/static/images_{}'
    path = path.format(resolution)
    return path

def get_image_path_from_safah(safah=1, images='1024'):
    page_file_name = PAGE_CONFIG[images]['format'].format(safah)
    images_parent_path = get_images_parent_path(images)
    page_path = images_parent_path + '/' + page_file_name
    return page_path