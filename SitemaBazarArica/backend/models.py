from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Usuario(AbstractUser):
    ROLES = [
        ('vendedor', 'Vendedor'),
        ('administrador', 'Administrador'),
    ]
    rut = models.CharField(max_length=13)
    username = models.CharField(max_length=50, blank=True, null=True)
    nombre  = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    email  = models.EmailField(max_length=50, unique=True, blank=False, null=False)
    USERNAME_FIELD = 'email' # el email es el campo que se usa para logearse
    REQUIRED_FIELDS = ['username']# email y password son requeridos por defecto
    telefono = models.CharField(max_length=15)
    jornada = models.CharField(max_length=10, choices=[('duirno', 'Duirno'), ('vespertino', 'Vespertino'), ('mixto', 'Mixto')], default='duirno')
    rol = models.CharField(max_length=15, choices=ROLES, default='vendedor')
    imagen = models.ImageField(upload_to='imagenes/', null=True, blank=True)
   
    def __str__(self):
        return self.nombre

# Modelo para los productos disponibles en el bazar
class Producto(models.Model):
    TIPOS_PRODUCTO = [
        ('aseo', 'Aseo'),
        ('bebidas', 'Bebidas'),
        ('carnes', 'Carnes'),
        ('lacteos', 'Lacteos'),
        ('pastas', 'Pastas'),
        ('snacks', 'Snacks'),
        ('otros', 'Otros')
        # ... Otros tipos de productos
    ]
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255, default='Sin descripción')
    codigo = models.CharField(max_length=50, unique=True)
    tipo = models.CharField(max_length=20, choices=TIPOS_PRODUCTO)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='imagenes/', null=True, blank=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    #relacion con seccion
    seccion = models.ForeignKey('Seccion', on_delete=models.CASCADE) # esto quiere decir que un producto pertenece a una seccion y una seccion puede tener muchos productos
    proveedor = models.ForeignKey('Proveedor', on_delete=models.CASCADE) # esto quiere decir que un producto pertenece a un proveedor y un proveedor puede tener muchos productos
    estado = models.BooleanField(default=True)
    # Otros campos relacionados con el producto
    def __str__(self):
        return '{0} - {1}'.format(self.nombre, self.tipo)
class Proveedor(models.Model): # esto significa que cuando se agrege un producto se debe seleccionar un proveedor
    fecha_creacion = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    nombre = models.CharField(max_length=100) # nombre del proveedor
    persona_contacto = models.CharField(max_length=100, blank=True, null=True) # persona de contacto del proveedor
    telefono = models.CharField(max_length=15)
    direccion = models.CharField(max_length=50)
    estado = models.BooleanField(default=True)
    # Otros campos relacionados con el proveedor
    def __str__(self):
        return self.nombre
class Cliente(models.Model):
    #heredar del user con password y email

    email  = models.EmailField(max_length=50, unique=True, null=False,)

    nombre = models.CharField(max_length=50, blank=True, null=True)
    apellido = models.CharField(max_length=50, blank=True, null=True)
    rut = models.CharField(unique=True, max_length=13, blank=True, null=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    direccion = models.CharField(max_length=50, blank=True, null=True)
    # otros campos específicos del cliente aquí

    def __str__(self):
        return '{0} - {1}'.format(self.nombre, self.apellido)

class Pedido(models.Model):
    ESTADOS_PEDIDO = [
        ('pendiente', 'Pendiente'),
        ('procesando', 'Procesando'),
        ('enviado', 'Enviado'),
        ('entregado', 'Entregado'),
        ('cancelado', 'Cancelado'),
    ]
    # campo codigo que tiene el codigo del pedido ej: PO-0001 y se autoincrementa
    codigo = models.CharField(max_length=50, unique=True)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)  # Pedido hecho a un proveedor
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, default=1)
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADOS_PEDIDO, default='pendiente')
    total = models.DecimalField(max_digits=10, decimal_places=2)
    observacion = models.TextField(blank=True, null=True)

    def __str__(self):
        return f'Pedido {self.id} - {self.proveedor.nombre} - {self.estado}'

class ProductoRecibido(models.Model):
    pedido = models.ForeignKey(Pedido, related_name='productos_recibidos', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    fecha_recibido = models.DateTimeField(auto_now=True)
    aceptado = models.BooleanField(default=False)
    

    def __str__(self):
        return f'{self.cantidad} x {self.producto.nombre} - {self.pedido.proveedor.nombre}'
class ProductoPedido(models.Model):
    pedido = models.ForeignKey(Pedido, related_name='productos', on_delete=models.CASCADE) # related_name es el nombre que se usa para acceder a los productos de un pedido, es una relación inversa
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.cantidad} x {self.producto.nombre}'
class Descuento(models.Model): # esto quiere decir que un descuento puede aplicarse a muchos productos y un producto puede tener muchos descuentos
    codigo = models.CharField(max_length=50, unique=True)
    descripcion = models.CharField(max_length=255)
    porcentaje = models.DecimalField(max_digits=5, decimal_places=2)  # Porcentaje de descuento
    valido_desde = models.DateTimeField()
    valido_hasta = models.DateTimeField()
    productos = models.ManyToManyField(Producto)  # Los productos a los que se aplica el descuento

    def __str__(self):
        return self.codigo
# Modelo para representar las ventas realizadas
class Venta(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    vendedor = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_venta = models.DateTimeField(auto_now_add=True)
    descuento = models.ForeignKey(Descuento, on_delete=models.SET_NULL, null=True, blank=True)
    # Otros campos relevantes para la venta
class Seccion(models.Model):
    nombre = models.CharField(max_length=100)
    numero = models.IntegerField(unique=True)
    descripcion = models.CharField(max_length=255, default='Sin descripción')
    imagen = models.ImageField(upload_to='imagenes/', null=True, blank=True)
    #relacion con producto
    def __str__(self):
        return '{0} - {1}'.format(self.nombre, self.numero)
  
class Movimiento(models.Model):
    TIPOS_MOVIMIENTO = [
        ('entrada', 'Entrada'),
        ('salida', 'Salida'),
    ]
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    tipo = models.CharField(max_length=20, choices=TIPOS_MOVIMIENTO)
    seccion_origen = models.ForeignKey(Seccion, related_name='movimientos_origen', on_delete=models.CASCADE)
    seccion_destino = models.ForeignKey(Seccion, related_name='movimientos_destino', on_delete=models.CASCADE)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    razon = models.CharField(max_length=255)

    # Otros campos relevantes para la venta
class Stock(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    descripcion = models.CharField(max_length=255, default='Sin descripción')
    cantidad = models.IntegerField(default=0)
    

    def __str__(self):
        return f'{self.cantidad} x {self.producto.nombre}'