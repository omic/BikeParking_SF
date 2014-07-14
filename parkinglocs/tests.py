import datetime

from django.utils import timezone
from django.test import TestCase

from parkinglocs.models import ParkingLocs

# $ python manage.py test parkinglocs

class ParkingLocsMethodTests(TestCase):
	def test_was_added_recently_with_future_parkinglocs(self):
		'''
		was_added_recently() should return False for parkinglocs whose latestupdatetime is in the future
		'''
		future_parkinglocs = ParkingLocs(latestupdatetime=timezone.now() + datetime.timedelta(days=30))
		self.assertEqual(future_parkinglocs.was_added_recently(), False)
	
	def test_was_added_recently_with_old_parkinglocs(self):
		'''
		was_added_recently() should return False for parkinglocs whose latestupdatetime is older than 1 day
		'''
		old_parkinglocs = ParkingLocs(latestupdatetime=timezone.now() - datetime.timedelta(days=30))
		self.assertEqual(old_parkinglocs.was_added_recently(), False)
	
	def test_was_added_recently_with_recent_parkinglocs(self):
		'''
		was_added_recently() should return True for parkinglocs whose latestupdatetime is within the last day
		'''
		recent_parkinglocs = ParkingLocs(latestupdatetime=timezone.now() - datetime.timedelta(hours=1))
		self.assertEqual(recent_parkinglocs.was_added_recently(), True)