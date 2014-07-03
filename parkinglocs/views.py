from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.template import RequestContext, loader
import json

from parkinglocs.models import ParkingLocs

from django.shortcuts import get_object_or_404 
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
def retrievelocs(request):
	if(request.method == 'GET'):
		coordinates = ParkingLocs.objects.values('location','coordinates')
# 		initcoordinates = ParkingLocs.objects.filter(status="COMPLETE")
# 		coordinates = initcoordinates.values('location','coordinates')
		jsonData= json.dumps(list(coordinates))
		return HttpResponse(jsonData)
	elif (request.method == 'POST'):
		location = request.POST.get('location')
		print location
		entry = ParkingLocs.objects.filter(location = location)
		jsonData = json.dumps(list(entry))
		print jsonData
		return HttpResponse("entry")
		# return HttpResponse(entry)

    
    
    			