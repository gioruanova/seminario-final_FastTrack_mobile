# Script para generar APK local
# Uso: .\scripts\build-apk.ps1

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Build APK Local - Fast Track Mobile" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "Error: No se encuentra package.json. Ejecuta este script desde la raíz del proyecto." -ForegroundColor Red
    exit 1
}

# Verificar que existe la carpeta android
if (-not (Test-Path "android")) {
    Write-Host "La carpeta android no existe. Ejecutando prebuild..." -ForegroundColor Yellow
    Write-Host "Ejecutando: npx expo prebuild --platform android" -ForegroundColor Yellow
    npx expo prebuild --platform android
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error durante prebuild. Abortando." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Iniciando build del APK en modo release..." -ForegroundColor Green
Write-Host "Esto puede tardar varios minutos..." -ForegroundColor Yellow
Write-Host ""

# Limpiar builds anteriores
Write-Host "Limpiando builds anteriores..." -ForegroundColor Yellow
Set-Location android
& .\gradlew clean
Set-Location ..

# Generar el APK
Write-Host ""
Write-Host "Generando APK..." -ForegroundColor Green
npx expo run:android --variant release

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Green
    Write-Host "  Build completado exitosamente!" -ForegroundColor Green
    Write-Host "======================================" -ForegroundColor Green
    Write-Host ""
    
    # Buscar el APK generado
    $apkPath = Get-ChildItem -Path "android\app\build\outputs\apk\release" -Filter "*.apk" -Recurse | Select-Object -First 1
    
    if ($apkPath) {
        Write-Host "APK generado en:" -ForegroundColor Cyan
        Write-Host $apkPath.FullName -ForegroundColor White
        Write-Host ""
        Write-Host "Puedes instalarlo manualmente en tu dispositivo Android." -ForegroundColor Green
        Write-Host ""
        Write-Host "Para instalar:" -ForegroundColor Yellow
        Write-Host "  1. Transfiere el APK a tu dispositivo (USB, email, etc.)" -ForegroundColor White
        Write-Host "  2. En tu dispositivo, ve a Configuración > Seguridad" -ForegroundColor White
        Write-Host "  3. Habilita 'Instalar desde orígenes desconocidos'" -ForegroundColor White
        Write-Host "  4. Abre el archivo APK en tu dispositivo y sigue las instrucciones" -ForegroundColor White
    } else {
        Write-Host "No se encontró el APK generado. Revisa los logs de error arriba." -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Red
    Write-Host "  Error durante el build" -ForegroundColor Red
    Write-Host "======================================" -ForegroundColor Red
    Write-Host "Revisa los mensajes de error arriba." -ForegroundColor Yellow
    exit 1
}
