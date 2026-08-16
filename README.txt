Dossier audio/ — prononciation des lettres tifinagh
=====================================================

L'appli cherche automatiquement un fichier "audio/<code>.mp3" pour chaque
lettre (voir le champ "audio" dans letters[] dans app.js). S'il n'existe
pas, elle bascule automatiquement sur la synthèse vocale du navigateur
(approximative, signalée comme telle à l'écran).

Codes attendus (33 fichiers, un par lettre) :
a, b, g, gw, d, dd, e, f, k, kw, h, hh, aa, x, q, i, j, l, m, n, u, r, rr,
gh, s, ss, c, t, tt, w, y, z, zz

=> ex. le son du ⵖ (ɣ) doit être dans audio/gh.mp3

Pourquoi ce dossier est vide pour l'instant
--------------------------------------------
Recherche faite (Wikimedia Commons, IRCAM, ressources pédagogiques libres) :
je n'ai pas trouvé de jeu complet d'enregistrements par des locuteurs
amazighophones, couvrant les 33 lettres, avec une licence de réutilisation
clairement vérifiable pour chaque fichier. Je préfère laisser ce dossier
vide plutôt que d'y mettre des liens non vérifiés.

Pistes concrètes pour obtenir de vrais fichiers
-------------------------------------------------
1. Lingua Libre (projet de Wikimédia France, lingualibre.org) : outil de
   crowdsourcing conçu exactement pour ça — un locuteur enregistre une
   liste de mots/lettres en quelques clics, le résultat est versé
   automatiquement sur Wikimedia Commons sous licence libre (CC0/CC-BY).
   C'est probablement la voie la plus fiable si tu as accès à un locuteur
   natif (toi-même, un proche, une association amazighe).
2. Chercher au cas par cas sur Wikimedia Commons, catégorie par catégorie
   (ex. "Category:Tifinagh character ⵣ"), et vérifier à chaque fois :
   - qu'il s'agit bien d'un fichier audio (pas juste une image du glyphe)
   - la licence exacte indiquée sur la page du fichier
3. Contacter l'IRCAM ou un département universitaire d'études amazighes :
   certains mettent à disposition du matériel pédagogique audio.
4. S'enregistrer soi-même (ou un proche/professeur) lettre par lettre,
   au format mp3/ogg — solution la plus simple pour une V1 personnelle.

Une fois les fichiers ajoutés ici avec les noms ci-dessus, aucune
modification du code n'est nécessaire : ils seront utilisés automatiquement.
