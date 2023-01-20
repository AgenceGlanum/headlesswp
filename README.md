# WP HEADLESS x GATSBY STACK

<img src="https://img.shields.io/badge/php-%5E8.0-blue">
<img src="https://img.shields.io/badge/wordpress-%3E%3D%206.1-blue">
<img src="https://img.shields.io/badge/node-%3E%3D%2018-brightgreen">

<br/>

## ⚙️ Configuration locale du projet

### Fichiers host et vhost

Dans le dossier `C:\Windows\System32\drivers\etc`, éditer le fichier `host` et y ajouter le nom de domaine du projet local.

```apache
# WP HEADLESS
127.0.0.1 headlesswp.local
127.0.0.1 app.headlesswp.local
```

Dans le dossier `C:\laragon\etc\apache2\sites-enabled` créer les fichiers **headlesswp.local.conf** et **app.headlesswp.local.conf**

<br>
<b>headlesswp.local.conf</b>

```apache
define ROOT "C:/laragon/www/headlesswp/front/public"
define SITE headlesswp.local

<VirtualHost *:80>
    DocumentRoot "${ROOT}"
    ServerName ${SITE}
    ServerAlias *.${SITE}
    <Directory "${ROOT}">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
<VirtualHost *:443>
    DocumentRoot "${ROOT}"
    ServerName ${SITE}
    ServerAlias *.${SITE}
    <Directory "${ROOT}">
        AllowOverride All
        Require all granted
    </Directory>
    SSLEngine on
    SSLCertificateFile      C:/laragon/etc/ssl/laragon.crt
    SSLCertificateKeyFile   C:/laragon/etc/ssl/laragon.key
</VirtualHost>
```

<br>
<b>app.headlesswp.local.conf</b>

```apache
define ROOT "C:/laragon/www/headlesswp/back/"
define SITE app.headlesswp.local

<VirtualHost *:80>
    DocumentRoot "${ROOT}"
    ServerName ${SITE}
    ServerAlias *.${SITE}
    <Directory "${ROOT}">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
<VirtualHost *:443>
    DocumentRoot "${ROOT}"
    ServerName ${SITE}
    ServerAlias *.${SITE}
    <Directory "${ROOT}">
        AllowOverride All
        Require all granted
    </Directory>
    SSLEngine on
    SSLCertificateFile      C:/laragon/etc/ssl/laragon.crt
    SSLCertificateKeyFile   C:/laragon/etc/ssl/laragon.key
</VirtualHost>
```

<br/>
