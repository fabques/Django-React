from rest_framework.views import APIView
from rest_framework.response import Response
from .models import School, Grade
from rest_framework import viewsets, permissions
from .serializers import SchoolSerializer, GradeSerializer


class SchoolAPI(APIView):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = SchoolSerializer

    def get(self, request):
        queryset = School.objects.all()
        codigo_postal = self.request.query_params.get('codigo_postal', None)
        if codigo_postal is not None:
            queryset = queryset.filter(codigo_postal=codigo_postal)
            serializer = SchoolSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            serializer = SchoolSerializer(queryset, many=True)
            return Response(serializer.data)


class GradeAPI(APIView):
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = GradeSerializer

    def get(self, request):
        queryset = Grade.objects.all()
        serializer = GradeSerializer(queryset, many=True)
        return Response(serializer.data)