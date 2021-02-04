from rest_framework import generics, permissions
from knox.models import AuthToken
from rest_framework.response import Response
from .models import Profile
from rest_framework import viewsets, permissions, filters
from .serializers import ProfileSerializer, UserSerializer, RegisterSerializer, LoginSerializer

class ProfileViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ProfileSerializer

#register api
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]  #<-- [1] is important
        })

#login api
class loginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]  #<-- [1] is important
        })

#get user api
class UserAPI(generics.RetrieveAPIView):  # could be good template for searching later
    permission_classes = [
        permissions.IsAuthenticated, # only work when user is authenticated
    ] 

    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user