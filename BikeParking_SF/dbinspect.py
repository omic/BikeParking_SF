csv_filepathname = "/Users/wentingzhao/Documents/workspace/BikeParking_SF/BikeParking_SF/Bicycle_Parking__Public_.csv"
my_djangoproject_home = "/Users/wentingzhao/Documents/workspace/BikeParking_SF/"

import sys,os
sys.path.append(my_djangoproject_home)
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

from parkinglocs.models import ParkingLocs

# inspect database & remove duplicate
print ParkingLocs.objects.count()

# # assuming which duplicate is removed doesn't matter...
# for row in ParkingLocs.objects.all():
#     if ParkingLocs.objects.filter(location=row.location).count() > 1:
#         row.delete()
# 
# print ParkingLocs.objects.count()