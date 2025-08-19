from django.db import models
from django.contrib.auth.models import User


class Doctor(models.Model):
    name = models.CharField(max_length=100)
    speciality = models.CharField(max_length=100)
    department = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.speciality}"


class Slot(models.Model):
    time = models.CharField(max_length=50)

    def __str__(self):
        return self.time


class Leave(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f"{self.doctor.name} - {self.date} - {self.slot.time}"


class Appointment(models.Model):
    patient_name = models.CharField(max_length=100)
    age = models.IntegerField()
    appointment_date = models.DateField()
    slot = models.ForeignKey(Slot, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.patient_name} - {self.doctor.name} - {self.appointment_date}"
