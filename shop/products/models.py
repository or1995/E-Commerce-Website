from django.db import models
from django.contrib.auth.models import User

class Offers(models.Model):
    picture = models.ImageField(default='defaultproduct.png', upload_to='products_offers')
    title = models.CharField(max_length=300, default='title')
    text = models.CharField(max_length=1000, default='text')
    productid = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class ProductSpacifications(models.Model):
    processor = models.CharField(max_length=300)
    ram = models.CharField(max_length=300)
    camera = models.CharField(max_length=300)
    battery = models.CharField(max_length=300)
    display = models.CharField(max_length=300)
    storage = models.CharField(max_length=300)
    material = models.CharField(max_length=300)
    os = models.CharField(max_length=300)

    def __str__(self):
        return self.display + self.storage


class Product(models.Model):
    name = models.CharField(max_length=300)
    description = models.CharField(max_length=1000,default="")
    description2 = models.CharField(max_length=1000,default="")
    specifications = models.ForeignKey(ProductSpacifications, on_delete=models.CASCADE)
    category = models.CharField(max_length=300)
    pub_date = models.DateTimeField('date published', auto_now_add=True)
    brand = models.CharField(max_length=300)
    price = models.FloatField()
    views = models.IntegerField(default=0)
    picture1 = models.ImageField(default='defaultproduct.png', upload_to='products_pics')
    picture2 = models.ImageField(default='defaultproduct.png', upload_to='products_pics')
    picture3 = models.ImageField(default='defaultproduct.png', upload_to='products_pics')
    picture4 = models.ImageField(default='defaultproduct.png', upload_to='products_pics')

    def __str__(self):
        return self.name

class ProductRating(models.Model):
    rating = models.IntegerField()
    ratingUser = models.OneToOneField(User, on_delete=models.CASCADE)
    ratingProduct = models.OneToOneField(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.ratingUser

class Cart(models.Model):
    cartUser = models.OneToOneField(User, on_delete=models.CASCADE)
    cartProduct = models.ManyToManyField(Product, blank=True)

class Order(models.Model):
    owner = models.ForeignKey(User, related_name="orders", on_delete=models.CASCADE, null=True)
    orderProducts = models.ManyToManyField(Product)

