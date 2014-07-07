from django.conf.urls import patterns, url

from parkinglocs import views

urlpatterns = patterns('',
    url(r'^$', views.retrievelocs, name='retrievelocs')
	url(r'^$', views.dbmanage, name='dbmanage')
    
)