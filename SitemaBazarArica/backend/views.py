from cmath import e
from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializer import UsuarioSerializer, ClienteSerializer, ProveedorSerializer, ProveedorSerializer, ProductoSerializer, PedidoSerializer, ProductoPedidoSerializer, DescuentoSerializer, VentaSerializer, SeccionSerializer, MovimientoSerializer, StockSerializer
from .models import Usuario, Producto, Proveedor, Cliente, Pedido, ProductoPedido, Descuento, Venta, Seccion, Movimiento, Stock

# Create your views here.
from django.views.decorators.csrf import csrf_exempt, csrf_protect, ensure_csrf_cookie
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.utils.decorators import method_decorator
from django.contrib.auth.hashers import make_password
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from .serializer import UsuarioSerializer
#importamos el status para darle un estado a la respuesta
from rest_framework import status
from rest_framework.response import Response
import json
import os # para eliminar la imagen anterior cuando se actualiza la imagen de un usuario

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.core.mail import send_mail # para enviar correos
from django.conf import settings # para enviar correos
from django.contrib.auth.forms import PasswordResetForm # para recuperar contraseña
from django.contrib.auth.views import PasswordResetView # para recuperar contraseña
from rest_framework.permissions import AllowAny # para permitir cualquier usuario
from django.utils.http import urlsafe_base64_encode # para recuperar contraseña 
from django.utils.encoding import force_bytes # para recuperar contraseña 
from django.contrib.auth.tokens import default_token_generator # para recuperar contraseña
from django.contrib.auth import get_user_model
from django.utils.encoding import smart_str # para recuperar contraseña
from django.utils.http import urlsafe_base64_decode # para recuperar contraseña
from rest_framework.decorators import api_view
from django.contrib.sites.shortcuts import get_current_site # para obtener el dominio actual http://localhost:8000
from datetime import datetime, time # para saber la fecha actual
from rest_framework.permissions import IsAuthenticated, AllowAny

User = get_user_model() # esto es para obtener el modelo de usuario que se está utilizando en el proyecto



@api_view(['GET'])
def get_csrf_token(request):
    return Response({'csrftoken': get_token(request)}) # esto es para obtener el token csrf desde la api en React
class ResetPasswordView(APIView):
    permission_classes = [AllowAny] # esto es para permitir cualquier usuario porque el usuario no está autenticado cuando se restablece la contraseña
    def post(self, request):
        uid_b64 = request.data.get('uid')
        if not uid_b64:
            return Response({'error': 'No se proporciono UID'}, status=400)

        uid = smart_str(urlsafe_base64_decode(uid_b64))
        token = request.data.get('token')
        password = request.data.get('password')

        user = Usuario.objects.filter(pk=uid).first()

        if user and default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({'error': 'Contraseña restablecida con éxito'}, status=200)
        else:
            return Response({'error': 'Hubo un error al actualizar la contraseña' }, status=400)
        
class LoginView(APIView):
    print('ejecuando Login...')
    permission_classes = [AllowAny] # esto es para permitir cualquier usuario porque el usuario no está autenticado cuando se logea
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        User = get_user_model()
        # 1 valida si el usurio esta activo con su correo antes de autenticar
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Credenciales Invalidas', 'tipo': 'credenciales'}, status=status.HTTP_400_BAD_REQUEST)

        if not user.is_active:
            return Response({'error': 'Su cuenta se encuentra inactiva', 'tipo': 'cuenta'}, status=status.HTTP_400_BAD_REQUEST)

        #---------------------------------
        # 1 valida si el usuario esta dentro del horario laboral
        now = datetime.now().time()  # obtén la hora actual
        if user.jornada == 'duirno' and not (time(9, 0) <= now <= time(18, 0)):
            return Response({'error': 'Esta cuenta esta fuera del Horario laboral, contacte con el Administrador', 'tipo': 'horario'}, status=status.HTTP_400_BAD_REQUEST)
        elif user.jornada == 'vespertino' and not (time(18, 0) <= now or now <= time(9, 0)):
            return Response({'error': 'Esta cuenta esta fuera del Horario laboral, contacte con el Administrador', 'tipo': 'horario'}, status=status.HTTP_400_BAD_REQUEST)
        #---------------------------------
        # 2 autentica al usuario  
        user = authenticate(request, email=email, password=password) # autentica al usuario

        if user is not None:
            
            auth_login(request, user) # logea al usuario en el sistema
            try:
                Token.objects.filter(user=user).delete()  # Elimina cualquier token existente
                token, created = Token.objects.get_or_create(user=user)
                print(token.key) # Imprime el token
            except Exception as e:

                return Response({'error': 'Cannot create token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            current_site = get_current_site(request) # Obteniedo el dominio actual http://localhost:8000  para que la imagen se pueda mostrar en el front End
            domain = current_site.domain
            return Response({'token': token.key,'message': 'Se ha logeado Exitosamente', 'usuario':{'nombre':user.nombre, 'rol': user.rol, 'apellido': user.apellido, 'jornada':user.jornada, 'is_active': user.is_active, 'imagen': f'http://{domain}{user.imagen.url}' if user.imagen else None, 'email': user.email, 'id':user.id}}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciales Invalidas', 'tipo': 'credenciales'}, status=status.HTTP_400_BAD_REQUEST)
class GeneratePasswordResetLinkView(APIView):
    permission_classes = [AllowAny]
    print('Generando passowrd reset link')
    def post(self, request):
        email = request.data.get('email')
        user = Usuario.objects.filter(email=email).first()
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))  # remove .decode()
            print('uid_----____', uid)
            return Response({'uid': uid, 'token': token})  # return 'uid' and 'token' instead of 'reset_link
        else:
            return Response({'error': 'Usuario no encontrado'}, status=404)      
class LogoutView(APIView):
    # solo autenticados
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    def post(self, request):
        try:

            # Elimina el token del usuario
            Token.objects.filter(user=request.user).delete()
            auth_logout(request)  # desloguea al usuario
            return Response({'message': 'Ha cerrado Sesion Correctamente'}, status=status.HTTP_200_OK) 
        except Exception as e:
            return Response({'error': 'Ha ocurrido un error al cerrar Sesion'}, status=status.HTTP_400_BAD_REQUEST)
class SendPasswordResetEmailView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        try:
            email = request.data.get('email')
            reset_link = request.data.get('reset_link')
            
            send_mail(
                'Restablecimiento de contraseña',
                f'Haga clic en el siguiente enlace para restablecer su contraseña: {reset_link}',
                'hotel.arica00@gmail.com',
                [email],
                fail_silently=False,
            )
            return Response({'message': 'Correo electrónico de restablecimiento de contraseña enviado'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
class GetUsuarioLogeado(APIView):
    
    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION', " ").split(' ')[1]
        try:
            user = Token.objects.get(key=token).user 
        except Token.DoesNotExist:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        
        # Aquí puedes devolver los datos del usuario que quieras
        # Obtén el dominio actual
        current_site = get_current_site(request)
        domain = current_site.domain
        return Response({'token': token, 'usuario':{'nombre':user.nombre, 'rol': user.rol, 'apellido': user.apellido, 'jornada':user.jornada, 'is_active': user.is_active, 'imagen': f'http://{domain}{user.imagen.url}' if user.imagen else None, 'email':user.email, 'id': user.id}}, status=status.HTTP_200_OK)   
class SendPasswordResetEmailView(APIView):
    permission_classes = [AllowAny]
    print('YYYYYYYYYY')
    def post(self, request):
        email = request.data.get('email')
        print('UUUUUUUUUUUUUUUUUUUU')
        print(email)
        reset_link = request.data.get('reset_link')
        print(reset_link)
        send_mail(
            'Restablecimiento de contraseña',
            f'Haga clic en el siguiente enlace para restablecer su contraseña: {reset_link}',
            'hotel.arica00@gmail.com',
            [email],
            fail_silently=False,
        )
        return Response({'message': 'Correo electrónico de restablecimiento de contraseña enviado'})
    

class UsuarioView(viewsets.ModelViewSet): # este método es para listar, crear, actualizar y eliminar usuarios desde la api en React
    serializer_class = UsuarioSerializer #Esto indica que UsuarioSerializer se utilizará para serializar y deserializar instancias del modelo Usuario.
    queryset = Usuario.objects.all() # Esto indica que todas las instancias del modelo Usuario son el conjunto de datos sobre el que operará esta vista.

    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({'data': serializer.data, 'message': 'Usuarios obtenidos!'}, status=status.HTTP_200_OK)
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.imagen and hasattr(instance.imagen, 'path'):
            image_path = os.path.join(settings.MEDIA_ROOT, instance.imagen.path)  # Guarda la ruta de la imagen
            self.perform_destroy(instance) # Elimina el usuario
            # Si la imagen existe se borrar para que no quede en el servidor
            if os.path.isfile(image_path):
                os.remove(image_path)
        else:
            self.perform_destroy(instance) # Elimina el usuario si no tiene imagen
        return Response({'message': 'Usuario eliminado!'}, status=status.HTTP_200_OK)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            usuario = serializer.save()

            # Crear un Recepcionista, PersonalAseo o Administrador dependiendo del rol

            return Response({'data': serializer.data, 'message': 'Se ha credo el Usuario Exitosamente'}, status=status.HTTP_201_CREATED)
        return Response({'error': 'No se ha podido crear el Usuario'}, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, *args, **kwargs):
        try: 

            queryset = Usuario.objects.all().order_by('-id')
            serializer = self.get_serializer(queryset, many=True)
            return Response({'data': serializer.data, 'message': 'Usuarios obtenidos!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error al obtener los usuarios'}, status=status.HTTP_400_BAD_REQUEST)
        
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        old_image = instance.imagen  # Guarda la referencia a la imagen anterior

        serializer = self.get_serializer(instance, data=request.data, partial=True) # partial=True para permitir actualizaciones parciales
        if serializer.is_valid():
            self.perform_update(serializer) # Actualiza el usuario

            # Si la imagen ha cambiado y la imagen antigua existe, borra la imagen anterior
            if old_image != instance.imagen and old_image and hasattr(old_image, 'path'):
                os.remove(os.path.join(settings.MEDIA_ROOT, old_image.path))

            return Response({'data': serializer.data, 'message': 'Usuario actualizado correctamente!'}, status=status.HTTP_200_OK)
        return Response({'message': 'Error al actualizar el usuario', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    # Django Rest Framework proporciona los siguientes métodos para operaciones CRUD en ModelViewSet:

    # .list(): Para listar todos los objetos (GET)
    # .retrieve(): Para obtener un objeto específico (GET con id)
    # .create(): Para crear un nuevo objeto (POST)
    # .update(): Para actualizar un objeto existente (PUT)
    # .partial_update(): Para actualizar parcialmente un objeto existente (PATCH)
    # .destroy(): Para eliminar un objeto existente (DELETE)
    # Por lo tanto, puedes realizar operaciones CRUD en el modelo Usuario a través de esta vista.

class ProveedorView(viewsets.ModelViewSet):
    serializer_class = ProveedorSerializer
    queryset = Proveedor.objects.all() # Esto indica que todas las instancias del modelo Proveedor son el conjunto de datos sobre el que operará esta vista.
    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    # uso de try exept para capturar errores
    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response({'data': serializer.data, 'message': 'Proveedores obtenidos!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error al obtener los Proveedores'}, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance) # Elimina el Proveedor
            return Response({'message': 'Proveedor eliminado!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error al eliminar el Proveedor'}, status=status.HTTP_400_BAD_REQUEST)
    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                proveedor = serializer.save()
                return Response({'data': serializer.data, 'message': 'Se ha credo el Proveedor Exitosamente'}, status=status.HTTP_201_CREATED)
            return Response({'error': 'No se ha podido crear el Proveedor'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al crear el Proveedor'}, status=status.HTTP_400_BAD_REQUEST)
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True) # partial=True para permitir actualizaciones parciales
            if serializer.is_valid():
                self.perform_update(serializer) # Actualiza el Proveedor
                return Response({'data': serializer.data, 'message': 'Proveedor actualizado correctamente!'}, status=status.HTTP_200_OK)
            return Response({'message': 'Error al actualizar el Proveedor', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al actualizar el Proveedor'}, status=status.HTTP_400_BAD_REQUEST)
    
class ProductoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all() # Esto indica que todas las instancias del modelo Producto son el conjunto de datos sobre el que operará esta vista.
    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    # uso de try exept para capturar errores
    def list(self, request, *args, **kwargs):
        try: 
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response({'data': serializer.data, 'message': 'Productos obtenidos!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error al obtener los Productos'}, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance) # Elimina el Producto
            return Response({'message': 'Producto eliminado!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error al eliminar el Producto'}, status=status.HTTP_400_BAD_REQUEST)
    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                # Obtén el ID del proveedor del request
                proveedor_id = request.data.get('proveedor')
                # Busca el proveedor en la base de datos
                proveedor = Proveedor.objects.get(id=proveedor_id)

                # Obtén el ID de la sección del request
                seccion_id = request.data.get('seccion')
                # Busca la sección en la base de datos
                seccion = Seccion.objects.get(id=seccion_id)

                # Asocia el producto con el proveedor y la sección antes de guardarlo
                producto = serializer.save(proveedor=proveedor, seccion=seccion)
                # Crea una entrada en la tabla Stock con cantidad 0
                Stock.objects.create(producto=producto, cantidad=0)
                return Response({'data': serializer.data, 'message': 'Se ha credo el Producto Exitosamente'}, status=status.HTTP_201_CREATED)
            return Response({'error': 'No se ha podido crear el Producto'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al crear el Producto'}, status=status.HTTP_400_BAD_REQUEST)
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True) # partial=True para permitir actualizaciones parciales
            if serializer.is_valid():
                self.perform_update(serializer) # Actualiza el Producto
                return Response({'data': serializer.data, 'message': 'Producto actualizado correctamente!'}, status=status.HTTP_200_OK)
            return Response({'message': 'Error al actualizar el Producto', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al actualizar el Producto'}, status=status.HTTP_400_BAD_REQUEST)
class SeccionView(viewsets.ModelViewSet):
    serializer_class = SeccionSerializer
    queryset = Seccion.objects.all() # Esto indica que todas las instancias del modelo Seccion son el conjunto de datos sobre el que operará esta vista.
    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    # uso de try exept para capturar errores
    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response({'data': serializer.data, 'message': 'Secciones obtenidas!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error al obtener las Secciones'}, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance) # Elimina la Seccion
            return Response({'message': 'Seccion eliminada!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error al eliminar la Seccion'}, status=status.HTTP_400_BAD_REQUEST)
    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                seccion = serializer.save()
                return Response({'data': serializer.data, 'message': 'Se ha credo la Seccion Exitosamente'}, status=status.HTTP_201_CREATED)
            return Response({'error': 'No se ha podido crear la Seccion'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al crear la Seccion'}, status=status.HTTP_400_BAD_REQUEST)
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True) # partial=True para permitir actualizaciones parciales
            if serializer.is_valid():
                self.perform_update(serializer) # Actualiza la Seccion
                return Response({'data': serializer.data, 'message': 'Seccion actualizada correctamente!'}, status=status.HTTP_200_OK)
            return Response({'message': 'Error al actualizar la Seccion', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al actualizar la Seccion'}, status=status.HTTP_400_BAD_REQUEST)
class StockView(viewsets.ModelViewSet):
    serializer_class = StockSerializer
    queryset = Stock.objects.all() # Esto indica que todas las instancias del modelo Stock son el conjunto de datos sobre el que operará esta vista.
    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    # uso de try exept para capturar errores
    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response({'data': serializer.data, 'message': 'Stock obtenido!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error al obtener el Stock'}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True) # partial=True para permitir actualizaciones parciales
            if serializer.is_valid():
                self.perform_update(serializer) # Actualiza el Stock
                return Response({'data': serializer.data, 'message': 'Stock actualizado correctamente!'}, status=status.HTTP_200_OK)
            return Response({'message': 'Error al actualizar el Stock', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al actualizar el Stock'}, status=status.HTTP_400_BAD_REQUEST)
        

class PedidoView(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer
    queryset = Pedido.objects.all() # Esto indica que todas las instancias del modelo Pedido son el conjunto de datos sobre el que operará esta vista.
    permission_classes = [AllowAny]
    # uso de try exept para capturar errores
    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response({'data': serializer.data, 'message': 'Pedidos obtenidos!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error al obtener los Pedidos'}, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance) # Elimina el Pedido
            return Response({'message': 'Pedido eliminado!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error al eliminar el Pedido'}, status=status.HTTP_400_BAD_REQUEST)
    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                # Obtén el ID del proveedor del request
                proveedor_id = request.data.get('proveedor')
                print('proveedor:', proveedor_id)
                # Busca el proveedor en la base de datos
                proveedor = Proveedor.objects.get(id=proveedor_id)

                # Obtén el ID del usuario logeado
                usuario_id = request.user.id
                # Busca el usuario en la base de datos
                usuario = Usuario.objects.get(id=usuario_id)

                # Asocia el pedido con el proveedor y el usuario antes de guardarlo
                pedido = serializer.save(proveedor=proveedor, usuario=usuario)

                return Response({'message': 'Pedido creado!', 'pedidoId': pedido.id}, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al crear el Pedido'}, status=status.HTTP_400_BAD_REQUEST)
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True) # partial=True para permitir actualizaciones parciales
            if serializer.is_valid():
                self.perform_update(serializer) # Actualiza el Pedido
                return Response({'data': serializer.data, 'message': 'Pedido actualizado correctamente!'}, status=status.HTTP_200_OK)
            return Response({'message': 'Error al actualizar el Pedido', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al actualizar el Pedido'}, status=status.HTTP_400_BAD_REQUEST)
        

class ProductoPedidoView(viewsets.ModelViewSet):
    serializer_class = ProductoPedidoSerializer
    queryset = ProductoPedido.objects.all() # Esto indica que todas las instancias del modelo ProductoPedido son el conjunto de datos sobre el que operará esta vista.
    authentication_classes = [TokenAuthentication]  # Utiliza la autenticación basada en tokens
    # uso de try exept para capturar errores
    def create(self, request, *args, **kwargs):
        try:
            pedido_id = request.data.get('pedido')
            pedido = Pedido.objects.get(id=pedido_id)
            producto_pedido_data = request.data

            serializer = self.get_serializer(data=producto_pedido_data)
            if serializer.is_valid():
                productoPedido = serializer.save(pedido=pedido)
                return Response({'message': 'ProductoPedido creado exitosamente'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'No se ha podido crear el ProductoPedido', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al crear el ProductoPedido'}, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.get_serializer(queryset, many=True)
            return Response({'data': serializer.data, 'message': 'ProductosPedidos obtenidos!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error al obtener los ProductosPedidos'}, status=status.HTTP_400_BAD_REQUEST)
    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance) # Elimina el ProductoPedido
            return Response({'message': 'ProductoPedido eliminado!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': 'Error al eliminar el ProductoPedido'}, status=status.HTTP_400_BAD_REQUEST)
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=True) # partial=True para permitir actualizaciones parciales
            if serializer.is_valid():
                self.perform_update(serializer) # Actualiza el ProductoPedido
                return Response({'data': serializer.data, 'message': 'ProductoPedido actualizado correctamente!'}, status=status.HTTP_200_OK)
            return Response({'message': 'Error al actualizar el ProductoPedido', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al actualizar el ProductoPedido'}, status=status.HTTP_400_BAD_REQUEST)
        
    
        