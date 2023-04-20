from rest_framework import serializers

class CapitalizedCharField(serializers.CharField):
    def to_representation(self, value):
        return value.title()