from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, ValidationError
from .models import Doctor, Slot, Leave, Appointment
from .serializers import (
    DoctorSerializer,
    SlotSerializer,
    LeaveSerializer,
    AppointmentSerializer,
)


class DoctorViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Public endpoint for listing and viewing doctors.
    """
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = [permissions.AllowAny]


class SlotViewSet(viewsets.ModelViewSet):
    """
    Admin-only endpoint for managing slots.
    """
    queryset = Slot.objects.all()
    serializer_class = SlotSerializer
    permission_classes = [permissions.IsAdminUser]


class LeaveViewSet(viewsets.ModelViewSet):
    """
    Admin-only endpoint for managing doctor leaves.
    """
    queryset = Leave.objects.all()
    serializer_class = LeaveSerializer
    permission_classes = [permissions.IsAdminUser]


class AppointmentViewSet(viewsets.ModelViewSet):
    """
    Authenticated users can create, view, update, and delete
    ONLY their own appointments.
    """
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Users can only see their own appointments
        return Appointment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        slot = serializer.validated_data["slot"]
        doctor = slot.doctor

        # Check if doctor is on leave that day
        if Leave.objects.filter(doctor=doctor, date=slot.date).exists():
            raise ValidationError("Doctor is on leave this day.")

        # Check if the slot is already booked
        if Appointment.objects.filter(slot=slot).exists():
            raise ValidationError("This slot is already booked.")

        # Save appointment with current user
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Prevent users from updating others' appointments
        if serializer.instance.user != self.request.user:
            raise PermissionDenied("You cannot edit this appointment.")
        serializer.save()

    def perform_destroy(self, instance):
        # Prevent users from deleting others' appointments
        if instance.user != self.request.user:
            raise PermissionDenied("You cannot delete this appointment.")
        instance.delete()
