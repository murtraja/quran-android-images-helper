from bottle import run, route, static_file, template, request
import os, db_helper, static_helper
from constants import SERVER_PATH, get_page_resolution, are_we_live

@route('/static/<filepath:path>')
def server_static(filepath):
    # print(filepath)
    rootpath = os.path.join(SERVER_PATH, 'static')
    # print(rootpath);
    return static_file(filepath, root=rootpath)

@route('/')
def route_root():
    safah = request.GET.get('safah') or 3 #1
    images = request.GET.get('images') or '1053' #'1024'
    safah = int(safah)
    page_path = static_helper.get_image_path_from_safah(safah, images)
    values = db_helper.get_bounds_for_safah(safah, images)
    highlight_data = request.GET.get('highlight') or ''
    resolution = get_page_resolution(images, safah)
    return template('main.html', values=values, pagePath=page_path, data=[], highlight=highlight_data, resolution=resolution)

@route('/test/')
def route_test():
    d = db_helper.get_data_for_safah()
    # print(d)
    safah = 17
    pagePath = static_helper.get_image_path_from_safah(safah)
    # print(pagePath)
    return template('main.html', values=[], pagePath=pagePath, data=d)
    # return "OK"

@route('/highlight/')
def route_test():
    ayah_key = request.GET.get('ayah') or "2:6"#"1:1"
    images = request.GET.get('images') or '1053'#'1024'
    safah_data = db_helper.get_safah_data_from_ayah_key(ayah_key, images)
    safah = int(safah_data[0]['page'])
    page_path = static_helper.get_image_path_from_safah(safah, images)
    resolution = get_page_resolution(images, safah)
    return template('main.html', values=[], pagePath=page_path, data=safah_data, highlight=ayah_key, resolution=resolution)

if are_we_live:
    run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
else:
    run(host='0.0.0.0', port=8080, debug=True)