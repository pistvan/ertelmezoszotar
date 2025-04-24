<template>
<section>
    <h3>A {{ hostname }} cookie-szabályzata</h3>

    <p>Üdvözöljük a {{ hostname }} cookie-szabályzatában. Ez a szabályzat segít abban, hogy megértse, milyen cookie-kat és nyomkövető technológiákat használunk, hogyan használjuk őket, és milyen jogai vannak ezekkel kapcsolatban</p>

    <p>Legutóbbi frissítés: 2025. április 24.</p>

    <h4>Bevezetés</h4>
    <p>A jelen dokumentum tájékoztatja a Felhasználókat azokról a technológiákról, amelyek segítenek a {{ hostname }} számára az alábbiakban ismertetett célok elérésében. Az ilyen technológiák lehetővé teszik a Tulajdonos számára, hogy a(z) {{ hostname }} alkalmazással való interakció során információkhoz férhessen hozzá és azokat tárolja (például Cookie-k használatával), vagy erőforrásokat használjon (például szkript futtatásával) a Felhasználó eszközén.</p>

    <p>
        Az egyszerűség kedvéért a jelen dokumentumban minden ilyen technológia "Nyomkövetőnek" minősül – kivéve, ha indokolt a különbségtétel.<br>
        Például, bár a Cookie-k webes és mobilböngészőkön egyaránt használhatók, helytelen lenne a mobilalkalmazásokkal összefüggésben a Cookie-król beszélni, mivel ezek böngészőalapú Nyomkövetők. Emiatt a jelen dokumentumban a Cookie-k kifejezést csak akkor használjuk, ha az kifejezetten a Nyomkövető adott típusát hivatott jelezni.
    </p>

    <p>A Nyomkövetők használatának egyes céljaihoz a Felhasználó hozzájárulására is szükség lehet, az alkalmazandó jogtól függően. A hozzájárulás a megadása esetén a jelen dokumentumban foglalt utasításokat követve, bármikor szabadon vissza is vonható.</p>

    <p>
        A {{ hostname }} a Tulajdonos által közvetlenül kezelt Nyomkövetőket (úgynevezett „belső” Nyomkövetők) és a harmadik fél által nyújtott szolgáltatásokat lehetővé tevő Nyomkövetőket (úgynevezett „harmadik fél” Nyomkövetőket) használ. Ha a jelen dokumentum másként nem rendelkezik, a harmadik fél szolgáltatók hozzáférhetnek az általuk kezelt Nyomkövetőkhöz.<br>
        A Cookie-k és más hasonló Nyomkövetők érvényessége és lejárati ideje a Tulajdonos vagy az érintett szolgáltató által meghatározott élettartamtól függően változhat. Ezek egy része a Felhasználó böngészési munkamenetének befejezésekor lejár.<br>
        Az alábbiakban az egyes kategóriák leírásában meghatározottakon túlmenően a Felhasználók az élettartamra vonatkozó specifikációkkal kapcsolatban pontosabb és naprakészebb információkat, valamint minden más releváns információt – például más nyomkövetők jelenlétét – találhatnak az adott weboldal linkelt adatvédelmi szabályzatában, harmadik fél szolgáltatókkal vagy a Tulajdonossal való kapcsolatfelvétel útján.
    </p>

    <h4>Hogyan használja a {{ hostname }} a Nyomkövetőket</h4>
    <h5>Szükséges</h5>
    <p>A {{ hostname }} úgynevezett „technikai” Cookie-kat és más hasonló nyomkövetőket használ a Szolgáltatás működéséhez vagy nyújtásához feltétlenül szükséges tevékenységek végrehajtásához.</p>

    <h6>Harmadik felek által kezelt Nyomkövetők</h6>
    <ul>
        <li>
            <PrivacyPolicyVendor v-bind="vendors.googleTagManager" />
        </li>
    </ul>

    <h5>Élmény</h5>
    <p>A {{ hostname }} a Nyomkövetők segítségével javítja a felhasználói élmény minőségét, és lehetővé teszi a külső tartalmakkal, hálózatokkal és platformokkal való interakciót.</p>

    <h6>Harmadik felek által kezelt Nyomkövetők</h6>
    <ul>
        <li>
            <PrivacyPolicyVendor v-bind="vendors.googleFonts" />
        </li>
    </ul>


    <h5>Mérés</h5>
    <p>A {{ hostname }} Nyomkövetők segítségével méri a forgalmat, és elemzi a felhasználói viselkedést a Szolgáltatás fejlesztése érdekében.</p>

    <h6>Harmadik felek által kezelt Nyomkövetők</h6>
    <ul>
        <li>
            <PrivacyPolicyVendor v-bind="vendors.googleAnalytics" />
        </li>
    </ul>

    <h5>Marketing</h5>
    <p>{{ hostname }} a Nyomkövetőket használja hirdetések vagy marketingtartalom megjelenítésére, valamint ezek teljesítményének mérésére.</p>

    <h6>Harmadik felek által kezelt Nyomkövetők</h6>
    <ul>
        <li>
            <PrivacyPolicyVendor v-bind="vendors.googleAdSense" />
        </li>
    </ul>

    <h5>A preferenciák kezelésének és a hozzájárulás megadásának vagy visszavonásának módja a {{ hostname }} oldalon</h5>
    <p>Ha a Nyomkövetők használata hozzájáruláson alapul, a felhasználók megadhatják vagy visszavonhatják ezt a hozzájárulást úgy, hogy a {{ hostname }} webhelyen elérhető megfelelő adatvédelmi választási panelen keresztül megadják vagy frissítik preferenciáikat.</p>

    <p>A harmadik felek Nyomkövetői tekintetében a Felhasználók a kapcsolódó leiratkozási hivatkozáson (ha van ilyen), a harmadik fél adatvédelmi szabályzatában megjelölt módon, vagy a harmadik fél megkeresésével kezelhetik preferenciáikat.</p>

    <h4>Hogyan kezelheti vagy törölheti a Cookie-kat és a hasonló technológiákat az eszköz beállításain keresztül</h4>
    <p>A felhasználók saját böngészőbeállításaikat használhatják a következőkre:</p>

    <ul>
        <li>Tekintse meg, hogy milyen Cookie-k vagy más hasonló technológiák vannak beállítva az eszközön;</li>
        <li>Cookie-k vagy hasonló technológiák letiltása;</li>
        <li>A Cookie-k vagy hasonló technológiák törlése a böngészőből.</li>
    </ul>
    <p>A böngésző beállításai azonban nem teszik lehetővé a hozzájárulás kategóriánkénti részletes szabályozását.</p>

    <p>A Felhasználók például a következő címeken tájékozódhatnak arról, hogy miként kezelhetik a Cookie-kat a leggyakrabban használt böngészőkben:</p>

    <ul>
        <li><a href="https://support.google.com/chrome/answer/95647?hl=en&p=cpn_cookies" target="_blank">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/" target="_blank">Apple Safari</a></li>
        <li><a href="https://support.microsoft.com/en-us/help/4027947" target="_blank">Microsoft Edge</a></li>
        <li><a href="https://support.brave.com/hc/en-us/articles/360022806212-How-do-I-use-Shields-while-browsing" target="_blank">Brave</a></li>
        <li><a href="https://help.opera.com/en/latest/web-preferences/#cookies" target="_blank">Opera</a></li>
    </ul>
    <p>A Felhasználók a mobilalkalmazásokban használt Nyomkövetők bizonyos kategóriáit is kezelhetik, ha a releváns eszközbeállításokon keresztül leiratkoznak, például a mobileszközökre vonatkozó eszközhirdetési beállításokon vagy általában a követési beállításokon keresztül (A Felhasználók megnyithatják az eszközbeállításokat, és megkereshetik a megfelelő beállítást).</p>

    <h4>Hogyan iratkozhat le az érdeklődésen alapuló hirdetésekről</h4>
    <p>A fentiek ellenére a Felhasználók követhetik a YourOnlineChoices (EU és Egyesült Királyság), a Network Advertising Initiative (USA) és a Digital Advertising Alliance (USA), a DAAC (Kanada), a DDAI (Japán) vagy más hasonló szolgáltatások utasításait. Az ilyen kezdeményezések lehetővé teszik a Felhasználók számára, hogy a legtöbb hirdetési eszköz esetében megválasszák nyomkövetési preferenciáikat. A Tulajdonos ezért azt javasolja a Felhasználóknak, hogy a jelen dokumentumban közölt információkon túl ezeket az erőforrásokat is vegyék igénybe.</p>

    <p>A Digital Advertising Alliance egy AppChoices nevű alkalmazást kínál, amely segít a Felhasználóknak az érdeklődésen alapuló hirdetések szabályozásában a mobilalkalmazásokon.</p>

    <h4>A Nyomkövetők használata megtagadásának következményei</h4>
    <p>A Felhasználók szabadon dönthetnek arról, hogy engedélyezik-e a Nyomkövetők használatát vagy sem. Felhívjuk azonban figyelmét, hogy a Nyomkövetők segítenek a {{ hostname }} számára abban, hogy jobb élményt és fejlettebb funkciókat biztosítsanak a Felhasználóknak (a jelen dokumentumban vázolt célokkal összhangban). Ezért, ha a Felhasználó úgy dönt, hogy letiltja a Nyomkövetők használatát, előfordulhat, hogy a Tulajdonos nem tudja biztosítani a kapcsolódó funkciókat.</p>

    <PrivacyPolicyGlossary />
</section>
</template>

<script setup lang="ts">
import vendors from '~/utils/PrivacyPolicyVendors';

const hostname = useRequestURL().hostname;
</script>
