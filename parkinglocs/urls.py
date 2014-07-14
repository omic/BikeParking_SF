from django.conf.urls import patterns, url

from parkinglocs import views

urlpatterns = patterns('',
    url(r'^retrievelocs$', views.retrievelocs, name='retrievelocs'),
	url(r'^dbmanage$', views.dbmanage, name='dbmanage')
)