import datetime

from django.utils import timezone
from django.test import TestCase

from parkinglocs.models import ParkingLocs

class ParkingLocsMethodTests(TestCase):
	def test_was_added_recently_with_future_parkinglocs(self):
		future_parkinglocs = ParkingLocs(latestupdatetime=timezone.now() + datetime.timedelta(days=30))
		self.assertEqual(future_parkinglocs.was_added_recently(), False)