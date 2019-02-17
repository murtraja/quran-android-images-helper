import os
from constants import IMAGES_1024_PATH

def get_image_path_from_safah(safah=1):
    pageFileName = safah + 1000
    pageFileName = 'page' + str(pageFileName)[1:] + '.png'
    return 'static/images_1024/'+pageFileName