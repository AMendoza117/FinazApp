# Usa la imagen base de PHP con Apache
FROM php:7.4-apache

# Instalar la extensión mysqli necesaria para MySQL
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Configurar el ServerName en Apache para evitar mensajes de advertencia
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Habilitar el módulo rewrite de Apache (necesario para .htaccess)
RUN a2enmod rewrite

# Copiar la configuración de Apache personalizada
COPY default.conf /etc/apache2/sites-available/000-default.conf

# Copiar el contenido de la carpeta src al directorio raíz de Apache
COPY src/ /var/www/html/

# Ajustar permisos para asegurar que Apache pueda acceder a los archivos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Exponer el puerto 80 para servir la aplicación
EXPOSE 80

# Comando para iniciar Apache
CMD ["apache2-foreground"]
