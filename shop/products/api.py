from .models import Offers, Product, ProductRating, Cart, ProductSpacifications, Order
from rest_framework import viewsets, permissions, filters
from .serializers import OffersSerializer, ProductSerializer, ProductDetailsSerializer,  ProductRatingSerializer, CartSerializer, ProductSpacificationsSerializer, OrderSerializer
'''
class ProductCategoryViewset(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ProductCategorySerializer
    def get_queryset(self):         # very important to filter the model from frontend usng queries
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = ProductCategory.objects.all()
        username = self.request.query_params.get('name', None)
        if username is not None:
            queryset = queryset.filter(name=username)
        return queryset
'''
class OffersViewset(viewsets.ModelViewSet):
    queryset = Offers.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = OffersSerializer

class ProductSpacificationsViewset(viewsets.ModelViewSet):
    queryset = ProductSpacifications.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ProductSpacificationsSerializer
    def get_queryset(self):         # very important to filter the model from frontend usng queries
        queryset = ProductSpacifications.objects.all()
        specid = self.request.query_params.get('specid', None)
        if specid is not None:
            queryset = queryset.filter(id=specid)
        return queryset

class ProductsViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    filter_backends = [filters.OrderingFilter, filters.SearchFilter] # django filters for search and ordering need to specify fields for both
    ordering_fields = '__all__' #syntex "?ordering=fieldname" to order product by table ex price, date
    search_fields = ['name'] # get all products (not needed)
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ProductSerializer
    def get_queryset(self):         # very important to filter the model from frontend usng queries
        queryset = Product.objects.all().distinct().order_by('-pub_date') # Product.objects.all().distinct().order_by('ordercolumn') is important when ordering to eleminate duplicetes i dont know why duplicetes show but this is the fix
        
        # reorder products based on queryparams sent from fronend
        ordertype = self.request.query_params.get('ordertype', None)
        if ordertype is not None:
            queryset = Product.objects.all().distinct().order_by(ordertype)

        datanum = self.request.query_params.get('datanum', None)
        datanumsearch = self.request.query_params.get('datanumsearch', None)
        key = self.request.query_params.get('key', None)
        # get all search results with infinte scroll integrated
        if datanumsearch is not None and key is not None:
            if  len(queryset.filter(name__icontains=key)) <= int(datanumsearch)+9:
                queryset = queryset.filter(name__icontains=key)[int(datanumsearch):]
            else:
                queryset = queryset.filter(name__icontains=key)[int(datanumsearch):int(datanumsearch)+9]

        # get latest 4 search results for the modal
        keylatest =  self.request.query_params.get('keylatest', None)
        if keylatest is not None:
            queryset = queryset.filter(name__icontains=keylatest)[::-1][:6]


        category = self.request.query_params.get('category', None)
        datanumcat = self.request.query_params.get('datanumcat', None)
        # get category products with infinte scroll integrated
        if datanumcat is not None and category is not None:
            if  len(queryset.filter(category__icontains=category).distinct()) <= int(datanumcat)+9:
                queryset = queryset.filter(category__icontains=category).distinct()[int(datanumcat):]
            else:
                queryset = queryset.filter(category__icontains=category).distinct()[int(datanumcat):int(datanumcat)+9]
            


        brand = self.request.query_params.get('brand', None)
        datanumbrand = self.request.query_params.get('datanumbrand', None)
        # get category products with infinte scroll integrated
        if datanumbrand is not None and brand is not None:
            if  len(queryset.filter(brand__icontains=brand).distinct()) <= int(datanumbrand)+9:
                queryset = queryset.filter(brand__icontains=brand).distinct()[int(datanumbrand):]
            else:
                queryset = queryset.filter(brand__icontains=brand).distinct()[int(datanumbrand):int(datanumbrand)+9]

        latestproducts =  self.request.query_params.get('latestproducts', None)
        # get latest 6 products
        if latestproducts is not None:
            queryset = queryset.all().order_by('-pub_date')[::-1][:6]

        mostviews = self.request.query_params.get('mostviews', None)
        # get 6 most viewd products
        if mostviews is not None:
            queryset = queryset.all().order_by('views')[::-1][:6]

        # get all products with infinte scroll integrated
        if datanum is not None:
            if  len(queryset.all()) <= int(datanum)+9:
                queryset = queryset.all()[int(datanum):]
            else:
                queryset = queryset.all()[int(datanum):int(datanum)+9]

        return queryset

class ProductsDetailsViewset(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ProductDetailsSerializer
    def get_queryset(self):         # very important to filter the model from frontend usng queries
        queryset = Product.objects.all()
        productid = self.request.query_params.get('productid', None)
        if productid is not None:
            queryset = queryset.filter(id=productid)
        return queryset


class ProductRatingViewset(viewsets.ModelViewSet):
    queryset = ProductRating.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ProductRatingSerializer

class CartViewset(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = CartSerializer
    
    def get_queryset(self):         
        queryset = Cart.objects.all()
        
        # reorder products based on queryparams sent from fronend
        cartuser = self.request.query_params.get('cartuser', None)
        if cartuser is not None:
            queryset = Cart.objects.filter(cartUser=int(cartuser))
            
        return queryset

class OrderViewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = OrderSerializer

    def get_queryset(self):
        return self.request.user.orders.all()

    #to make the owner of the order the current user
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)