from django.contrib import admin
from .models import Offers, Product, ProductRating, Cart, ProductSpacifications, Order

# Register your models here.
admin.site.register(Offers)
admin.site.register(Product)
admin.site.register(ProductRating)
admin.site.register(Cart)
admin.site.register(ProductSpacifications)
admin.site.register(Order)
