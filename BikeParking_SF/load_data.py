csv_filepathname = "/Users/wentingzhao/Documents/workspace/BikeParking_SF/BikeParking_SF/Bicycle_Parking__Public_.csv"
my_djangoproject_home = "/Users/wentingzhao/Documents/workspace/BikeParking_SF/"

import sys,os
sys.path.append(my_djangoproject_home)
os.environ['DJANGO_SETTINGS_MODULE'] = 'settings'

from parkinglocs.models import ParkingLocs

import csv

with open(csv_filepathname, 'rb') as csvfile:
	csv_dict = csv.DictReader(csvfile, delimiter=',')
# 	Integer_key=['BOS','RACKS','SPACES']
	for line in csv_dict:
		row = ParkingLocs()
		for key in line:
			db_key = key.lower()
			setattr(row,db_key,line[key])
		row.save()
# if db_key in Integer_key:
# 				if line[key]:					
# 					value = int(line[key])
# 					setattr(row,db_key,value)
# 			else: