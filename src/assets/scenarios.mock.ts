export interface Culture {
    id: string;
    culture: string;
    rendement: number;
    semis: string;
    recolte: string;
    surface: number;
}

export interface Interculture {
    couvert: string;
    biomasse: number;
    semis: string;
    destruction: string;
}

export interface AmendementOrganique {
    pro: string;
    quantite: number;
    unite: string;
    inhibiteurNitrification: boolean;
    enfouissementMaterielDelais: string;
}

export interface FertilisationAzotee {
    engraisMineral: string;
    quantite: number;
    unite: string;
    inhibiteurNitrification: boolean;
}

export interface FumureFond {
    phosphateP: number;
    potasseK: number;
}

export interface LigneCulture {
    culture: Culture;
    interculture?: Interculture;
    amendementOrganique1?: AmendementOrganique;
    amendementOrganique2?: AmendementOrganique;
    fertilisationAzotee1?: FertilisationAzotee;
    fertilisationAzotee2?: FertilisationAzotee;
    fertilisationAzotee3?: FertilisationAzotee;
    fumureFond?: FumureFond;
}

export interface IAE {
    pourcentageIAE: number;
    tailleMoyenneParcelles: number;
    certificationEnvironnementale: string;
    consommationCarburant: number;
    typeCarburant: string;
    utilisationOAD: boolean;
}

export interface Chaulage {
    nombreHectare: number;
    amendementCalcique: string;
    quantiteHectare: number;
}

export interface Scenario {
    id: string;
    exploitationId: string;
    type: "T0" | "previsionnel";
    nom: string;
    annee: number;
    iae: IAE;
    chaulage: Chaulage;
    cultures: LigneCulture[];
    isEmpty?: boolean;
}

export interface ResultatScenario {
    scenarioId: string;
    ddc: number;
    carboneHumifie: number;
    bilanGES: {
        stockage: number;
        emissions: {
            total: number;
            fertilisations: number;
            mineraleDirecte: number;
            mineraleAmont: number;
            organiqueDirecteResidus: number;
            organiqueAmont: number;
            volatilisationLixiviation: number;
            carburants: number;
            chaulage: number;
        };
        bilanNet: number;
    };
    emissionsParCulture: Array<{
        culture: string;
        emissions: number;
        facteurEmissions: number;
    }>;
}

export const scenarios: Scenario[] = [
    // EARL DUPONT
    {
        id: "earl-dupont-t0",
        exploitationId: "earl-dupont",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: false,
        iae: {
            pourcentageIAE: 5,
            tailleMoyenneParcelles: 14,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 0,
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-dupont-t0",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.2,
                    semis: "2023-10-15",
                    recolte: "2024-07-15",
                    surface: 22,
                },
                interculture: {
                    couvert: "Moutarde",
                    biomasse: 2.5,
                    semis: "2023-08-20",
                    destruction: "2023-10-10",
                },
                amendementOrganique1: {
                    pro: "Fumier de bovins",
                    quantite: 18,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissementMaterielDelais: "Buse et rampe < 4h",
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33,5",
                    quantite: 140,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 60,
                    potasseK: 120,
                },
            },
            {
                culture: {
                    id: "colza-dupont-t0",
                    culture: "Colza d'hiver",
                    rendement: 3.6,
                    semis: "2023-08-25",
                    recolte: "2024-07-10",
                    surface: 13,
                },
                interculture: {
                    couvert: "Radis fourrager",
                    biomasse: 2.8,
                    semis: "2023-07-30",
                    destruction: "2023-08-20",
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33,5",
                    quantite: 170,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 80,
                    potasseK: 150,
                },
            },
        ],
    },
    {
        id: "earl-dupont-previsionnel",
        exploitationId: "earl-dupont",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: false,
        iae: {
            pourcentageIAE: 8,
            tailleMoyenneParcelles: 12,
            certificationEnvironnementale: "HVE",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: true,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 2,
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-dupont-prev",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.8,
                    semis: "2026-10-20",
                    recolte: "2027-07-20",
                    surface: 18,
                },
                interculture: {
                    couvert: "Mélange légumineuses",
                    biomasse: 3.5,
                    semis: "2026-07-25",
                    destruction: "2026-10-15",
                },
                amendementOrganique1: {
                    pro: "Compost végétal",
                    quantite: 15,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissementMaterielDelais: "Compost végétal",
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33,5",
                    quantite: 120,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 100,
                },
            },
            {
                culture: {
                    id: "luzerne-dupont-prev",
                    culture: "Luzerne",
                    rendement: 11.5,
                    semis: "2027-03-15",
                    recolte: "2027-09-30",
                    surface: 7,
                },
                interculture: {
                    couvert: "Pas de couvert",
                    biomasse: 0,
                    semis: "",
                    destruction: "",
                },
                fumureFond: {
                    phosphateP: 40,
                    potasseK: 200,
                },
            },
        ],
    },
    // SCEA MARTIN
    {
        id: "scea-martin-t0",
        exploitationId: "scea-martin",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: false,
        iae: {
            pourcentageIAE: 2,
            tailleMoyenneParcelles: 11,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 0,
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-martin",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.1,
                    semis: "2023-10-12",
                    recolte: "2024-07-12",
                    surface: 18,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33,5",
                    quantite: 125,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 100,
                },
            },
            {
                culture: {
                    id: "orge-hiver-martin",
                    culture: "Orge d'hiver",
                    rendement: 6.2,
                    semis: "2023-10-05",
                    recolte: "2024-07-05",
                    surface: 12,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33,5",
                    quantite: 110,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 45,
                    potasseK: 90,
                },
            },
        ],
    },
    {
        id: "scea-martin-previsionnel",
        exploitationId: "scea-martin",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: false,
        iae: {
            pourcentageIAE: 4,
            tailleMoyenneParcelles: 10,
            certificationEnvironnementale: "HVE",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: true,
        },
        chaulage: {
            nombreHectare: 1,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 1.2,
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-martin-prev",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.5,
                    semis: "2026-10-15",
                    recolte: "2027-07-15",
                    surface: 15,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33,5",
                    quantite: 120,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fumureFond: {
                    phosphateP: 48,
                    potasseK: 95,
                },
            },
            {
                culture: {
                    id: "pois-proteagineux-martin-prev",
                    culture: "Pois protéagineux",
                    rendement: 3.1,
                    semis: "2027-03-20",
                    recolte: "2027-08-10",
                    surface: 10,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N/A",
                    quantite: 0,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 40,
                    potasseK: 80,
                },
            },
        ],
    },
    // GAEC BERNARD
    {
        id: "gaec-bernard-t0",
        exploitationId: "gaec-bernard",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: false,
        iae: {
            pourcentageIAE: 3,
            tailleMoyenneParcelles: 18,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 1.5,
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-bernard",
                    culture: "Blé tendre d'hiver",
                    rendement: 6.8,
                    semis: "2023-10-20",
                    recolte: "2024-07-20",
                    surface: 30,
                },
                amendementOrganique1: {
                    pro: "Fumier de bovins",
                    quantite: 25,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissementMaterielDelais: "Buse et rampe < 4h",
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33,5",
                    quantite: 140,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 100,
                },
            },
        ],
    },
    {
        id: "gaec-bernard-previsionnel",
        exploitationId: "gaec-bernard",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: false,
        iae: {
            pourcentageIAE: 6,
            tailleMoyenneParcelles: 16,
            certificationEnvironnementale: "HVE",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: true,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 2.5,
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-bernard-prev",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.2,
                    semis: "2026-10-25",
                    recolte: "2027-07-25",
                    surface: 25,
                },
                interculture: {
                    couvert: "Phacélie",
                    biomasse: 2.8,
                    semis: "2026-07-30",
                    destruction: "2026-10-20",
                },
                amendementOrganique1: {
                    pro: "Compost végétal",
                    quantite: 18,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissementMaterielDelais: "Compost végétal",
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33.5 % 33.5%",
                    quantite: 110,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fumureFond: {
                    phosphateP: 45,
                    potasseK: 90,
                },
            },
        ],
    },
    // EARL MOREAU
    {
        id: "earl-moreau-t0",
        exploitationId: "earl-moreau",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: false,
        iae: {
            pourcentageIAE: 4,
            tailleMoyenneParcelles: 12,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 0,
        },
        cultures: [
            {
                culture: {
                    id: "mais-moreau",
                    culture: "Maïs grain",
                    rendement: 9.2,
                    semis: "2024-04-15",
                    recolte: "2024-10-15",
                    surface: 35,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Urée 46%%",
                    quantite: 180,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 70,
                    potasseK: 140,
                },
            },
            {
                culture: {
                    id: "tournesol-moreau",
                    culture: "Tournesol",
                    rendement: 2.8,
                    semis: "2024-04-20",
                    recolte: "2024-09-10",
                    surface: 20,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33.5 % 33.5%",
                    quantite: 80,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 60,
                    potasseK: 120,
                },
            },
        ],
    },
    {
        id: "earl-moreau-previsionnel",
        exploitationId: "earl-moreau",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: false,
        iae: {
            pourcentageIAE: 7,
            tailleMoyenneParcelles: 10,
            certificationEnvironnementale: "HVE",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: true,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 1.2,
        },
        cultures: [
            {
                culture: {
                    id: "mais-moreau-prev",
                    culture: "Maïs grain",
                    rendement: 9.8,
                    semis: "2027-04-20",
                    recolte: "2027-10-20",
                    surface: 30,
                },
                interculture: {
                    couvert: "Seigle",
                    biomasse: 3.2,
                    semis: "2026-10-25",
                    destruction: "2027-04-15",
                },
                fertilisationAzotee1: {
                    engraisMineral: "Urée protégée NBP",
                    quantite: 160,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fumureFond: {
                    phosphateP: 65,
                    potasseK: 130,
                },
            },
            {
                culture: {
                    id: "soja-moreau-prev",
                    culture: "Soja",
                    rendement: 3.2,
                    semis: "2027-05-10",
                    recolte: "2027-09-25",
                    surface: 25,
                },
                interculture: {
                    couvert: "Avoine",
                    biomasse: 2.5,
                    semis: "2026-09-30",
                    destruction: "2027-05-05",
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 150,
                },
            },
        ],
    },
    // SCEA ROUSSEAU
    {
        id: "scea-rousseau-t0",
        exploitationId: "scea-rousseau",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: false,
        iae: {
            pourcentageIAE: 2,
            tailleMoyenneParcelles: 15,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 0,
        },
        cultures: [
            {
                culture: {
                    id: "ble-rousseau",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.1,
                    semis: "2023-10-10",
                    recolte: "2024-07-10",
                    surface: 40,
                },
                amendementOrganique1: {
                    pro: "Lisier de Porc",
                    quantite: 30,
                    unite: "m3/ha",
                    inhibiteurNitrification: false,
                    enfouissementMaterielDelais: "Lisier de Porc",
                },
                fertilisationAzotee1: {
                    engraisMineral: "Solution Azotée 30",
                    quantite: 160,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 55,
                    potasseK: 110,
                },
            },
        ],
    },
    {
        id: "scea-rousseau-previsionnel",
        exploitationId: "scea-rousseau",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: false,
        iae: {
            pourcentageIAE: 5,
            tailleMoyenneParcelles: 13,
            certificationEnvironnementale: "HVE",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: true,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 1.8,
        },
        cultures: [
            {
                culture: {
                    id: "ble-rousseau-prev",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.6,
                    semis: "2026-10-15",
                    recolte: "2027-07-15",
                    surface: 35,
                },
                interculture: {
                    couvert: "Mélange légumineuses",
                    biomasse: 3.8,
                    semis: "2026-07-20",
                    destruction: "2026-10-10",
                },
                amendementOrganique1: {
                    pro: "Digestat liquide",
                    quantite: 25,
                    unite: "m3/ha",
                    inhibiteurNitrification: false,
                    enfouissementMaterielDelais: "Digestat liquide",
                },
                fertilisationAzotee1: {
                    engraisMineral: "Solution Azotée 30",
                    quantite: 130,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 100,
                },
            },
        ],
    },
    // GAEC LEFEBVRE
    {
        id: "gaec-lefebvre-t0",
        exploitationId: "gaec-lefebvre",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: false,
        iae: {
            pourcentageIAE: 4,
            tailleMoyenneParcelles: 16,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 0,
        },
        cultures: [
            {
                culture: {
                    id: "betterave-lefebvre",
                    culture: "Betterave sucrière",
                    rendement: 85,
                    semis: "2024-03-25",
                    recolte: "2024-10-25",
                    surface: 28,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33.5 % 33.5%",
                    quantite: 120,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 80,
                    potasseK: 200,
                },
            },
        ],
    },
    {
        id: "gaec-lefebvre-previsionnel",
        exploitationId: "gaec-lefebvre",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: false,
        iae: {
            pourcentageIAE: 8,
            tailleMoyenneParcelles: 14,
            certificationEnvironnementale: "HVE",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: true,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 3,
        },
        cultures: [
            {
                culture: {
                    id: "betterave-lefebvre-prev",
                    culture: "Betterave sucrière",
                    rendement: 90,
                    semis: "2027-03-30",
                    recolte: "2027-10-30",
                    surface: 25,
                },
                interculture: {
                    couvert: "Moutarde tardive",
                    biomasse: 3.5,
                    semis: "2026-11-01",
                    destruction: "2027-03-25",
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33.5 % 33.5%",
                    quantite: 100,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fumureFond: {
                    phosphateP: 75,
                    potasseK: 180,
                },
            },
        ],
    },
    // EARL PETIT
    {
        id: "earl-petit-t0",
        exploitationId: "earl-petit",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: false,
        iae: {
            pourcentageIAE: 3,
            tailleMoyenneParcelles: 11,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 2,
        },
        cultures: [
            {
                culture: {
                    id: "colza-petit",
                    culture: "Colza d'hiver",
                    rendement: 3.5,
                    semis: "2023-08-28",
                    recolte: "2024-07-12",
                    surface: 22,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Urée 46%%",
                    quantite: 190,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 85,
                    potasseK: 160,
                },
            },
            {
                culture: {
                    id: "ble-petit",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.0,
                    semis: "2023-10-12",
                    recolte: "2024-07-18",
                    surface: 33,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33.5 % 33.5%",
                    quantite: 155,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 60,
                    potasseK: 115,
                },
            },
        ],
    },
    {
        id: "earl-petit-previsionnel",
        exploitationId: "earl-petit",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: false,
        iae: {
            pourcentageIAE: 6,
            tailleMoyenneParcelles: 9,
            certificationEnvironnementale: "HVE",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: true,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 2.8,
        },
        cultures: [
            {
                culture: {
                    id: "colza-petit-prev",
                    culture: "Colza d'hiver",
                    rendement: 4.0,
                    semis: "2026-09-02",
                    recolte: "2027-07-18",
                    surface: 20,
                },
                interculture: {
                    couvert: "Trèfle incarnat",
                    biomasse: 4.2,
                    semis: "2026-07-25",
                    destruction: "2026-08-28",
                },
                fertilisationAzotee1: {
                    engraisMineral: "Urée protégée NBP",
                    quantite: 165,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fumureFond: {
                    phosphateP: 80,
                    potasseK: 150,
                },
            },
            {
                culture: {
                    id: "ble-petit-prev",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.5,
                    semis: "2026-10-18",
                    recolte: "2027-07-25",
                    surface: 30,
                },
                interculture: {
                    couvert: "Féverole",
                    biomasse: 3.6,
                    semis: "2026-07-30",
                    destruction: "2026-10-13",
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33.5 % 33.5%",
                    quantite: 125,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fumureFond: {
                    phosphateP: 55,
                    potasseK: 105,
                },
            },
        ],
    },
    // SCEA LAMBERT
    {
        id: "scea-lambert-t0",
        exploitationId: "scea-lambert",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: false,
        iae: {
            pourcentageIAE: 2,
            tailleMoyenneParcelles: 20,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 0,
        },
        cultures: [
            {
                culture: {
                    id: "orge-lambert",
                    culture: "Orge d'hiver",
                    rendement: 6.2,
                    semis: "2023-10-05",
                    recolte: "2024-07-05",
                    surface: 45,
                },
                fertilisationAzotee1: {
                    engraisMineral: "Solution Azotée 30",
                    quantite: 130,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 95,
                },
            },
        ],
    },
    {
        id: "scea-lambert-previsionnel",
        exploitationId: "scea-lambert",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: false,
        iae: {
            pourcentageIAE: 5,
            tailleMoyenneParcelles: 18,
            certificationEnvironnementale: "HVE",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: true,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 1.5,
        },
        cultures: [
            {
                culture: {
                    id: "orge-lambert-prev",
                    culture: "Orge d'hiver",
                    rendement: 6.8,
                    semis: "2026-10-10",
                    recolte: "2027-07-10",
                    surface: 40,
                },
                interculture: {
                    couvert: "Vesce",
                    biomasse: 3.1,
                    semis: "2026-07-15",
                    destruction: "2026-10-05",
                },
                fertilisationAzotee1: {
                    engraisMineral: "Solution Azotée 30",
                    quantite: 110,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fumureFond: {
                    phosphateP: 45,
                    potasseK: 85,
                },
            },
        ],
    },
    // GAEC SIMON
    {
        id: "gaec-simon-t0",
        exploitationId: "gaec-simon",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: false,
        iae: {
            pourcentageIAE: 6,
            tailleMoyenneParcelles: 8,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 0,
        },
        cultures: [
            {
                culture: {
                    id: "ble-dur-simon",
                    culture: "Blé dur",
                    rendement: 5.8,
                    semis: "2023-11-05",
                    recolte: "2024-07-25",
                    surface: 38,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Urée 46%%",
                    quantite: 170,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 65,
                    potasseK: 120,
                },
            },
        ],
    },
    {
        id: "gaec-simon-previsionnel",
        exploitationId: "gaec-simon",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: false,
        iae: {
            pourcentageIAE: 10,
            tailleMoyenneParcelles: 6,
            certificationEnvironnementale: "Bio",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: true,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 0,
        },
        cultures: [
            {
                culture: {
                    id: "ble-dur-simon-prev",
                    culture: "Blé dur",
                    rendement: 4.8,
                    semis: "2026-11-10",
                    recolte: "2027-07-30",
                    surface: 30,
                },
                interculture: {
                    couvert: "Luzerne",
                    biomasse: 5.5,
                    semis: "2026-08-01",
                    destruction: "2026-11-05",
                },
                amendementOrganique1: {
                    pro: "Compost végétal",
                    quantite: 25,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissementMaterielDelais: "Compost végétal",
                },
                fumureFond: {
                    phosphateP: 40,
                    potasseK: 80,
                },
            },
            {
                culture: {
                    id: "lentille-simon-prev",
                    culture: "Lentille",
                    rendement: 1.8,
                    semis: "2027-03-20",
                    recolte: "2027-08-15",
                    surface: 15,
                },
                interculture: {
                    couvert: "Sarrasin",
                    biomasse: 2.2,
                    semis: "2026-08-20",
                    destruction: "2027-03-15",
                },
                fumureFond: {
                    phosphateP: 30,
                    potasseK: 60,
                },
            },
        ],
    },
    // EARL GARCIA
    {
        id: "earl-garcia-t0",
        exploitationId: "earl-garcia",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: false,
        iae: {
            pourcentageIAE: 8,
            tailleMoyenneParcelles: 6,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 0,
        },
        cultures: [
            {
                culture: {
                    id: "vigne-garcia",
                    culture: "Vigne",
                    rendement: 65,
                    semis: "2024-03-15",
                    recolte: "2024-09-20",
                    surface: 25,
                },
                amendementOrganique1: {
                    pro: "Compost végétal",
                    quantite: 15,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissementMaterielDelais: "Compost végétal",
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33.5 % 33.5%",
                    quantite: 60,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 40,
                    potasseK: 180,
                },
            },
        ],
    },
    {
        id: "earl-garcia-previsionnel",
        exploitationId: "earl-garcia",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: false,
        iae: {
            pourcentageIAE: 12,
            tailleMoyenneParcelles: 5,
            certificationEnvironnementale: "Bio",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: true,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 0,
        },
        cultures: [
            {
                culture: {
                    id: "vigne-garcia-prev",
                    culture: "Vigne",
                    rendement: 58,
                    semis: "2027-03-20",
                    recolte: "2027-09-25",
                    surface: 23,
                },
                interculture: {
                    couvert: "Engrais vert permanent",
                    biomasse: 4.8,
                    semis: "2027-03-01",
                    destruction: "",
                },
                amendementOrganique1: {
                    pro: "Compost végétal",
                    quantite: 20,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissementMaterielDelais: "Compost végétal",
                },
                fumureFond: {
                    phosphateP: 35,
                    potasseK: 160,
                },
            },
        ],
    },
];

// Données complètes pour l'import
export const importData: Record<string, Scenario> = {
    "earl-dupont-t0": {
        id: "earl-dupont-t0",
        exploitationId: "earl-dupont",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: false,
        iae: {
            pourcentageIAE: 5,
            tailleMoyenneParcelles: 14,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 0,
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-1",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.5,
                    semis: "2023-10-15",
                    recolte: "2024-07-15",
                    surface: 25,
                },
                interculture: {
                    couvert: "Moutarde",
                    biomasse: 2.5,
                    semis: "2023-08-20",
                    destruction: "2023-10-10",
                },
                amendementOrganique1: {
                    pro: "Fumier de bovins",
                    quantite: 20,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissementMaterielDelais: "Fumier de bovins",
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33.5 % 33.5%",
                    quantite: 150,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fertilisationAzotee2: {
                    engraisMineral: "N - Urée 46%%",
                    quantite: 80,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 60,
                    potasseK: 120,
                },
            },
            {
                culture: {
                    id: "colza-1",
                    culture: "Colza d'hiver",
                    rendement: 3.8,
                    semis: "2024-08-25",
                    recolte: "2025-07-15",
                    surface: 15,
                },
                interculture: {
                    couvert: "Radis fourrager",
                    biomasse: 3.0,
                    semis: "2024-08-01",
                    destruction: "2024-08-20",
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33.5 % 33.5%",
                    quantite: 180,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 80,
                    potasseK: 150,
                },
            },
        ],
    },
    "earl-dupont-previsionnel": {
        id: "earl-dupont-previsionnel",
        exploitationId: "earl-dupont",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: false,
        iae: {
            pourcentageIAE: 8,
            tailleMoyenneParcelles: 12,
            certificationEnvironnementale: "HVE",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: true,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 2,
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-prev",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.8,
                    semis: "2026-10-20",
                    recolte: "2027-07-20",
                    surface: 20,
                },
                interculture: {
                    couvert: "Mélange légumineuses",
                    biomasse: 3.5,
                    semis: "2026-07-25",
                    destruction: "2026-10-15",
                },
                amendementOrganique1: {
                    pro: "Compost végétal",
                    quantite: 15,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissementMaterielDelais: "Compost végétal",
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33.5 % 33.5%",
                    quantite: 120,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fertilisationAzotee2: {
                    engraisMineral: "N - Urée 46%%",
                    quantite: 60,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 100,
                },
            },
            {
                culture: {
                    id: "colza-prev",
                    culture: "Colza d'hiver",
                    rendement: 4.2,
                    semis: "2027-08-30",
                    recolte: "2028-07-20",
                    surface: 15,
                },
                interculture: {
                    couvert: "Trèfle violet",
                    biomasse: 4.0,
                    semis: "2027-07-25",
                    destruction: "2027-08-25",
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33.5 % 33.5%",
                    quantite: 150,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fumureFond: {
                    phosphateP: 70,
                    potasseK: 130,
                },
            },
            {
                culture: {
                    id: "luzerne-prev",
                    culture: "Luzerne",
                    rendement: 12.0,
                    semis: "2027-03-15",
                    recolte: "2027-09-30",
                    surface: 5,
                },
                interculture: {
                    couvert: "Pas de couvert",
                    biomasse: 0,
                    semis: "",
                    destruction: "",
                },
                fumureFond: {
                    phosphateP: 40,
                    potasseK: 200,
                },
            },
        ],
    },
    "scea-martin-t0": {
        id: "scea-martin-t0",
        exploitationId: "scea-martin",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: false,
        iae: {
            pourcentageIAE: 2,
            tailleMoyenneParcelles: 11,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false,
        },
        chaulage: {
            nombreHectare: 0,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 0,
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-martin",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.1,
                    semis: "2023-10-12",
                    recolte: "2024-07-12",
                    surface: 18,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33,5",
                    quantite: 125,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 100,
                },
            },
            {
                culture: {
                    id: "orge-hiver-martin",
                    culture: "Orge d'hiver",
                    rendement: 6.2,
                    semis: "2023-10-05",
                    recolte: "2024-07-05",
                    surface: 12,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33,5",
                    quantite: 110,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 45,
                    potasseK: 90,
                },
            },
        ],
    },
    "scea-martin-previsionnel": {
        id: "scea-martin-previsionnel",
        exploitationId: "scea-martin",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: false,
        iae: {
            pourcentageIAE: 4,
            tailleMoyenneParcelles: 10,
            certificationEnvironnementale: "HVE",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: true,
        },
        chaulage: {
            nombreHectare: 1,
            amendementCalcique: "Carbonate de calcium",
            quantiteHectare: 1.2,
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-martin-prev",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.5,
                    semis: "2026-10-15",
                    recolte: "2027-07-15",
                    surface: 15,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N - Ammonium 33,5",
                    quantite: 120,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true,
                },
                fumureFond: {
                    phosphateP: 48,
                    potasseK: 95,
                },
            },
            {
                culture: {
                    id: "pois-proteagineux-martin-prev",
                    culture: "Pois protéagineux",
                    rendement: 3.1,
                    semis: "2027-03-20",
                    recolte: "2027-08-10",
                    surface: 10,
                },
                fertilisationAzotee1: {
                    engraisMineral: "N/A",
                    quantite: 0,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false,
                },
                fumureFond: {
                    phosphateP: 40,
                    potasseK: 80,
                },
            },
        ],
    },
};

export const resultatsScenarios: ResultatScenario[] = [
    // EARL DUPONT
    {
        scenarioId: "earl-dupont-t0",
        ddc: 245,
        carboneHumifie: 1.2,
        bilanGES: {
            stockage: -0.5,
            emissions: {
                total: 4.2,
                fertilisations: 2.8,
                mineraleDirecte: 1.5,
                mineraleAmont: 0.8,
                organiqueDirecteResidus: 0.3,
                organiqueAmont: 0.2,
                volatilisationLixiviation: 0.6,
                carburants: 0.8,
                chaulage: 0.0,
            },
            bilanNet: 3.7,
        },
        emissionsParCulture: [
            {
                culture: "Blé tendre d'hiver",
                emissions: 2.5,
                facteurEmissions: 0.33,
            },
            {
                culture: "Colza d'hiver",
                emissions: 1.7,
                facteurEmissions: 0.45,
            },
        ],
    },
    {
        scenarioId: "earl-dupont-previsionnel",
        ddc: 285,
        carboneHumifie: 1.8,
        bilanGES: {
            stockage: 0.3,
            emissions: {
                total: 3.1,
                fertilisations: 2.0,
                mineraleDirecte: 1.0,
                mineraleAmont: 0.6,
                organiqueDirecteResidus: 0.2,
                organiqueAmont: 0.2,
                volatilisationLixiviation: 0.4,
                carburants: 0.7,
                chaulage: 0.4,
            },
            bilanNet: 2.8,
        },
        emissionsParCulture: [
            {
                culture: "Blé tendre d'hiver",
                emissions: 1.8,
                facteurEmissions: 0.23,
            },
            { culture: "Luzerne", emissions: 0.3, facteurEmissions: 0.025 },
        ],
    },
    // SCEA MARTIN
    {
        scenarioId: "scea-martin-t0",
        ddc: 255,
        carboneHumifie: 1.0,
        bilanGES: {
            stockage: -0.3,
            emissions: {
                total: 4.0,
                fertilisations: 2.6,
                mineraleDirecte: 1.3,
                mineraleAmont: 0.7,
                organiqueDirecteResidus: 0.2,
                organiqueAmont: 0.2,
                volatilisationLixiviation: 0.5,
                carburants: 0.7,
                chaulage: 0.0,
            },
            bilanNet: 3.5,
        },
        emissionsParCulture: [
            { culture: "Orge d'hiver", emissions: 2.2, facteurEmissions: 0.31 },
            {
                culture: "Pois protéagineux",
                emissions: 1.8,
                facteurEmissions: 0.21,
            },
        ],
    },
    {
        scenarioId: "scea-martin-previsionnel",
        ddc: 275,
        carboneHumifie: 1.5,
        bilanGES: {
            stockage: 0.2,
            emissions: {
                total: 3.2,
                fertilisations: 1.8,
                mineraleDirecte: 0.9,
                mineraleAmont: 0.5,
                organiqueDirecteResidus: 0.2,
                organiqueAmont: 0.1,
                volatilisationLixiviation: 0.3,
                carburants: 0.6,
                chaulage: 0.2,
            },
            bilanNet: 2.6,
        },
        emissionsParCulture: [
            { culture: "Orge d'hiver", emissions: 1.4, facteurEmissions: 0.19 },
            {
                culture: "Pois protéagineux",
                emissions: 1.0,
                facteurEmissions: 0.13,
            },
        ],
    },
    // GAEC BERNARD
    {
        scenarioId: "gaec-bernard-t0",
        ddc: 240,
        carboneHumifie: 1.1,
        bilanGES: {
            stockage: -0.4,
            emissions: {
                total: 3.8,
                fertilisations: 2.4,
                mineraleDirecte: 1.2,
                mineraleAmont: 0.6,
                organiqueDirecteResidus: 0.2,
                organiqueAmont: 0.2,
                volatilisationLixiviation: 0.5,
                carburants: 0.7,
                chaulage: 0.0,
            },
            bilanNet: 3.4,
        },
        emissionsParCulture: [
            {
                culture: "Blé tendre d'hiver",
                emissions: 2.0,
                facteurEmissions: 0.28,
            },
            { culture: "Tournesol", emissions: 1.4, facteurEmissions: 0.18 },
        ],
    },
    {
        scenarioId: "gaec-bernard-previsionnel",
        ddc: 265,
        carboneHumifie: 1.6,
        bilanGES: {
            stockage: 0.4,
            emissions: {
                total: 2.9,
                fertilisations: 1.6,
                mineraleDirecte: 0.8,
                mineraleAmont: 0.4,
                organiqueDirecteResidus: 0.1,
                organiqueAmont: 0.1,
                volatilisationLixiviation: 0.2,
                carburants: 0.5,
                chaulage: 0.2,
            },
            bilanNet: 2.5,
        },
        emissionsParCulture: [
            {
                culture: "Blé tendre d'hiver",
                emissions: 1.2,
                facteurEmissions: 0.16,
            },
            { culture: "Soja", emissions: 0.8, facteurEmissions: 0.09 },
        ],
    },
    // EARL MOREAU
    {
        scenarioId: "earl-moreau-t0",
        ddc: 260,
        carboneHumifie: 1.3,
        bilanGES: {
            stockage: -0.2,
            emissions: {
                total: 3.9,
                fertilisations: 2.5,
                mineraleDirecte: 1.3,
                mineraleAmont: 0.7,
                organiqueDirecteResidus: 0.2,
                organiqueAmont: 0.2,
                volatilisationLixiviation: 0.5,
                carburants: 0.7,
                chaulage: 0.0,
            },
            bilanNet: 3.7,
        },
        emissionsParCulture: [
            { culture: "Maïs grain", emissions: 2.1, facteurEmissions: 0.29 },
            { culture: "Tournesol", emissions: 1.6, facteurEmissions: 0.21 },
        ],
    },
    {
        scenarioId: "earl-moreau-previsionnel",
        ddc: 280,
        carboneHumifie: 1.7,
        bilanGES: {
            stockage: 0.5,
            emissions: {
                total: 2.8,
                fertilisations: 1.5,
                mineraleDirecte: 0.7,
                mineraleAmont: 0.4,
                organiqueDirecteResidus: 0.1,
                organiqueAmont: 0.1,
                volatilisationLixiviation: 0.2,
                carburants: 0.5,
                chaulage: 0.2,
            },
            bilanNet: 2.3,
        },
        emissionsParCulture: [
            { culture: "Maïs grain", emissions: 1.1, facteurEmissions: 0.15 },
            { culture: "Soja", emissions: 0.7, facteurEmissions: 0.08 },
        ],
    },
    // SCEA ROUSSEAU
    {
        scenarioId: "scea-rousseau-t0",
        ddc: 250,
        carboneHumifie: 1.0,
        bilanGES: {
            stockage: -0.3,
            emissions: {
                total: 3.7,
                fertilisations: 2.3,
                mineraleDirecte: 1.1,
                mineraleAmont: 0.6,
                organiqueDirecteResidus: 0.2,
                organiqueAmont: 0.2,
                volatilisationLixiviation: 0.4,
                carburants: 0.6,
                chaulage: 0.0,
            },
            bilanNet: 3.4,
        },
        emissionsParCulture: [
            {
                culture: "Blé tendre d'hiver",
                emissions: 2.0,
                facteurEmissions: 0.27,
            },
            { culture: "Orge d'hiver", emissions: 1.3, facteurEmissions: 0.17 },
        ],
    },
    {
        scenarioId: "scea-rousseau-previsionnel",
        ddc: 270,
        carboneHumifie: 1.4,
        bilanGES: {
            stockage: 0.3,
            emissions: {
                total: 2.7,
                fertilisations: 1.4,
                mineraleDirecte: 0.7,
                mineraleAmont: 0.3,
                organiqueDirecteResidus: 0.1,
                organiqueAmont: 0.1,
                volatilisationLixiviation: 0.2,
                carburants: 0.4,
                chaulage: 0.2,
            },
            bilanNet: 2.1,
        },
        emissionsParCulture: [
            {
                culture: "Blé tendre d'hiver",
                emissions: 1.1,
                facteurEmissions: 0.15,
            },
            { culture: "Orge d'hiver", emissions: 0.7, facteurEmissions: 0.09 },
        ],
    },
    // GAEC LEFEBVRE
    {
        scenarioId: "gaec-lefebvre-t0",
        ddc: 235,
        carboneHumifie: 1.2,
        bilanGES: {
            stockage: -0.2,
            emissions: {
                total: 3.6,
                fertilisations: 2.2,
                mineraleDirecte: 1.1,
                mineraleAmont: 0.5,
                organiqueDirecteResidus: 0.2,
                organiqueAmont: 0.2,
                volatilisationLixiviation: 0.4,
                carburants: 0.6,
                chaulage: 0.0,
            },
            bilanNet: 3.4,
        },
        emissionsParCulture: [
            {
                culture: "Betterave sucrière",
                emissions: 2.1,
                facteurEmissions: 0.28,
            },
            {
                culture: "Blé tendre d'hiver",
                emissions: 1.2,
                facteurEmissions: 0.16,
            },
        ],
    },
    {
        scenarioId: "gaec-lefebvre-previsionnel",
        ddc: 255,
        carboneHumifie: 1.5,
        bilanGES: {
            stockage: 0.2,
            emissions: {
                total: 2.5,
                fertilisations: 1.2,
                mineraleDirecte: 0.6,
                mineraleAmont: 0.3,
                organiqueDirecteResidus: 0.1,
                organiqueAmont: 0.1,
                volatilisationLixiviation: 0.2,
                carburants: 0.4,
                chaulage: 0.1,
            },
            bilanNet: 1.9,
        },
        emissionsParCulture: [
            {
                culture: "Betterave sucrière",
                emissions: 1.0,
                facteurEmissions: 0.13,
            },
            {
                culture: "Blé tendre d'hiver",
                emissions: 0.7,
                facteurEmissions: 0.09,
            },
        ],
    },
    // EARL PETIT
    {
        scenarioId: "earl-petit-t0",
        ddc: 230,
        carboneHumifie: 1.1,
        bilanGES: {
            stockage: -0.1,
            emissions: {
                total: 3.5,
                fertilisations: 2.1,
                mineraleDirecte: 1.0,
                mineraleAmont: 0.5,
                organiqueDirecteResidus: 0.2,
                organiqueAmont: 0.2,
                volatilisationLixiviation: 0.3,
                carburants: 0.5,
                chaulage: 0.0,
            },
            bilanNet: 3.4,
        },
        emissionsParCulture: [
            {
                culture: "Colza d'hiver",
                emissions: 1.8,
                facteurEmissions: 0.24,
            },
            {
                culture: "Blé tendre d'hiver",
                emissions: 1.1,
                facteurEmissions: 0.15,
            },
        ],
    },
    {
        scenarioId: "earl-petit-previsionnel",
        ddc: 250,
        carboneHumifie: 1.4,
        bilanGES: {
            stockage: 0.1,
            emissions: {
                total: 2.3,
                fertilisations: 1.0,
                mineraleDirecte: 0.5,
                mineraleAmont: 0.2,
                organiqueDirecteResidus: 0.1,
                organiqueAmont: 0.1,
                volatilisationLixiviation: 0.1,
                carburants: 0.3,
                chaulage: 0.1,
            },
            bilanNet: 1.7,
        },
        emissionsParCulture: [
            {
                culture: "Colza d'hiver",
                emissions: 0.7,
                facteurEmissions: 0.09,
            },
            {
                culture: "Blé tendre d'hiver",
                emissions: 0.5,
                facteurEmissions: 0.06,
            },
        ],
    },
    // SCEA LAMBERT
    {
        scenarioId: "scea-lambert-t0",
        ddc: 240,
        carboneHumifie: 1.0,
        bilanGES: {
            stockage: -0.2,
            emissions: {
                total: 3.4,
                fertilisations: 2.0,
                mineraleDirecte: 1.0,
                mineraleAmont: 0.5,
                organiqueDirecteResidus: 0.2,
                organiqueAmont: 0.2,
                volatilisationLixiviation: 0.3,
                carburants: 0.5,
                chaulage: 0.0,
            },
            bilanNet: 3.2,
        },
        emissionsParCulture: [
            { culture: "Orge d'hiver", emissions: 1.7, facteurEmissions: 0.22 },
            { culture: "Pois d'hiver", emissions: 1.0, facteurEmissions: 0.12 },
        ],
    },
    {
        scenarioId: "scea-lambert-previsionnel",
        ddc: 260,
        carboneHumifie: 1.3,
        bilanGES: {
            stockage: 0.2,
            emissions: {
                total: 2.2,
                fertilisations: 0.9,
                mineraleDirecte: 0.4,
                mineraleAmont: 0.2,
                organiqueDirecteResidus: 0.1,
                organiqueAmont: 0.1,
                volatilisationLixiviation: 0.1,
                carburants: 0.2,
                chaulage: 0.1,
            },
            bilanNet: 1.5,
        },
        emissionsParCulture: [
            { culture: "Orge d'hiver", emissions: 0.6, facteurEmissions: 0.08 },
            { culture: "Pois d'hiver", emissions: 0.4, facteurEmissions: 0.05 },
        ],
    },
    // GAEC SIMON
    {
        scenarioId: "gaec-simon-t0",
        ddc: 225,
        carboneHumifie: 1.0,
        bilanGES: {
            stockage: -0.1,
            emissions: {
                total: 3.2,
                fertilisations: 1.8,
                mineraleDirecte: 0.9,
                mineraleAmont: 0.4,
                organiqueDirecteResidus: 0.1,
                organiqueAmont: 0.1,
                volatilisationLixiviation: 0.1,
                carburants: 0.3,
                chaulage: 0.0,
            },
            bilanNet: 3.1,
        },
        emissionsParCulture: [
            { culture: "Blé dur", emissions: 1.5, facteurEmissions: 0.2 },
            { culture: "Lentille", emissions: 0.8, facteurEmissions: 0.1 },
        ],
    },
    {
        scenarioId: "gaec-simon-previsionnel",
        ddc: 245,
        carboneHumifie: 1.2,
        bilanGES: {
            stockage: 0.1,
            emissions: {
                total: 1.8,
                fertilisations: 0.7,
                mineraleDirecte: 0.3,
                mineraleAmont: 0.1,
                organiqueDirecteResidus: 0.1,
                organiqueAmont: 0.1,
                volatilisationLixiviation: 0.1,
                carburants: 0.1,
                chaulage: 0.1,
            },
            bilanNet: 1.1,
        },
        emissionsParCulture: [
            { culture: "Blé dur", emissions: 0.5, facteurEmissions: 0.07 },
            { culture: "Lentille", emissions: 0.3, facteurEmissions: 0.04 },
        ],
    },
    // EARL GARCIA
    {
        scenarioId: "earl-garcia-t0",
        ddc: 220,
        carboneHumifie: 0.9,
        bilanGES: {
            stockage: -0.1,
            emissions: {
                total: 2.8,
                fertilisations: 1.2,
                mineraleDirecte: 0.6,
                mineraleAmont: 0.3,
                organiqueDirecteResidus: 0.1,
                organiqueAmont: 0.1,
                volatilisationLixiviation: 0.1,
                carburants: 0.2,
                chaulage: 0.0,
            },
            bilanNet: 2.7,
        },
        emissionsParCulture: [
            { culture: "Vigne", emissions: 1.2, facteurEmissions: 0.16 },
            { culture: "Blé dur", emissions: 0.7, facteurEmissions: 0.09 },
        ],
    },
    {
        scenarioId: "earl-garcia-previsionnel",
        ddc: 235,
        carboneHumifie: 1.1,
        bilanGES: {
            stockage: 0.1,
            emissions: {
                total: 1.5,
                fertilisations: 0.5,
                mineraleDirecte: 0.2,
                mineraleAmont: 0.1,
                organiqueDirecteResidus: 0.1,
                organiqueAmont: 0.1,
                volatilisationLixiviation: 0.1,
                carburants: 0.1,
                chaulage: 0.1,
            },
            bilanNet: 1.0,
        },
        emissionsParCulture: [
            { culture: "Vigne", emissions: 0.5, facteurEmissions: 0.07 },
            { culture: "Blé dur", emissions: 0.3, facteurEmissions: 0.04 },
        ],
    },
];

export default scenarios;
