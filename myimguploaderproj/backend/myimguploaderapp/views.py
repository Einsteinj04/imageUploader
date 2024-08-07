from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Image
from rest_framework import status
from .serializers import ImageSerializer
# Create your views here.


class ImageUploadView(APIView):

    parser_classes = (MultiPartParser,FormParser)
    def post(self,request,*args,**kwargs):
        serializer = ImageSerializer(data = request.data)
        # return Response(serializer.is_valid())
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    def get(self,request, *args,**kwargs):
        image_collection = Image.objects.all()
        serializer = ImageSerializer(image_collection,many = True)
        return Response(serializer.data)