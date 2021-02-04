from rest_framework import serializers
from .models import  Offers, Product, ProductRating, Cart, ProductSpacifications, Order

class OffersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offers
        fields = '__all__'

class ProductSpacificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSpacifications
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','name', 'price', 'views', 'picture1','pub_date']

class ProductDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'


class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRating
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    cartProduct = ProductSerializer(required=False, many=True)

    class Meta:
        model = Cart
        fields = ('id', 'cartUser', 'cartProduct')

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
    
    #will look into this later because it wasted so much time
    '''
    def create(self, validated_data):
        products_data = validated_data.pop('cartProduct', [])
        cart = super(CartSerializer, self).create(validated_data)
        for product_data in products_data:
            cart.product_set.create(id=product_data['id'])
        return cart

    
    def update(self, instance, validated_data):
        products_data = validated_data.pop('cartProduct', [])
        cart = super(CartSerializer, self).create(validated_data)
        # delete old
        cart.Product.exclude(id=[p['id'] for p in products_data]).delete()
        # create new
        for product_data in products_data:
            cart.product_set.create(id=product_data['id'])
        return cart
    '''