from rest_framework import serializers
from .models import Doctor, Slot, Leave, Appointment


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'


class SlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Slot
        fields = '__all__'


class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'
        read_only_fields = ['user']   # user will come from request.user

    def validate(self, data):
        import datetime
        today = datetime.date.today()
        appointment_date = data["appointment_date"]

        # cannot book in the past
        if appointment_date < today:
            raise serializers.ValidationError("Appointment date cannot be in the past")

        # cannot book for today (only from tomorrow)
        if appointment_date == today:
            raise serializers.ValidationError("Appointment cannot be booked for the same day")

        # only up to 1 month in advance
        if appointment_date > today + datetime.timedelta(days=30):
            raise serializers.ValidationError("Appointment can be booked only up to 1 month in advance")

        # check doctor leave
        from .models import Leave
        if Leave.objects.filter(doctor=data["doctor"], date=appointment_date, slot=data["slot"]).exists():
            raise serializers.ValidationError("Doctor is on leave for this slot")

        return data
