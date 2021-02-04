from rest_framework import routers
from .api import OffersViewset, ProductsViewset, ProductsDetailsViewset, ProductRatingViewset, CartViewset, ProductSpacificationsViewset, OrderViewset

router = routers.DefaultRouter()
router.register('api/offers', OffersViewset)
router.register('api/productsp', ProductSpacificationsViewset)
router.register('api/products', ProductsViewset)
router.register('api/productdetails', ProductsDetailsViewset)
router.register('api/productratings', ProductRatingViewset)
router.register('api/carts', CartViewset)
router.register('api/orders', OrderViewset, 'orders')

urlpatterns = router.urls