BikeParking_SF
==============

Visualize Bike Parking Locations in San Francisco on google map, backend in Python and frontend in JavaScript

1. Show San Francisco bike parking locations on Google Map
2. View detailed parking location information
3. Get the nearst parking location by clicking any place on map
4. Cluster locations when zoom out


-----------
HOW TO RUN:
-----------
0. Make sure Python & Django with versions below are installed on testing machine 
1. Run server: type python manage.py runserver in terminal
2. Website: open url localhost:8000/index in browser


------------------------
Development Environemnt:
------------------------
Backend: Python 2.7.7 + Django 1.6.5
Frontend: html + css + javascript
additional tool/api: jQuery, Google Maps JavaScript API v3


------------------
Project Structure:
------------------
BikeParking_SF/
  BikeParking_SF/
    __init__.py
    settings.py
    urls.py
    wsgi.py
    load_data.py
    dbinspect.py
    Bicycle_Parking__Public_.csv
  manage.py
  db.sqlite3
  parkinglocs/
    __init__.py
    admin.py
    models.py
    tests.py
    views.py
    urls.py
    template/
      index.html
    static/
      css/
        style.css
      js/
        bikeparking.js
        markercluster.js


----------
Fun Notes:
----------
First Python Project! First Framework Django!
Problems and Solutions:
1. Data are duplicate in csv file, even in source: https://data.sfgov.org/Transportation/Bicycle-Parking-Public-/w969-5mn4
   :-) sol: duplicate removal after data import
2. Long response time when loading map location data
   :-) sol: markingcluster on map
3. Originally design: Google app engine with Python + webapp2 framework (Caught problem with data import, exceeds quota limit for Google app engine)
   :-) sol: move web deployment to local, change framework to Django

Next Step:
Add test framework: py.test, jasmine, jUnit
try Angular.js


--------
Contact:
--------
If any question, please contact Wenting via esther.zh.wenting@gmail.com
