
def get_images_relative_path(resolution="1024"):
    return '/static/images_'+resolution

def get_image_path_from_safah(safah=1, images='1024'):
    page_file_name = safah + 1000
    page_file_name = 'page' + str(page_file_name)[1:] + '.png'
    images_relative_path = get_images_relative_path(images)
    page_path = images_relative_path + '/' + page_file_name
    return page_path