# Google Analytics Setup Instructies

Google Analytics is al geïntegreerd in de website. Volg deze stappen om het te activeren:

## Stap 1: Google Analytics Account Aanmaken

1. Ga naar [Google Analytics](https://analytics.google.com/)
2. Log in met uw Google account
3. Klik op "Start measuring" of "Meten starten"
4. Vul de account gegevens in:
   - Account naam: `Hypotheekdelen.nl` (of uw eigen naam)
   - Klik op "Next" / "Volgende"

## Stap 2: Property Aanmaken

1. Vul de property details in:
   - **Property naam**: `Hypotheekdelen.nl`
   - **Reporting tijdzone**: `Netherlands - Amsterdam`
   - **Valuta**: `Euro (EUR)`
2. Klik op "Next" / "Volgende"

3. Bedrijfsinformatie invullen:
   - **Industry**: Finance / Financiën
   - **Business size**: Small / Klein
   - Kies relevante opties voor uw use case
4. Klik op "Create" / "Aanmaken"

5. Accepteer de algemene voorwaarden

## Stap 3: Data Stream Instellen

1. Kies **Web** als platform
2. Vul de website gegevens in:
   - **Website URL**: `https://hypotheekdelen.nl` (of uw daadwerkelijke URL)
   - **Stream name**: `Hypotheekdelen.nl Website`
3. Klik op "Create stream" / "Stream aanmaken"

## Stap 4: Measurement ID Kopiëren

Na het aanmaken van de stream ziet u een scherm met uw **Measurement ID**.

Het ziet er ongeveer zo uit: `G-XXXXXXXXXX` (bijvoorbeeld `G-ABC123DEF4`)

**Kopieer dit Measurement ID!**

## Stap 5: Measurement ID in Website Plaatsen

1. Open het bestand `index.html`
2. Zoek bovenaan in de `<head>` sectie naar deze regel:
   ```javascript
   gtag('config', 'G-XXXXXXXXXX');
   ```
3. Vervang **BEIDE** keren `G-XXXXXXXXXX` met uw echte Measurement ID:
   - Regel 5: `src="https://www.googletagmanager.com/gtag/js?id=G-UW-ECHTE-ID"`
   - Regel 12: `gtag('config', 'G-UW-ECHTE-ID');`

### Voorbeeld:
**Voor:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Na (met voorbeeld ID G-ABC123DEF4):**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC123DEF4"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-ABC123DEF4');
</script>
```

## Stap 6: Website Uploaden en Testen

1. Upload de gewijzigde `index.html` naar uw webserver
2. Bezoek uw website
3. Ga terug naar Google Analytics
4. Klik op "Realtime" in het linkermenu
5. U zou binnen 1-2 minuten uw eigen bezoek moeten zien verschijnen!

## Wat Wordt Er Bijgehouden?

Google Analytics zal automatisch de volgende gegevens bijhouden:

### Standaard Metrics:
- **Aantal bezoekers** (unieke gebruikers)
- **Paginaweergaven**
- **Sessieduur**
- **Bounce rate** (terugstuitpercentage)
- **Geografische locatie** van bezoekers
- **Apparaattype** (desktop, mobiel, tablet)
- **Browser en besturingssysteem**
- **Verkeersbronnen** (direct, Google search, social media, etc.)

### Pagina's die worden bijgehouden:
- Home pagina
- Wat is Hypotheekdelen sectie
- Banken overzicht
- Alternatieven
- Calculator gebruik
- FAQ bekeken
- Bronnen & Referenties

### Gebeurtenissen (Events):
- Klikken op externe links (naar banken)
- Gebruik van de calculator
- Openen van FAQ items
- Klikken op bronnen/referenties

## Handige Rapporten in Google Analytics

Na een paar dagen data verzamelen, bekijk deze rapporten:

1. **Realtime** → Zie live wie er nu op uw site is
2. **Reports > Acquisition > Traffic acquisition** → Waar komen bezoekers vandaan?
3. **Reports > Engagement > Pages and screens** → Welke pagina's zijn het populairst?
4. **Reports > User > Demographics** → Waar wonen uw bezoekers?
5. **Reports > Tech > Tech details** → Welke apparaten gebruiken ze?

## Privacy & AVG Compliance

**Let op:** Voor AVG (GDPR) compliance moet u mogelijk:

1. Een **cookie banner** toevoegen die toestemming vraagt
2. Een **privacyverklaring** pagina toevoegen
3. Bezoekers de optie geven om tracking te weigeren

Google Analytics is AVG-compliant als u:
- IP-anonimisering gebruikt (standaard in GA4)
- Een privacy policy heeft
- Toestemming vraagt (cookie consent)

### Aanbevolen Cookie Consent Tools (gratis opties):
- [Cookiebot](https://www.cookiebot.com/) - Gratis tot 100 pagina's
- [Cookie Information](https://cookieinformation.com/)
- [Complianz](https://complianz.io/)

## Problemen Oplossen

### Ik zie geen data in Google Analytics
- Controleer of u de Measurement ID correct hebt vervangen (BEIDE keren)
- Wacht 24-48 uur voor volledige data
- Check de browser console (F12) voor JavaScript errors
- Controleer of u geen ad-blocker gebruikt die Analytics blokkeert

### Realtime werkt niet
- Zorg dat u de website bezoekt via de echte URL (niet via bestand://)
- Probeer een incognito/private browsing window
- Schakel ad-blockers uit

## Support

Voor meer informatie:
- [Google Analytics Help Center](https://support.google.com/analytics/)
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/) - Gratis cursussen

---

**Laatst bijgewerkt:** Januari 2025
