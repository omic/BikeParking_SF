csv_filepathname = "/Users/wentingzhao/Documents/workspace/BikeParking_SF/BikeParking_SF/Bicycle_Parking__Public_.csv"
my_djangoproject_home = "/Users/wentingzhao/Documents/workspace/BikeParking_SF/"

import sys,os
sys.path.append(my_djangoproject_home)
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

from parkinglocs.models import ParkingLocs

import csv

with open(csv_filepathname, 'rb') as csvfile:
	csv_dict = csv.DictReader(csvfile, delimiter=',')
	status_key= ['1_STATUS','2_STATUS_HIGH_LEVEL','3_STATUS_DETAIL','4_STATUS_DESCRIPTION','5_ACTING_AGENT','6_ACTION']
	for line in csv_dict:
		row = ParkingLocs()
		for key in line:
			if key in status_key:
				db_key = key[2:].lower()
			else:
				db_key = key.lower()
			setattr(row,db_key,line[key])
		row.save()
		# Methods of duplicate removal: 
		# http://mikefenwick.com/blog/insert-into-database-or-return-id-of-duplicate-row-in-mysql/
		# obj, created = ParkingLocs.objects.get_or_create(*,defaults=*)
