from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin', admin.site.urls),
    path('product/', include('products.urls')),
    path('users/', include('users.urls')),
]

# This line is very important to display images right (media)
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# PUT IT AT THE END SO IT WONT CATCH OTHER LINKS
urlpatterns += path('', include('frontend.urls')),
    
