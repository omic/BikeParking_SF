import datetime

from django.db import models
from django.utils import timezone

class ParkingLocs(models.Model):
    location = models.CharField(max_length=200)
    bos = models.CharField(max_length=20) # 1-11
    addr_num = models.CharField(max_length=50)
    st_name = models.CharField(max_length=100)
    st_type = models.CharField(max_length=50) # example: Ave, Blvd, Dr, St, etc.
    #     address_info = ndb.StructuredProperty(AddressInfo)
    address = models.CharField(max_length=400)
    eas_address = models.CharField(max_length=200)
    cnn = models.CharField(max_length=50)
    parcel = models.CharField(max_length=200)
    zip = models.CharField(max_length=200)
    lat_eas = models.CharField(max_length=200)
    long_eas = models.CharField(max_length=200)	
#     eas_info = ndb.StructuredProperty(EasInfo)
    coordinates = models.CharField(max_length=200)
    bike_parking = models.CharField(max_length=20) # Type of bike parking device (e.g. rack, locker, etc.).
    placement = models.CharField(max_length=50)
    acting_agent = models.CharField(max_length=50)
    racks = models.CharField(max_length=20)
    spaces = models.CharField(max_length=20)
    mo_inst = models.CharField(max_length=50)
    yr_installed = models.CharField(max_length=50)
    installed_by = models.CharField(max_length=50)
    #     install_info = ndb.StructuredProperty(InstallInfo)
    status = models.CharField(max_length=100)
    status_high_level = models.CharField(max_length=100)
    status_detail = models.CharField(max_length=100)
    status_description = models.CharField(max_length=100)
    acting_agent = models.CharField(max_length=50)
    action = models.CharField(max_length=100)
    #     status_info = ndb.StructuredProperty(StatusInfo)
    latestupdatetime = models.DateTimeField(auto_now_add=True)
    
    def __unicode__(self):
    	return self.location
    	
    def was_added_recently(self):
		now = timezone.now()
		return now - datetime.timedelta(days=1) <= self.latestupdatetime <= now
    	# return self.latestupdatetime >= timezone.now()-datetime.timedelta(days=1)
