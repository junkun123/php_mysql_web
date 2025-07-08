FROM php:8.1-apache

# Instala extensiones necesarias para MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Copia todo al directorio web
COPY . /var/www/html/

# Asegura permisos correctos
RUN chown -R www-data:www-data /var/www/html
