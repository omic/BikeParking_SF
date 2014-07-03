from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'BikeParking_SF.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
	url(r'^parkinglocs/', include('parkinglocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^index$', TemplateView.as_view(template_name = 'index.html'))
)
