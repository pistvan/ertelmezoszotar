const vendors: Record<string, PrivacyPolicyVendorInterface> = {
    googleTagManager: {
        name: 'Google Címkekezelő',
        description: 'A Google Címkekezelő a Google LLC címkekezelő szolgáltatása.',
        country: 'Egyesült Államok',
        manages: ['használati Adatok', 'nyomkövetők'],
        privacyPolicyUrl: 'https://business.safety.google/privacy/',
    },
    googleFonts: {
        name: 'Google Fonts',
        description: 'A Google Fonts a Google LLC által biztosított betűtípus-megjelenítési szolgáltatás, amely lehetővé teszi a Weboldal számára, hogy ilyen tartalmat helyezzen el az oldalain.',
        country: 'Egyesült Államok',
        manages: ['használati Adatok', 'nyomkövetők'],
        privacyPolicyUrl: 'https://business.safety.google/privacy/',
    },
    googleAnalytics: {
        name: 'Google Analytics 4',
        description: h('div', [
            'A Google Analytics 4 a Google LLC („Google”) által nyújtott webelemző szolgáltatás. A Google az összegyűjtött Adatokat a {{ hostname }} használatának nyomon követésére és vizsgálatára, a tevékenységeiről szóló jelentések elkészítésére és a Google más szolgáltatásaival való megosztására használja fel. A Google felhasználhatja az összegyűjtött Adatokat saját hirdetési hálózata hirdetéseinek kontextusba helyezésére és személyre szabására. A Google Analytics 4 szolgáltatásban az IP-címek az adatgyűjtéskor használatosak, majd az adatközpontokban vagy szervereken történő adatnaplózás előtt elvehetők.',
            'A Felhasználók többet megtudhatnak a ',
            h('a', {
                href: 'https://support.google.com/analytics/answer/12017362?hl=hu&ref_topic=2919631',
                target: '_blank',
            }, 'Google hivatalos dokumentációjából'),
            '.',
        ]),
        country: 'Egyesült Államok',
        manages: ['felhasználók száma', 'használati Adatok', 'munkamenet statisztikák', 'nyomkövetők'],
        privacyPolicyUrl: 'https://business.safety.google/privacy/',
        otherLinks: {
            'Opt out': 'https://tools.google.com/dlpage/gaoptout',
        },
    },
    googleAdSense: {
        name: 'Google AdSense',
        description: h('div', [
            'A Google AdSense a Google LLC hirdetési szolgáltatása. Ez a szolgáltatás a „DoubleClick” Cookie-t használja, amely nyomon követi a {{ hostname }} webhely használatát és a Felhasználói viselkedést a hirdetésekkel, a kínált termékekkel és szolgáltatásokkal kapcsolatban. A Felhasználók dönthetnek úgy, hogy az összes DoubleClick-cookie-t letiltják a Google hirdetési beállítások oldalon.',
            h('br'),
            'Annak megértéséhez, hogy a Google hogyan használja fel az adatokat, tekintse át a ',
            h('a', {
                href: 'https://policies.google.com/technologies/partner-sites',
                target: '_blank',
            }, 'Google partnerekre vonatkozó irányelveit'),
            '.',
        ]),
        country: 'Egyesült Államok',
        manages: ['felhasználók száma', 'használati Adatok', 'munkamenet statisztikák', 'nyomkövetők'],
        privacyPolicyUrl: 'https://business.safety.google/privacy/',
        otherLinks: {
            'Opt out': 'https://adssettings.google.com/authenticated',
        },
    },
};

export default vendors;
