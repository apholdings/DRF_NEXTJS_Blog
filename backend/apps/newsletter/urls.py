from django.urls import path

from .views import NewsletterSignupView,ContactUsView

urlpatterns = [
    path("signup/", NewsletterSignupView.as_view()),
    path("contact-us/", ContactUsView.as_view()),
    ]