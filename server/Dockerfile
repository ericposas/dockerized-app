FROM php:7.4.1-apache

WORKDIR /var/www/html

COPY . .

RUN apt-get update && apt-get install -y \
        default-mysql-client \
        libpng-dev \
        zlib1g-dev \
        libxml2-dev \
        libzip-dev \
        libonig-dev \
        zip \
        curl \
        unzip \
    && docker-php-ext-configure gd \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install mysqli \
    && docker-php-ext-enable mysqli \
    && docker-php-ext-install zip \
    && docker-php-source delete \
    && docker-php-ext-install pdo mbstring \
    && chmod -R 777 storage \
    && chmod -R 777 bootstrap/cache

RUN a2enmod headers \
    && sed -ri -e 's/^([ \t]*)(<\/VirtualHost>)/\1\tHeader set Access-Control-Allow-Origin "*"\n\1\2/g' /etc/apache2/sites-available/*.conf

# COPY ./vhost.conf /etc/apache2/sites-available/000-default.conf

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN chown -R www-data:www-data /var/www/html \
    && a2enmod rewrite

EXPOSE 8000 3306

CMD php artisan serve --host 0.0.0.0 --port 8000
