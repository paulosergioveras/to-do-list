from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="To-do List API",
        default_version='v1',
        description="Documentation for the To-do API",
        terms_of_service="https://github.com/paulosergioveras/to-do-list",
        contact=openapi.Contact(email="paulosergiovc12@gmail.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v1/', include('to_do_list.urls')),

    path('api/v1/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('api/v1/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
