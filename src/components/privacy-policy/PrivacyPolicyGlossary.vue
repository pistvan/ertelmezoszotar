<template>
    <h3>Fogalommeghatározások és jogi hivatkozások</h3>
    <dl>
        <dt>Személyes adatok (vagy Adatok)</dt>
        <dd>Minden olyan adat, amely közvetlenül, közvetve vagy más adattal összefüggésben – ideértve a személyi azonosító jelet is – lehetővé teszi valamely természetes személy azonosítását vagy azonosíthatóvá tételét.</dd>

        <dt>Használati adatok</dt>
        <dd>A {{ hostname }} (vagy a {{ hostname }} alkalmazásban alkalmazott harmadik fél szolgáltatásai) révén automatikusan gyűjtött információk, amelyek magukban foglalhatják a {{ hostname }} szolgáltatást használó Felhasználók által használt számítógépek IP-címét vagy domainnevét, az URI-címeket (Uniform Resource Identifier), a megkeresés időpontját, a megkeresés kiszolgálóhoz történő eljuttatásának módját, a válaszul kapott fájl méretét, a szerver válaszának állapotát jelző számkódot (sikeres eredmény, hiba stb.), a származási országot, a Felhasználó által használt böngésző és operációs rendszer szolgáltatásait, a látogatásonkénti különböző időadatokat (pl. az Alkalmazáson belül az egyes oldalakon eltöltött időt), valamint az Alkalmazáson belüli útvonalra vonatkozó adatokat, különös tekintettel a meglátogatott oldalak sorrendjére és az eszköz operációs rendszerére és/vagy a Felhasználó informatikai környezetére vonatkozó egyéb paraméterekre.</dd>

        <dt>Felhasználó</dt>
        <dd>Az a {{ hostname }} egyedi felhasználója, aki – eltérő rendelkezés hiányában – megegyezik az Érintettel.</dd>

        <dt>Érintett</dt>
        <dd>Az a természetes személy, akire a Személyes adatok vonatkoznak.</dd>

        <dt>Adatfeldolgozó (vagy Feldolgozó)</dt>
        <dd>Az a természetes vagy jogi személy, közhatalmi szerv, ügynökség vagy egyéb szerv, amely az adatkezelő nevében a jelen adatvédelmi nyilatkozatban meghatározottak szerint kezeli a Személyes adatokat.</dd>

        <dt>Adatkezelő (vagy Tulajdonos)</dt>
        <dd>Az a természetes vagy jogi személy, közhatalmi szerv, ügynökség vagy egyéb szerv, amely önállóan vagy másokkal együtt meghatározza a Személyes adatok kezelésének céljait és eszközeit, ideértve a {{ hostname }} működésére és felhasználására vonatkozó biztonsági intézkedéseket is. Eltérő rendelkezés hiányában az Adatkezelő a {{ hostname }} Tulajdonosa.</dd>

        <dt>{{ hostname }} (vagy Weboldal)</dt>
        <dd>A Felhasználó Személyes adatai gyűjtésének és kezelésének módja.</dd>

        <dt>Szolgáltatás</dt>
        <dd>A {{ hostname }} által nyújtott szolgáltatás a relatív feltételekben (ha elérhető) és az ezen a webhelyen/alkalmazásban leírtak szerint.</dd>

        <dt>Európai Unió (vagy EU)</dt>
        <dd>Eltérő rendelkezés hiányában, a jelen dokumentumban az Európai Unióra történő hivatkozások az Európai Unió és az Európai Gazdasági Térség minden jelenlegi tagállamára vonatkoznak.</dd>

        <dt>Cookie</dt>
        <dd>A Cookie-k olyan Nyomkövetők, amelyek a Felhasználó böngészőjében tárolt kis adatkészletekből állnak.</dd>

        <dt>Nyomkövető</dt>
        <dd>A Nyomkövető megjelöl minden olyan technológiát – pl. Cookie-kat, egyedi azonosítókat, web beaconokat, beágyazott szkripteket, e-címkéket és ujjlenyomatokat –, amelyek lehetővé teszik a Felhasználók nyomon követését, például azáltal, hogy a Felhasználó eszközén információkat ér el vagy tárol.</dd>
    </dl>
</template>

<script setup lang="ts">
const hostname = useRequestURL().hostname;
</script>
