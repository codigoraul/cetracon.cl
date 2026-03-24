# Instrucciones de Despliegue Automático

Este proyecto está configurado para desplegarse automáticamente a tu servidor FTP cada vez que hagas push a la rama `main`.

## Configurar Secrets en GitHub

Para que el despliegue automático funcione, necesitas configurar los siguientes secrets en tu repositorio de GitHub:

### Pasos:

1. Ve a tu repositorio en GitHub: https://github.com/codigoraul/cetracon.cl
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Secrets and variables** → **Actions**
4. Haz clic en **New repository secret**
5. Agrega los siguientes secrets:

### Secrets requeridos:

**Secret 1:**
- Name: `FTP_SERVER`
- Value: `ftp.cetracon.cl`

**Secret 2:**
- Name: `FTP_USERNAME`
- Value: `conexion@cetracon.cl`

**Secret 3:**
- Name: `FTP_PASSWORD`
- Value: `conexioncetra`

**Secret 4:**
- Name: `FTP_SERVER_DIR`
- Value: `prueba/`

## Cómo funciona

Una vez configurados los secrets, cada vez que hagas `git push` a la rama `main`:

1. GitHub Actions ejecutará automáticamente el workflow
2. Instalará las dependencias del proyecto
3. Construirá el sitio con `npm run build`
4. Subirá los archivos generados a tu servidor FTP en la carpeta `/home/cetracon/public_html/prueba/`

## Servidor de destino

- **Servidor FTP:** ftp.cetracon.cl
- **Directorio:** /home/cetracon/public_html/prueba/
- **URL del sitio:** https://cetracon.cl/prueba/

## Verificar el despliegue

Después de hacer push, puedes ver el progreso del despliegue en:
https://github.com/codigoraul/cetracon.cl/actions

## Notas importantes

- El despliegue solo se ejecuta cuando haces push a la rama `main`
- Los archivos se subirán a la carpeta `prueba` dentro de `public_html`
- El proceso tarda aproximadamente 2-3 minutos en completarse
- Recibirás una notificación por email si el despliegue falla
