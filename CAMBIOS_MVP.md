# Cambios realizados para MVP - VisionUI Web

## 1. Error "Payment system not configured" - Diagnóstico y corrección

### Causa probable
El error aparece cuando faltan variables en Cloudflare Workers:
- **LEMONSQUEEZY_API_KEY** - API Key de LemonSqueezy
- **LEMONSQUEEZY_STORE_ID** - ID de tu tienda  
- **LEMONSQUEEZY_VARIANT_ID** - ID de la variante del producto (crítico)

### Cambios realizados
- **worker.js**: Mensajes de error más específicos con `hint` para indicar qué variable falta
- **worker.js**: Mejor fallback para `app_name` al buscar variante (usa `app_name` si `plan` no existe)
- **store.html**: Muestra el `hint` del API en el alert cuando hay error
- **ENV_VARIABLES.md**: Instrucciones detalladas para obtener LEMONSQUEEZY_VARIANT_ID

### Cómo verificar tu configuración
```bash
# Diagnóstico rápido (sin hacer pago)
curl https://admin.visionui.app/api/lemonsqueezy/status
```
Debe mostrar `has_variant_id: true`. Si es `false`, añade LEMONSQUEEZY_VARIANT_ID:
1. LemonSqueezy Dashboard > Products > [VisionUI Apps]
2. Clic en la variante (ej: "Default")
3. Copiar el "Variant ID"
4. Cloudflare Workers > Settings > Variables > Añadir LEMONSQUEEZY_VARIANT_ID

---

## 2. Flujo de licencias y webhook

### Webhook LemonSqueezy
- Mejorado el fallback de `app_name` cuando el producto es genérico
- Añadido "default" a variantes genéricas para producto único
- El `custom_data.app_name` del checkout se pasa correctamente al webhook

### Flujo completo
1. Usuario compra en web → checkout envía `app_name` (TestApp, VisionUI, etc.)
2. LemonSqueezy procesa pago → webhook recibe `custom_data.app_name`
3. Worker crea licencia con `app` correcto
4. Worker crea entitlement en `user_entitlements`
5. Usuario puede login en VuI app con email + contraseña web

---

## 3. Internacionalización (i18n) EN/ES

### Nuevas claves añadidas
- `error.network`, `error.timeout`, `error.payment_not_configured`
- `post.step2_desc_generic`, `post.step2_desc_has_password`, `post.step2_desc_setup_token`
- `general.processing_license`, `general.email_sent_check`, `general.license_ready`, `general.email_sent_success`
- `auth.passwords_match`, `auth.the_app`, `auth.login_to_purchase`
- `tag.can`

### Correcciones
- **auth.js**: Corregido typo VUI18n → VUIi18n
- **post-purchase.html**: Contenido dinámico usa VUIi18n.t() según idioma
- **account.html**: Mensajes de redirect y password match usan i18n

---

## 4. Correcciones de bugs

### account.html
- **renderOrders**: `amount_paid` ya está en dólares en la DB (no dividir por 100)
- Manejo correcto para legacy: si amount >= 100 asume centavos

### store.html
- **showCheckoutError**: Maneja null en btn/btnText/btnSpinner
- **proceedToCheckoutDirect**: Usa showCheckoutError para mensajes consistentes

---

## 5. Archivos modificados

| Archivo | Cambios |
|---------|---------|
| `cloud/CloudFlare/worker.js` | Errores LemonSqueezy, webhook app_name |
| `cloud/CloudFlare/ENV_VARIABLES.md` | Instrucciones VARIANT_ID, diagnóstico |
| `cloud/GitHub/visionui-web/pages/store.html` | Errores checkout, i18n |
| `cloud/GitHub/visionui-web/pages/account.html` | renderOrders, i18n |
| `cloud/GitHub/visionui-web/pages/post-purchase.html` | i18n dinámico |
| `cloud/GitHub/visionui-web/assets/js/auth.js` | VUIi18n typo, i18n keys |
| `cloud/GitHub/visionui-web/assets/js/i18n.js` | Nuevas traducciones |

---

## Próximos pasos recomendados

1. **Verificar variables en Cloudflare**: Especialmente LEMONSQUEEZY_VARIANT_ID
2. **Probar checkout**: Con LemonSqueezy en test mode
3. **Configurar webhook**: URL `https://admin.visionui.app/api/lemonsqueezy/webhook`
4. **Desplegar**: Worker a Cloudflare, web a GitHub Pages
