// Base de données Climat
export interface ZoneClimatique {
    zone: string;
    etpAnnuelle: number;
    pluieAnnuelle: number;
    tempMoyAnnuelle: number;
}

export const zonesClimatiques: ZoneClimatique[] = [
    { zone: "Alsace (Strasbourg)", etpAnnuelle: 710, pluieAnnuelle: 640, tempMoyAnnuelle: 10.9 },
    { zone: "Champagne Ardenne (Reims)", etpAnnuelle: 682, pluieAnnuelle: 655, tempMoyAnnuelle: 10.5 },
    { zone: "Champagne Ardenne (Troyes)", etpAnnuelle: 640, pluieAnnuelle: 620, tempMoyAnnuelle: 10.7 },
    { zone: "Ile-de-France", etpAnnuelle: 630, pluieAnnuelle: 640, tempMoyAnnuelle: 12.2 },
    { zone: "Picardie (Amiens)", etpAnnuelle: 645, pluieAnnuelle: 700, tempMoyAnnuelle: 10.6 },
    { zone: "Picardie (Beauvais)", etpAnnuelle: 695, pluieAnnuelle: 646, tempMoyAnnuelle: 10.7 },
    { zone: "Picardie (Saint-Quentin)", etpAnnuelle: 640, pluieAnnuelle: 680, tempMoyAnnuelle: 10.8 },
    { zone: "Picardie (Abbevile)", etpAnnuelle: 650, pluieAnnuelle: 900, tempMoyAnnuelle: 10.9 },
    { zone: "Lorraine (Nancy)", etpAnnuelle: 685, pluieAnnuelle: 760, tempMoyAnnuelle: 10.6 },
    { zone: "Aquitaine (Bordeaux)", etpAnnuelle: 895, pluieAnnuelle: 970, tempMoyAnnuelle: 13.5 },
    { zone: "Aquitaine (Pau)", etpAnnuelle: 750, pluieAnnuelle: 1115, tempMoyAnnuelle: 13.2 },
    { zone: "Auvergne (Clermond Ferrand)", etpAnnuelle: 620, pluieAnnuelle: 600, tempMoyAnnuelle: 11.8 },
    { zone: "Basse Normandie (Caen)", etpAnnuelle: 690, pluieAnnuelle: 720, tempMoyAnnuelle: 11.1 },
    { zone: "Belgique (Gemboux)", etpAnnuelle: 565, pluieAnnuelle: 820, tempMoyAnnuelle: 10.3 },
    { zone: "Bourgogne (Dijon)", etpAnnuelle: 730, pluieAnnuelle: 720, tempMoyAnnuelle: 10.8 },
    { zone: "Bourgogne (Auxerre)", etpAnnuelle: 715, pluieAnnuelle: 645, tempMoyAnnuelle: 11.0 },
    { zone: "Bretagne (Rennes)", etpAnnuelle: 700, pluieAnnuelle: 665, tempMoyAnnuelle: 12.0 },
    { zone: "Bretagne (Brest)", etpAnnuelle: 655, pluieAnnuelle: 1150, tempMoyAnnuelle: 11.3 },
    { zone: "Centre (Orléans)", etpAnnuelle: 700, pluieAnnuelle: 640, tempMoyAnnuelle: 11.2 },
    { zone: "Centre (Chateauroux)", etpAnnuelle: 785, pluieAnnuelle: 755, tempMoyAnnuelle: 11.7 },
    { zone: "Centre (Chartres)", etpAnnuelle: 720, pluieAnnuelle: 630, tempMoyAnnuelle: 11.0 },
    { zone: "Corse (Bastia)", etpAnnuelle: 1050, pluieAnnuelle: 750, tempMoyAnnuelle: 15.7 },
    { zone: "Corse (Ajaccio)", etpAnnuelle: 990, pluieAnnuelle: 640, tempMoyAnnuelle: 15.3 },
    { zone: "Franche Comté (Besançon)", etpAnnuelle: 640, pluieAnnuelle: 1105, tempMoyAnnuelle: 10.4 },
    { zone: "Haute Normandie (Rouen)", etpAnnuelle: 720, pluieAnnuelle: 840, tempMoyAnnuelle: 10.6 },
    { zone: "Languedoc-Roussillon (Montpellier)", etpAnnuelle: 1040, pluieAnnuelle: 705, tempMoyAnnuelle: 14.9 },
    { zone: "Limousin (Limoges)", etpAnnuelle: 730, pluieAnnuelle: 1020, tempMoyAnnuelle: 11.3 },
    { zone: "Lorraine (Metz)", etpAnnuelle: 690, pluieAnnuelle: 770, tempMoyAnnuelle: 10.7 },
    { zone: "Midi Pyrénées (Toulouse)", etpAnnuelle: 715, pluieAnnuelle: 655, tempMoyAnnuelle: 13.6 },
    { zone: "Nord Pas de Calais (Lille)", etpAnnuelle: 640, pluieAnnuelle: 695, tempMoyAnnuelle: 10.3 },
    { zone: "Nord Pas de Calais (Arras)", etpAnnuelle: 620, pluieAnnuelle: 640, tempMoyAnnuelle: 10.2 },
    { zone: "PACA (Marseille)", etpAnnuelle: 1255, pluieAnnuelle: 530, tempMoyAnnuelle: 15.3 },
    { zone: "Pays de la Loire (Nantes)", etpAnnuelle: 810, pluieAnnuelle: 795, tempMoyAnnuelle: 12.5 },
    { zone: "Pays de la Loire (Le Mans)", etpAnnuelle: 695, pluieAnnuelle: 680, tempMoyAnnuelle: 11.3 },
    { zone: "Poitou Charentes (Poittiers)", etpAnnuelle: 740, pluieAnnuelle: 690, tempMoyAnnuelle: 11.5 },
    { zone: "Poitou Charentes (La Rochelle)", etpAnnuelle: 905, pluieAnnuelle: 780, tempMoyAnnuelle: 13.0 },
    { zone: "Rhone Alpes (Lyon)", etpAnnuelle: 790, pluieAnnuelle: 830, tempMoyAnnuelle: 11.7 },
    { zone: "Rhone Alpes (Valence)", etpAnnuelle: 840, pluieAnnuelle: 885, tempMoyAnnuelle: 12.3 }
];

// Base de données PRA Grand-Est
export interface PRAGrandEst {
    nomPRACommune: string;
    ddcMoyPRA22: number;
    ddcQ3PRA22: number | null;
}

export const praGrandEst: PRAGrandEst[] = [
    { nomPRACommune: "ARDENNE - HARCY", ddcMoyPRA22: 280, ddcQ3PRA22: 348 },
    { nomPRACommune: "ARGONNE - CLERMONT_EN_ARGONNE", ddcMoyPRA22: 252, ddcQ3PRA22: 309 },
    { nomPRACommune: "ARGONNE - GIVRY_EN_ARGONNE", ddcMoyPRA22: 264, ddcQ3PRA22: 319 },
    { nomPRACommune: "ARGONNE - GRANDPRE", ddcMoyPRA22: 267, ddcQ3PRA22: 312 },
    { nomPRACommune: "BARROIS - BEAUSITE", ddcMoyPRA22: 249, ddcQ3PRA22: 307 },
    { nomPRACommune: "BARROIS - BEURVILLE", ddcMoyPRA22: 245, ddcQ3PRA22: 321 },
    { nomPRACommune: "BARROIS - GRAND", ddcMoyPRA22: 254, ddcQ3PRA22: 316 },
    { nomPRACommune: "BARROIS_VALLEE - LANTY_SUR_AUBE", ddcMoyPRA22: 233, ddcQ3PRA22: 321 },
    { nomPRACommune: "BASSIGNY - VAL_DE_MEUSE", ddcMoyPRA22: 269, ddcQ3PRA22: 327 },
    { nomPRACommune: "BRIE_CHAMPENNOISE - CONGY", ddcMoyPRA22: 251, ddcQ3PRA22: 310 },
    { nomPRACommune: "BRIE_CHAMPENNOISE - LOUAN_VILLEGRUIS_FONTAINE", ddcMoyPRA22: 243, ddcQ3PRA22: 303 },
    { nomPRACommune: "BRIE_EST - CHEVRU", ddcMoyPRA22: 236, ddcQ3PRA22: 308 },
    { nomPRACommune: "BRIE_LAITIERE - JOUARRE", ddcMoyPRA22: 229, ddcQ3PRA22: 302 },
    { nomPRACommune: "CHAMPAGNE_CRAYEUSE - BERRIEUX", ddcMoyPRA22: 238, ddcQ3PRA22: 291 },
    { nomPRACommune: "CHAMPAGNE_CRAYEUSE - COURGENAY", ddcMoyPRA22: 238, ddcQ3PRA22: 315 },
    { nomPRACommune: "CHAMPAGNE_CRAYEUSE - FERE_CHAMPENOISE", ddcMoyPRA22: 255, ddcQ3PRA22: 303 },
    { nomPRACommune: "CHAMPAGNE_CRAYEUSE - PAVILLON_SAINTE_JULIE", ddcMoyPRA22: 236, ddcQ3PRA22: 282 },
    { nomPRACommune: "CHAMPAGNE_CRAYEUSE - SORBON", ddcMoyPRA22: 246, ddcQ3PRA22: 287 },
    { nomPRACommune: "CHAMPAGNE_HUMIDE - CEFFONDS", ddcMoyPRA22: 249, ddcQ3PRA22: 308 },
    { nomPRACommune: "CHAMPAGNE_HUMIDE - CHARMONT", ddcMoyPRA22: 246, ddcQ3PRA22: 295 },
    { nomPRACommune: "CHAMPAGNE_HUMIDE - MONTAULIN", ddcMoyPRA22: 242, ddcQ3PRA22: 313 },
    { nomPRACommune: "CRETES_PRE_ARDENNAISES - BAALONS", ddcMoyPRA22: 257, ddcQ3PRA22: 313 },
    { nomPRACommune: "NOGENTAIS - BARBUISE", ddcMoyPRA22: 254, ddcQ3PRA22: 331 },
    { nomPRACommune: "PAYS_D_OTHE - AUXON", ddcMoyPRA22: 243, ddcQ3PRA22: 311 },
    { nomPRACommune: "PAYS_DE_MONTMEDY - IRE_LE_SEC", ddcMoyPRA22: 262, ddcQ3PRA22: 315 },
    { nomPRACommune: "PAYS_HAUT_LORRAIN - TRIEUX", ddcMoyPRA22: 248, ddcQ3PRA22: 296 },
    { nomPRACommune: "PAYS_REMOIS - REIMS", ddcMoyPRA22: 245, ddcQ3PRA22: 291 },
    { nomPRACommune: "PERTHOIS - ECLARON_BRAUCOURT_SAINTE_LIVIERE", ddcMoyPRA22: 246, ddcQ3PRA22: 307 },
    { nomPRACommune: "PERTHOIS - VITRY_EN_PERTHOIS", ddcMoyPRA22: 236, ddcQ3PRA22: 293 },
    { nomPRACommune: "PLAINE_DE_BRIENNE - LESMONT", ddcMoyPRA22: 236, ddcQ3PRA22: 286 },
    { nomPRACommune: "PLAINE_DE_TROYES - SAINT_PARRES_AUX_TERTRES", ddcMoyPRA22: 232, ddcQ3PRA22: 291 },
    { nomPRACommune: "PLATEAUX DE BOURGOGNE - BIERRY-LES-BELLES-FONTAINES", ddcMoyPRA22: 245, ddcQ3PRA22: null },
    { nomPRACommune: "SAINT_QUENTINOIS_ET_LAONNOIS - MONCEAU_LE_NEUF_ET_FAUCOUZY", ddcMoyPRA22: 236, ddcQ3PRA22: 284 },
    { nomPRACommune: "SOISSONNAIS - CONCEVREUX", ddcMoyPRA22: 247, ddcQ3PRA22: 344 },
    { nomPRACommune: "TARDENOIS - CHAUMUZY", ddcMoyPRA22: 241, ddcQ3PRA22: 349 },
    { nomPRACommune: "TARDENOIS_ET_BRIE - NOGENT_LARTAUD", ddcMoyPRA22: 239, ddcQ3PRA22: 315 },
    { nomPRACommune: "THIERACHE - AOUSTE", ddcMoyPRA22: 262, ddcQ3PRA22: 324 },
    { nomPRACommune: "THIERACHE - FLAMENGRIE", ddcMoyPRA22: 255, ddcQ3PRA22: 313 },
    { nomPRACommune: "VALLAGE - NULLY", ddcMoyPRA22: 238, ddcQ3PRA22: 305 },
    { nomPRACommune: "VALLEE_DE_LA_CHAMPAGNE_CRAYEUSE - ISLE_AUBIGNY", ddcMoyPRA22: 233, ddcQ3PRA22: 302 },
    { nomPRACommune: "VALLEE_DE_LA_CHAMPAGNE_HUMIDE - CLEREY", ddcMoyPRA22: 256, ddcQ3PRA22: 314 },
    { nomPRACommune: "VALLEE_DE_LA_MARNE - CHEPPES_LA_PRAIRIE", ddcMoyPRA22: 248, ddcQ3PRA22: 314 },
    { nomPRACommune: "VALLEE_DU_NOGENTAIS - CRANCEY", ddcMoyPRA22: 264, ddcQ3PRA22: 364 },
    { nomPRACommune: "VALLEES_DE_LA_MARNE_ET_DU_MORIN - CRECY_LA_CHAPELLE", ddcMoyPRA22: 246, ddcQ3PRA22: 339 },
    { nomPRACommune: "VIGNOBLE - BERGERES_LES_VERTUS", ddcMoyPRA22: 252, ddcQ3PRA22: 341 },
    { nomPRACommune: "VIGNOBLE_DU_BARROIS - LONGCHAMP_SUR_AUJON", ddcMoyPRA22: 243, ddcQ3PRA22: 351 },
    { nomPRACommune: "WOEVRE - BONZEE", ddcMoyPRA22: 243, ddcQ3PRA22: 298 },
    { nomPRACommune: "WOEVRE - SANZEY", ddcMoyPRA22: 237, ddcQ3PRA22: 293 }
];

// Base de données Engrais
export interface EngraisMineral {
    nom: string;
    type: string;
    concentrationN: number;
    concentrationP: number;
    concentrationK: number;
    feModifie: number;
    fe: number;
    unite: string;
    uniteAttendue: string;
    prix: number;
    fracGazf: number;
}

export const engraisMineraux: EngraisMineral[] = [
    { nom: "N - Ammonium 33,5", type: "Engrais simple", concentrationN: 33.5, concentrationP: 0, concentrationK: 0, feModifie: 0, fe: 3.97, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.029 },
    { nom: "N - Entec 21 ou 24 (avec inhib)", type: "Engrais simple", concentrationN: 21, concentrationP: 0, concentrationK: 0, feModifie: 0, fe: 3.65, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.029 },
    { nom: "N - IZ DZ + 26 (decarbo. + inhib)", type: "Engrais simple", concentrationN: 26, concentrationP: 0, concentrationK: 0, feModifie: 0, fe: 1, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.029 },
    { nom: "N - Nexen 46", type: "Engrais simple", concentrationN: 46, concentrationP: 0, concentrationK: 0, feModifie: 0, fe: 4.54, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.062 },
    { nom: "N - Selamo", type: "Engrais simple", concentrationN: 4, concentrationP: 0, concentrationK: 0, feModifie: 0, fe: 4.99, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.103 },
    { nom: "N - Solution Azotée 30", type: "Engrais simple", concentrationN: 30, concentrationP: 0, concentrationK: 0, feModifie: 0, fe: 4.99, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.103 },
    { nom: "N - Urée 46", type: "Engrais simple", concentrationN: 46, concentrationP: 0, concentrationK: 0, feModifie: 0, fe: 4.54, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.166 },
    { nom: "N - Urée protégée NBP", type: "Engrais simple", concentrationN: 46, concentrationP: 0, concentrationK: 0, feModifie: 0, fe: 4.54, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.062 },
    { nom: "N-P - 12-27-00 + 25 SO₃", type: "Azote + Phosphate", concentrationN: 12, concentrationP: 27, concentrationK: 0, feModifie: 0, fe: 4.095, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.023 },
    { nom: "N-P - Azophos 18-23-00 + 15 SO₃", type: "Azote + Phosphate", concentrationN: 18, concentrationP: 23, concentrationK: 0, feModifie: 0, fe: 2.325555556, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.023 },
    { nom: "N-P - DAP 18-46-00", type: "Azote + Phosphate", concentrationN: 18, concentrationP: 46, concentrationK: 0, feModifie: 0, fe: 7.717777778, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.023 },
    { nom: "N-P - Nergetic CPRO 20-12 Zimactiv (avec inhib)", type: "Azote + Phosphate", concentrationN: 20, concentrationP: 12, concentrationK: 0, feModifie: 0, fe: 1.812, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.029 },
    { nom: "N-P Entech 25-15-0 (avec inhib)", type: "Azote + Phosphate", concentrationN: 25, concentrationP: 15, concentrationK: 0, feModifie: 0, fe: 1.092, unite: "kg eqCO2/kgN", uniteAttendue: "kgN/ha", prix: 0, fracGazf: 0.023 },
    { nom: "N-P-K - 15-15-15 + 15 SO₃", type: "Ternaire", concentrationN: 15, concentrationP: 15, concentrationK: 15, feModifie: 0, fe: 0.9765, unite: "kg eqCO2/kgtot", uniteAttendue: "kgTotal/ha", prix: 0, fracGazf: 0.079 },
    { nom: "N-P-K - 15-15-15 + 27 SO₃", type: "Ternaire", concentrationN: 15, concentrationP: 15, concentrationK: 15, feModifie: 0, fe: 0.9765, unite: "kg eqCO2/kgtot", uniteAttendue: "kgTotal/ha", prix: 0, fracGazf: 0.079 },
    { nom: "N-P-K - 16-07-13 + 21 SO₃", type: "Ternaire", concentrationN: 16, concentrationP: 7, concentrationK: 13, feModifie: 0, fe: 0.8556, unite: "kg eqCO2/kgtot", uniteAttendue: "kgTotal/ha", prix: 0, fracGazf: 0.079 },
    { nom: "N-P-K - 16-17-12 + 8 SO₃", type: "Ternaire", concentrationN: 16, concentrationP: 17, concentrationK: 12, feModifie: 0, fe: 1.0315, unite: "kg eqCO2/kgtot", uniteAttendue: "kgTotal/ha", prix: 0, fracGazf: 0.079 },
    { nom: "N-P-K - Nergetic CPRO 12-06-20 (avec inhib)", type: "Ternaire", concentrationN: 12, concentrationP: 6, concentrationK: 20, feModifie: 0, fe: 0.7282, unite: "kg eqCO2/kgtot", uniteAttendue: "kgTotal/ha", prix: 0, fracGazf: 0.079 },
    { nom: "N-P-K - Nergetic CPRO 22-06-10  (avec inhib)", type: "Ternaire", concentrationN: 22, concentrationP: 6, concentrationK: 10, feModifie: 0, fe: 1.0542, unite: "kg eqCO2/kgtot", uniteAttendue: "kgTotal/ha", prix: 0, fracGazf: 0.079 },
    { nom: "N-P-K - Sulfapot Eska", type: "Ternaire", concentrationN: 3, concentrationP: 8.5, concentrationK: 10.5, feModifie: 0, fe: 0.3492, unite: "kg eqCO2/kgtot", uniteAttendue: "kgTotal/ha", prix: 0, fracGazf: 0.11 },
    { nom: "N-P-K - Vinaskor", type: "Ternaire", concentrationN: 3.25, concentrationP: 6.75, concentrationK: 8.5, feModifie: 0, fe: 0.3129, unite: "kg eqCO2/kgtot", uniteAttendue: "kgTotal/ha", prix: 0, fracGazf: 0.11 }
];

// Base de données Amendements Calciques
export interface AmendementCalcique {
    nom: string;
    valeurNeutralisante: number;
    feVN: number;
    source: string;
}

export const amendementsCalciques: AmendementCalcique[] = [
    { nom: "Carbonate de calcium", valeurNeutralisante: 0.55, feVN: 1.25721874, source: "GES'TIM+" },
    { nom: "Chaux vive", valeurNeutralisante: 0.94, feVN: 0.31125283, source: "GES'TIM+" },
    { nom: "Ecumes de sucreries", valeurNeutralisante: 0.35, feVN: 0.10013922, source: "GES'TIM+" }
];

// Base de données Produits Résiduaires Organiques (PRO)
export interface PRO {
    name: string;
    ismo: string;
    teneurCKgT: number;
    feCO2eqT: number;
    volatilisation: number;
    nMoyenKgT: number;
    tanKgNH4T: number;
    prixT: number;
    feMafor: number;
    commentaire: string;
    simeosTeneurCKgT: number;
    k1: number;
    teneurxK1: number;
    delta: number;
}

export const pros: PRO[] = [
    { name: "AGRALI RR", ismo: "55%", teneurCKgT: 248, feCO2eqT: 37.574, volatilisation: 0.81, nMoyenKgT: 25, tanKgNH4T: 0.6, prixT: 95, feMafor: 37.574, commentaire: "Vinasse concentrée (t/ha)", simeosTeneurCKgT: 248, k1: 0.55, teneurxK1: 136.4, delta: 111.6 },
    { name: "ASH 00-05-08 + 2,5 MGO VRAC", ismo: "54%", teneurCKgT: 150, feCO2eqT: 166.356, volatilisation: 0.4, nMoyenKgT: 7.9, tanKgNH4T: 2.4, prixT: 31, feMafor: 166.356, commentaire: "Refus lisier de porc +/- composté", simeosTeneurCKgT: 139, k1: 0.63, teneurxK1: 94.5, delta: 55.5 },
    { name: "AVF SK6%", ismo: "46%", teneurCKgT: 207, feCO2eqT: 954, volatilisation: 0.81, nMoyenKgT: 21.6, tanKgNH4T: 2, prixT: 0, feMafor: 667.657, commentaire: "Compost de fumier de volailles", simeosTeneurCKgT: 110, k1: 0.46, teneurxK1: 95.2, delta: 111.8 },
    { name: "BIOCOMPIG", ismo: "73%", teneurCKgT: 128.77, feCO2eqT: 954, volatilisation: 0.71, nMoyenKgT: 8.75, tanKgNH4T: 0.7, prixT: 0, feMafor: 667.657, commentaire: "Compost de fumier (sauf volaille)", simeosTeneurCKgT: 123, k1: 0.72, teneurxK1: 92.7, delta: 36.1 },
    { name: "FUMIER BOVIN", ismo: "65%", teneurCKgT: 90.07, feCO2eqT: 9.2, volatilisation: 0.79, nMoyenKgT: 4.79, tanKgNH4T: 0.92, prixT: 14, feMafor: 11.098, commentaire: "Fumier bovin", simeosTeneurCKgT: 80, k1: 0.67, teneurxK1: 60.3, delta: 29.7 },
    { name: "FIENTES DE VOLAILLES", ismo: "16%", teneurCKgT: 211, feCO2eqT: 20, volatilisation: 0.54, nMoyenKgT: 25.5, tanKgNH4T: 7.4, prixT: 0, feMafor: 20.202, commentaire: "Fiente de Dinde", simeosTeneurCKgT: 211, k1: 0.16, teneurxK1: 33.8, delta: 177.2 },
    { name: "Z- Compost de déchets verts", ismo: "80%", teneurCKgT: 129.15, feCO2eqT: 211, volatilisation: 0.71, nMoyenKgT: 7.79, tanKgNH4T: 0.44, prixT: 25, feMafor: 632.328, commentaire: "Compost de déchets verts", simeosTeneurCKgT: 121, k1: 0.82, teneurxK1: 105.9, delta: 23.2 },
    { name: "Z- Digestat liquide", ismo: "43%", teneurCKgT: 26.64, feCO2eqT: 191, volatilisation: 0.4, nMoyenKgT: 4.69, tanKgNH4T: 2.81, prixT: 0, feMafor: 21.136, commentaire: "Digestat liquide", simeosTeneurCKgT: 15, k1: 0.63, teneurxK1: 16.8, delta: 9.9 },
    { name: "Z- Lisier de Porc (m3/ha)", ismo: "50%", teneurCKgT: 11, feCO2eqT: 18, volatilisation: 0.4, nMoyenKgT: 3.5, tanKgNH4T: 2.5, prixT: 0, feMafor: 18.473, commentaire: "Lisier de Porc", simeosTeneurCKgT: 21, k1: 0.51, teneurxK1: 5.6, delta: 5.4 },
    { name: "Z- Vinasse concentrée", ismo: "55%", teneurCKgT: 248, feCO2eqT: 37.574, volatilisation: 0.81, nMoyenKgT: 25, tanKgNH4T: 0.6, prixT: 95, feMafor: 37.574, commentaire: "Vinasse concentrée (t/ha)", simeosTeneurCKgT: 248, k1: 0.55, teneurxK1: 136.4, delta: 111.6 }
];

// Base de données Matériel et Délais
export interface MaterielDelais {
    materielDelais: string;
    materiel: string;
    delais: string;
    facteurAjustement: number;
}

export const materielDelais: MaterielDelais[] = [
    { materielDelais: "Buse et rampe < 4h", materiel: "Buse et rampe", delais: "< 4h", facteurAjustement: 0.3 },
    { materielDelais: "Buse et rampe entre 4 et 12 h", materiel: "Buse et rampe", delais: "entre 4 et 12 h", facteurAjustement: 0.5 },
    { materielDelais: "Buse et rampe entre 12 et 24 h", materiel: "Buse et rampe", delais: "entre 12 et 24 h", facteurAjustement: 0.75 },
    { materielDelais: "Buse et rampe > 24h", materiel: "Buse et rampe", delais: "> 24h", facteurAjustement: 0.95 },
    { materielDelais: "Buse et rampe Non précisé", materiel: "Buse et rampe", delais: "Non précisé", facteurAjustement: 1 },
    { materielDelais: "Pendillard < 4h", materiel: "Pendillard", delais: "< 4h", facteurAjustement: 0.21 },
    { materielDelais: "Pendillard entre 4 et 12 h", materiel: "Pendillard", delais: "entre 4 et 12 h", facteurAjustement: 0.35 },
    { materielDelais: "Pendillard entre 12 et 24 h", materiel: "Pendillard", delais: "entre 12 et 24 h", facteurAjustement: 0.53 },
    { materielDelais: "Pendillard > 24h", materiel: "Pendillard", delais: "> 24h", facteurAjustement: 0.67 },
    { materielDelais: "Pendillard Non précisé", materiel: "Pendillard", delais: "Non précisé", facteurAjustement: 0.7 },
    { materielDelais: "Enfouisseur", materiel: "Enfouisseur", delais: "", facteurAjustement: 0.3 },
    { materielDelais: "Epandeur fumier < 4h", materiel: "Epandeur fumier", delais: "< 4h", facteurAjustement: 0.3 },
    { materielDelais: "Epandeur fumier entre 4 et 12 h", materiel: "Epandeur fumier", delais: "entre 4 et 12 h", facteurAjustement: 0.5 },
    { materielDelais: "Epandeur fumier entre 12 et 24 h", materiel: "Epandeur fumier", delais: "entre 12 et 24 h", facteurAjustement: 0.75 },
    { materielDelais: "Epandeur fumier > 24h", materiel: "Epandeur fumier", delais: "> 24h", facteurAjustement: 0.95 },
    { materielDelais: "Epandeur fumier Non précisé", materiel: "Epandeur fumier", delais: "Non précisé", facteurAjustement: 1 },
    { materielDelais: "Non précisé < 4h", materiel: "Non précisé", delais: "< 4h", facteurAjustement: 0.3 },
    { materielDelais: "Non précisé entre 4 et 12 h", materiel: "Non précisé", delais: "entre 4 et 12 h", facteurAjustement: 0.5 },
    { materielDelais: "Non précisé entre 12 et 24 h", materiel: "Non précisé", delais: "entre 12 et 24 h", facteurAjustement: 0.75 },
    { materielDelais: "Non précisé > 24h", materiel: "Non précisé", delais: "> 24h", facteurAjustement: 0.95 },
    { materielDelais: "Non précisé Non précisé", materiel: "Non précisé", delais: "Non précisé", facteurAjustement: 1 }
];