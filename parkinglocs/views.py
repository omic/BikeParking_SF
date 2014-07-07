from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.template import RequestContext, loader
import json
from django.core import serializers
from parkinglocs.models import ParkingLocs
from django.shortcuts import get_object_or_404 
import csv

@csrf_exempt
def retrievelocs(request):
	c = Controller()
	if request.method == 'GET':
		resp = c.printLocs(request)
		return resp
	else :
		resp = c.printDetails(request)
		return resp

def dbmanage(request):
	dbOp = DBManage()
	resp = dbOp.loaddata(request)
	return resp
	

class DBManage():
	
	csv_filepathname = "/static/Bicycle_Parking__Public_.csv"
	
	def loaddata(self,request):
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
		return HttpResponse(removeduplicate(request))

	def removeduplicate(self,request):
		# inspect database & remove duplicate
		print ParkingLocs.objects.count()
		# assuming which duplicate is removed doesn't matter...
		for row in ParkingLocs.objects.all():
		    if ParkingLocs.objects.filter(location=row.location).count() > 1:
		        row.delete()
		return ParkingLocs.objects.count()

class Controller():
	''''''
	@csrf_exempt
	def printLocs(self, request):
		''''''
		#if request.method == 'GET' :   # respond with locaiton & coordinates to 'GET' request
		coordinates = ParkingLocs.objects.values('location','coordinates')
		jsonData= json.dumps(list(coordinates))
		return HttpResponse(jsonData)
		#elif request.method == 'POST' : # respond with detailed information for specific locaiton to 'POST' request
	@csrf_exempt
	def printDetails(self, request):
			
		location = request.POST.get('location')
		entry = ParkingLocs.objects.filter(location = location)[:1] # if duplicate data entries exist
		jsonData = serializers.serialize('json', entry)
			
		return HttpResponse(jsonData)
		
		    
    			
