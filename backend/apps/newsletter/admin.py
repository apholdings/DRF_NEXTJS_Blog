from django.contrib import admin
from .models import ContactMessage

class ContactMessageAdmin(admin.ModelAdmin):
    # Campos a mostrar en el listado de objetos
    list_display = ('first_name', 'last_name', 'email', 'phone_number', 'created_at')
    
    # Filtros disponibles en la barra lateral
    list_filter = ('created_at', 'email')
    
    # Campos que pueden ser utilizados para buscar
    search_fields = ('first_name', 'last_name', 'email', 'phone_number', 'message')
    
    # Filtros por fecha en la barra lateral
    date_hierarchy = 'created_at'
    
    # Campos que se mostrarán al editar un mensaje
    fields = ('first_name', 'last_name', 'email', 'phone_number', 'message')
    
    # Orden de los campos en el formulario de edición
    ordering = ('-created_at',)

    # Establecer que los campos sean solo lectura para 'created_at'
    readonly_fields = ('created_at',)

admin.site.register(ContactMessage, ContactMessageAdmin)