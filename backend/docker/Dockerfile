FROM php:7.4-apache

# Instalar la extensión mysqli y configurar el servidor Apache
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Copiar el archivo de configuración
COPY default.conf /etc/apache2/sites-available/000-default.conf

# Habilitar el módulo rewrite de Apache
RUN a2enmod rewrite
