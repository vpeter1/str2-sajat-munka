Bootstrap 4 sitebuilding projekt

A letölthető fájlok a leírás végén találhatóak. A desktop PDF-fájl fel van címkézve a feladatok szövegével.

Készítsd el a desktop.jpeg/mobile.jpeg képen látható reszponzív honlapot Bootstrap 4 segítségével!

Összesen 2 nézetünk van. Large breakpoint (992px) felett a desktop, alatta a mobil view érvényesüljön! A dizájnhoz használt képeket megtalálod az img mappában. Használj egyéni betűtípusokat – Google Fonts-ról le kell tölteni, és CSS-ben egyéni betűtípusokat kell létrehozni az alábbiak szerint:

    A címsorok és menük betűtípusa: Catamaran, Helvetica, Arial, sans-serif
    Gombok szövege, felső menü linkek: Lato, Helvetica, Arial, sans-serif
    Bekezdések: Muli, Helvetica, Arial, sans-serif
    A footer egységesen: Muli, Helvetica, Arial, sans-serif

A használni kívánt színeket mérd ki! Pontosan meg kell felelni a dizájn színeinek (color picker-t használd)! A margin-, padding-értékeknek, betűméreteknek, sormagasságoknak stb. nem kell pixelpontosnak lennie, de szemre lőjük be, ne térjen el nagyon a dizájnon lévőtől! A feladatok leírását a desktop.pdf fájl tartalmazza megjegyzések formájában, de itt is olvashatod:

Start Bootstrap szöveg (a bal felső sarokban): - Ha fölé visszük a kurzort, fehér lesz a betűszín.

Felső navbar:

    Ha a menü item fölé visszük a kurzort, fehér lesz a betűszín.
    Nem új oldalra vezető linkek, hanem az adott oldalon belüli részhez animálódva le-/felgördül az oldal.
        A Download a Discover what all the buzz is about! részhez
        A Feature az Unlimited Features Unlimited Fun részhez
        A Contact a We love new friends! részhez
    Ez a gördüléses animáció 300ms időtartamú legyen, ez az az idő, amely alatt felülre kerül az adott tartalmi rész.
    A felső menü fixen, mindig látható felül. Ha nem az oldal tetején vagyunk, akkor legyen a menü háttérszíne fehér, a betűk szürkék (desktop-menu.pdf szerint).

Gombok:

    Lekerekítettek
    Ha föléjük visszük a kurzort, sárga lesz a háttérszínük és a border színe is (#fdcc52). Ez 300ms alatt történjen meg, ne rögtön (natív CSS-sel oldd meg, ha tudod).

Felső rózsaszín-lila rész:

    Ez egy linear gradient plusz egy kép repeatelve
    A kép a bg-pattern.png

Discover what all the buzz is about! rész

    Két kép lesz linkként használva (app-store-badge.svg, google-play-badge.svg)
    Ezek olyan képlinkek, amelyek az App Store és a Google Play oldalakra vezetnek.

Unlimited Features Unlimited Fun rész

    A jobb oldali 4-es csoportnál embed row-t használj
    Az ikonok sima UTF-8 karakterek, vagy használd a Simple Line Icons készletet

Stop Waiting Start Building rész

    A háttéren egy áttetsző „szűrő" van
    Ha a gomb fölé visszük a kurzort, sárga lesz a háttér színe és a border színe is (#fdcc52)

We love new friends! rész

    A social-ikonoknál:
        A háttérszín 90%-os opacity-jű
        Ha fölé viszem a kurzort, akkor lesz 100%-os opacity-jű
        Használj Font Awesome-ikonokat
        Az ikonok linkek az adott social page-re
        Mindegyik ikonnak legyen tooltipje, tehát ha fölé viszem a kurzort, megjelenik az adott social page neve (Facebook, Twitter, Google Plus: a Google+ megszűnt, ehelyett bármely más Google-oldalra vezető link megfelel)

Footer

    Sima linkek. Ha föléjük visszük a kurzort, sárga lesz a betűk színe (#fdcc52)
    Nem új oldalra vezetnek, hanem mindegyik 1-1 külön modalt nyit
    Tehát 3 modal lesz: egy Terms, egy Privacy és egy FAQ
    Elég, ha ezeknek a modaloknak a title-je különbözik, a body lehet egy egyszerű lorem ipsum. A modal nyitását jQuery-vel oldjuk meg

Fájlok: bootstrap-sitebuilding-project.zip