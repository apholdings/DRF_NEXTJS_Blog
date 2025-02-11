from django.db import models


class NewsletterUser(models.Model):
    email = models.EmailField(null=False, unique=True)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email
    

class Newsletter(models.Model):
    name = models.CharField(max_length=250)
    subject = models.CharField(max_length=250)
    body = models.TextField(blank=True, null=True)
    email = models.ManyToManyField(NewsletterUser)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    

class ContactMessage(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone_number = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"