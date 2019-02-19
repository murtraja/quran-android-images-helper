from bottle import run, route, static_file, template, request
import os, db_helper, static_helper
from constants import SERVER_PATH

@route('/static/<filepath:path>')
def server_static(filepath):
    print(filepath)
    rootpath = os.path.join(SERVER_PATH, 'static')
    print(rootpath);
    return static_file(filepath, root=rootpath)

@route('/')
def route_root():
    safah = request.GET.get('safah') or 1
    safah = int(safah)
    pagePath = static_helper.get_image_path_from_safah(safah)
    print(pagePath)
    values = db_helper.get_bounds_for_safah(safah)
    return template('main.html', values=values, pagePath=pagePath)

@route('/test/')
def route_test():
    db_helper.test()
    return "OK"

if os.environ.get('APP_LOCATION') == 'heroku':
    run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
else:
    run(host='0.0.0.0', port=8080, debug=True)