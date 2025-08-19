from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DoctorViewSet, SlotViewSet, LeaveViewSet, AppointmentViewSet

router = DefaultRouter()
router.register('doctors', DoctorViewSet, basename='doctor')
router.register('slots', SlotViewSet, basename='slot')
router.register('leaves', LeaveViewSet, basename='leave')
router.register('appointments', AppointmentViewSet, basename='appointment')


urlpatterns = [
    path('', include(router.urls)),
]