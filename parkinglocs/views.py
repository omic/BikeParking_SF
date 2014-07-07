from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.template import RequestContext, loader
import json
from django.core import serializers

from parkinglocs.models import ParkingLocs

from django.shortcuts import get_object_or_404 

@csrf_exempt
def retrievelocs(request):
	if(request.method == 'GET'):   # respond with locaiton & coordinates to 'GET' request
		coordinates = ParkingLocs.objects.values('location','coordinates')
		jsonData= json.dumps(list(coordinates))
		return HttpResponse(jsonData)
	elif (request.method == 'POST'): # respond with detailed information for specific locaiton to 'POST' request
		location = request.POST.get('location')
		entry = ParkingLocs.objects.filter(location = location)[:1] # if duplicate data entries exist
		jsonData = serializers.serialize('json', entry)
		# print jsonData
		return HttpResponse(jsonData)

    
    
    			