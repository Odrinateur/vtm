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
    enfouissement: boolean;
}

export interface FertilisationAzotee {
    formeEngrais: string;
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
    amendementCalcique: number;
    quantiteHectare: number;
}

export interface Scenario {
    id: string;
    exploitationId: string;
    type: 'T0' | 'previsionnel';
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
    {
        id: "earl-dupont-t0",
        exploitationId: "earl-dupont",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: true,
        iae: {
            pourcentageIAE: 0,
            tailleMoyenneParcelles: 0,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: []
    },
    {
        id: "earl-dupont-previsionnel",
        exploitationId: "earl-dupont",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: true,
        iae: {
            pourcentageIAE: 0,
            tailleMoyenneParcelles: 0,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: []
    },
    {
        id: "scea-martin-t0",
        exploitationId: "scea-martin",
        type: "T0",
        nom: "Scénario initial T0 (Récolte 2024)",
        annee: 2024,
        isEmpty: true,
        iae: {
            pourcentageIAE: 0,
            tailleMoyenneParcelles: 0,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: []
    },
    {
        id: "scea-martin-previsionnel",
        exploitationId: "scea-martin",
        type: "previsionnel",
        nom: "Scénario A reconçu (Prévision 2027)",
        annee: 2027,
        isEmpty: true,
        iae: {
            pourcentageIAE: 0,
            tailleMoyenneParcelles: 0,
            certificationEnvironnementale: "NA",
            consommationCarburant: 0,
            typeCarburant: "Gazole non routier (litres)",
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: []
    },
    // Ajout des scénarios pour les nouvelles exploitations
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
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 1,
            quantiteHectare: 1.5
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-bernard",
                    culture: "Blé tendre d'hiver",
                    rendement: 6.8,
                    semis: "2023-10-20",
                    recolte: "2024-07-20",
                    surface: 30
                },
                amendementOrganique1: {
                    pro: "Fumier de bovins",
                    quantite: 25,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissement: true
                },
                fertilisationAzotee1: {
                    formeEngrais: "Ammonitrate 33.5%",
                    quantite: 140,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 100
                }
            }
        ]
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
            utilisationOAD: true
        },
        chaulage: {
            amendementCalcique: 2,
            quantiteHectare: 2.5
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-bernard-prev",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.2,
                    semis: "2026-10-25",
                    recolte: "2027-07-25",
                    surface: 25
                },
                interculture: {
                    couvert: "Phacélie",
                    biomasse: 2.8,
                    semis: "2026-07-30",
                    destruction: "2026-10-20"
                },
                amendementOrganique1: {
                    pro: "Compost végétal",
                    quantite: 18,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissement: true
                },
                fertilisationAzotee1: {
                    formeEngrais: "Ammonitrate 33.5%",
                    quantite: 110,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true
                },
                fumureFond: {
                    phosphateP: 45,
                    potasseK: 90
                }
            }
        ]
    },
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
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: [
            {
                culture: {
                    id: "mais-moreau",
                    culture: "Maïs grain",
                    rendement: 9.2,
                    semis: "2024-04-15",
                    recolte: "2024-10-15",
                    surface: 35
                },
                fertilisationAzotee1: {
                    formeEngrais: "Urée 46%",
                    quantite: 180,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fumureFond: {
                    phosphateP: 70,
                    potasseK: 140
                }
            },
            {
                culture: {
                    id: "tournesol-moreau",
                    culture: "Tournesol",
                    rendement: 2.8,
                    semis: "2024-04-20",
                    recolte: "2024-09-10",
                    surface: 20
                },
                fertilisationAzotee1: {
                    formeEngrais: "Ammonitrate 33.5%",
                    quantite: 80,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fumureFond: {
                    phosphateP: 60,
                    potasseK: 120
                }
            }
        ]
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
            utilisationOAD: true
        },
        chaulage: {
            amendementCalcique: 1,
            quantiteHectare: 1.2
        },
        cultures: [
            {
                culture: {
                    id: "mais-moreau-prev",
                    culture: "Maïs grain",
                    rendement: 9.8,
                    semis: "2027-04-20",
                    recolte: "2027-10-20",
                    surface: 30
                },
                interculture: {
                    couvert: "Seigle",
                    biomasse: 3.2,
                    semis: "2026-10-25",
                    destruction: "2027-04-15"
                },
                fertilisationAzotee1: {
                    formeEngrais: "Urée protégée NBP",
                    quantite: 160,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true
                },
                fumureFond: {
                    phosphateP: 65,
                    potasseK: 130
                }
            },
            {
                culture: {
                    id: "soja-moreau-prev",
                    culture: "Soja",
                    rendement: 3.2,
                    semis: "2027-05-10",
                    recolte: "2027-09-25",
                    surface: 25
                },
                interculture: {
                    couvert: "Avoine",
                    biomasse: 2.5,
                    semis: "2026-09-30",
                    destruction: "2027-05-05"
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 150
                }
            }
        ]
    },
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
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: [
            {
                culture: {
                    id: "ble-rousseau",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.1,
                    semis: "2023-10-10",
                    recolte: "2024-07-10",
                    surface: 40
                },
                amendementOrganique1: {
                    pro: "Lisier de Porc",
                    quantite: 30,
                    unite: "m3/ha",
                    inhibiteurNitrification: false,
                    enfouissement: true
                },
                fertilisationAzotee1: {
                    formeEngrais: "Solution Azotée 30",
                    quantite: 160,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fumureFond: {
                    phosphateP: 55,
                    potasseK: 110
                }
            }
        ]
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
            utilisationOAD: true
        },
        chaulage: {
            amendementCalcique: 1,
            quantiteHectare: 1.8
        },
        cultures: [
            {
                culture: {
                    id: "ble-rousseau-prev",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.6,
                    semis: "2026-10-15",
                    recolte: "2027-07-15",
                    surface: 35
                },
                interculture: {
                    couvert: "Mélange légumineuses",
                    biomasse: 3.8,
                    semis: "2026-07-20",
                    destruction: "2026-10-10"
                },
                amendementOrganique1: {
                    pro: "Digestat liquide",
                    quantite: 25,
                    unite: "m3/ha",
                    inhibiteurNitrification: false,
                    enfouissement: false
                },
                fertilisationAzotee1: {
                    formeEngrais: "Solution Azotée 30",
                    quantite: 130,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 100
                }
            }
        ]
    },
    // Scénarios pour les exploitations restantes
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
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: [
            {
                culture: {
                    id: "betterave-lefebvre",
                    culture: "Betterave sucrière",
                    rendement: 85,
                    semis: "2024-03-25",
                    recolte: "2024-10-25",
                    surface: 28
                },
                fertilisationAzotee1: {
                    formeEngrais: "Ammonitrate 33.5%",
                    quantite: 120,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fumureFond: {
                    phosphateP: 80,
                    potasseK: 200
                }
            }
        ]
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
            utilisationOAD: true
        },
        chaulage: {
            amendementCalcique: 2,
            quantiteHectare: 3
        },
        cultures: [
            {
                culture: {
                    id: "betterave-lefebvre-prev",
                    culture: "Betterave sucrière",
                    rendement: 90,
                    semis: "2027-03-30",
                    recolte: "2027-10-30",
                    surface: 25
                },
                interculture: {
                    couvert: "Moutarde tardive",
                    biomasse: 3.5,
                    semis: "2026-11-01",
                    destruction: "2027-03-25"
                },
                fertilisationAzotee1: {
                    formeEngrais: "Ammonitrate 33.5%",
                    quantite: 100,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true
                },
                fumureFond: {
                    phosphateP: 75,
                    potasseK: 180
                }
            }
        ]
    },
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
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 1,
            quantiteHectare: 2
        },
        cultures: [
            {
                culture: {
                    id: "colza-petit",
                    culture: "Colza d'hiver",
                    rendement: 3.5,
                    semis: "2023-08-28",
                    recolte: "2024-07-12",
                    surface: 22
                },
                fertilisationAzotee1: {
                    formeEngrais: "Urée 46%",
                    quantite: 190,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fumureFond: {
                    phosphateP: 85,
                    potasseK: 160
                }
            },
            {
                culture: {
                    id: "ble-petit",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.0,
                    semis: "2023-10-12",
                    recolte: "2024-07-18",
                    surface: 33
                },
                fertilisationAzotee1: {
                    formeEngrais: "Ammonitrate 33.5%",
                    quantite: 155,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fumureFond: {
                    phosphateP: 60,
                    potasseK: 115
                }
            }
        ]
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
            utilisationOAD: true
        },
        chaulage: {
            amendementCalcique: 2,
            quantiteHectare: 2.8
        },
        cultures: [
            {
                culture: {
                    id: "colza-petit-prev",
                    culture: "Colza d'hiver",
                    rendement: 4.0,
                    semis: "2026-09-02",
                    recolte: "2027-07-18",
                    surface: 20
                },
                interculture: {
                    couvert: "Trèfle incarnat",
                    biomasse: 4.2,
                    semis: "2026-07-25",
                    destruction: "2026-08-28"
                },
                fertilisationAzotee1: {
                    formeEngrais: "Urée protégée NBP",
                    quantite: 165,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true
                },
                fumureFond: {
                    phosphateP: 80,
                    potasseK: 150
                }
            },
            {
                culture: {
                    id: "ble-petit-prev",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.5,
                    semis: "2026-10-18",
                    recolte: "2027-07-25",
                    surface: 30
                },
                interculture: {
                    couvert: "Féverole",
                    biomasse: 3.6,
                    semis: "2026-07-30",
                    destruction: "2026-10-13"
                },
                fertilisationAzotee1: {
                    formeEngrais: "Ammonitrate 33.5%",
                    quantite: 125,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true
                },
                fumureFond: {
                    phosphateP: 55,
                    potasseK: 105
                }
            }
        ]
    },
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
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: [
            {
                culture: {
                    id: "orge-lambert",
                    culture: "Orge d'hiver",
                    rendement: 6.2,
                    semis: "2023-10-05",
                    recolte: "2024-07-05",
                    surface: 45
                },
                fertilisationAzotee1: {
                    formeEngrais: "Solution Azotée 30",
                    quantite: 130,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 95
                }
            }
        ]
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
            utilisationOAD: true
        },
        chaulage: {
            amendementCalcique: 1,
            quantiteHectare: 1.5
        },
        cultures: [
            {
                culture: {
                    id: "orge-lambert-prev",
                    culture: "Orge d'hiver",
                    rendement: 6.8,
                    semis: "2026-10-10",
                    recolte: "2027-07-10",
                    surface: 40
                },
                interculture: {
                    couvert: "Vesce",
                    biomasse: 3.1,
                    semis: "2026-07-15",
                    destruction: "2026-10-05"
                },
                fertilisationAzotee1: {
                    formeEngrais: "Solution Azotée 30",
                    quantite: 110,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true
                },
                fumureFond: {
                    phosphateP: 45,
                    potasseK: 85
                }
            }
        ]
    },
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
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: [
            {
                culture: {
                    id: "ble-dur-simon",
                    culture: "Blé dur",
                    rendement: 5.8,
                    semis: "2023-11-05",
                    recolte: "2024-07-25",
                    surface: 38
                },
                fertilisationAzotee1: {
                    formeEngrais: "Urée 46%",
                    quantite: 170,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fumureFond: {
                    phosphateP: 65,
                    potasseK: 120
                }
            }
        ]
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
            utilisationOAD: true
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: [
            {
                culture: {
                    id: "ble-dur-simon-prev",
                    culture: "Blé dur",
                    rendement: 4.8,
                    semis: "2026-11-10",
                    recolte: "2027-07-30",
                    surface: 30
                },
                interculture: {
                    couvert: "Luzerne",
                    biomasse: 5.5,
                    semis: "2026-08-01",
                    destruction: "2026-11-05"
                },
                amendementOrganique1: {
                    pro: "Compost végétal",
                    quantite: 25,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissement: true
                },
                fumureFond: {
                    phosphateP: 40,
                    potasseK: 80
                }
            },
            {
                culture: {
                    id: "lentille-simon-prev",
                    culture: "Lentille",
                    rendement: 1.8,
                    semis: "2027-03-20",
                    recolte: "2027-08-15",
                    surface: 15
                },
                interculture: {
                    couvert: "Sarrasin",
                    biomasse: 2.2,
                    semis: "2026-08-20",
                    destruction: "2027-03-15"
                },
                fumureFond: {
                    phosphateP: 30,
                    potasseK: 60
                }
            }
        ]
    },
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
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: [
            {
                culture: {
                    id: "vigne-garcia",
                    culture: "Vigne",
                    rendement: 65,
                    semis: "2024-03-15",
                    recolte: "2024-09-20",
                    surface: 25
                },
                amendementOrganique1: {
                    pro: "Compost végétal",
                    quantite: 15,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissement: true
                },
                fertilisationAzotee1: {
                    formeEngrais: "Ammonitrate 33.5%",
                    quantite: 60,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fumureFond: {
                    phosphateP: 40,
                    potasseK: 180
                }
            }
        ]
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
            utilisationOAD: true
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: [
            {
                culture: {
                    id: "vigne-garcia-prev",
                    culture: "Vigne",
                    rendement: 58,
                    semis: "2027-03-20",
                    recolte: "2027-09-25",
                    surface: 23
                },
                interculture: {
                    couvert: "Engrais vert permanent",
                    biomasse: 4.8,
                    semis: "2027-03-01",
                    destruction: ""
                },
                amendementOrganique1: {
                    pro: "Compost végétal",
                    quantite: 20,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissement: true
                },
                fumureFond: {
                    phosphateP: 35,
                    potasseK: 160
                }
            }
        ]
    }
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
            utilisationOAD: false
        },
        chaulage: {
            amendementCalcique: 0,
            quantiteHectare: 0
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-1",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.5,
                    semis: "2023-10-15",
                    recolte: "2024-07-15",
                    surface: 25
                },
                interculture: {
                    couvert: "Moutarde",
                    biomasse: 2.5,
                    semis: "2023-08-20",
                    destruction: "2023-10-10"
                },
                amendementOrganique1: {
                    pro: "Fumier de bovins",
                    quantite: 20,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissement: true
                },
                fertilisationAzotee1: {
                    formeEngrais: "Ammonitrate 33.5%",
                    quantite: 150,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fertilisationAzotee2: {
                    formeEngrais: "Urée 46%",
                    quantite: 80,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fumureFond: {
                    phosphateP: 60,
                    potasseK: 120
                }
            },
            {
                culture: {
                    id: "colza-1",
                    culture: "Colza d'hiver",
                    rendement: 3.8,
                    semis: "2024-08-25",
                    recolte: "2025-07-15",
                    surface: 15
                },
                interculture: {
                    couvert: "Radis fourrager",
                    biomasse: 3.0,
                    semis: "2024-08-01",
                    destruction: "2024-08-20"
                },
                fertilisationAzotee1: {
                    formeEngrais: "Ammonitrate 33.5%",
                    quantite: 180,
                    unite: "kg N/ha",
                    inhibiteurNitrification: false
                },
                fumureFond: {
                    phosphateP: 80,
                    potasseK: 150
                }
            }
        ]
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
            utilisationOAD: true
        },
        chaulage: {
            amendementCalcique: 2,
            quantiteHectare: 2
        },
        cultures: [
            {
                culture: {
                    id: "ble-tendre-prev",
                    culture: "Blé tendre d'hiver",
                    rendement: 7.8,
                    semis: "2026-10-20",
                    recolte: "2027-07-20",
                    surface: 20
                },
                interculture: {
                    couvert: "Mélange légumineuses",
                    biomasse: 3.5,
                    semis: "2026-07-25",
                    destruction: "2026-10-15"
                },
                amendementOrganique1: {
                    pro: "Compost végétal",
                    quantite: 15,
                    unite: "T/ha",
                    inhibiteurNitrification: false,
                    enfouissement: true
                },
                fertilisationAzotee1: {
                    formeEngrais: "Ammonitrate 33.5%",
                    quantite: 120,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true
                },
                fertilisationAzotee2: {
                    formeEngrais: "Urée 46%",
                    quantite: 60,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true
                },
                fumureFond: {
                    phosphateP: 50,
                    potasseK: 100
                }
            },
            {
                culture: {
                    id: "colza-prev",
                    culture: "Colza d'hiver",
                    rendement: 4.2,
                    semis: "2027-08-30",
                    recolte: "2028-07-20",
                    surface: 15
                },
                interculture: {
                    couvert: "Trèfle violet",
                    biomasse: 4.0,
                    semis: "2027-07-25",
                    destruction: "2027-08-25"
                },
                fertilisationAzotee1: {
                    formeEngrais: "Ammonitrate 33.5%",
                    quantite: 150,
                    unite: "kg N/ha",
                    inhibiteurNitrification: true
                },
                fumureFond: {
                    phosphateP: 70,
                    potasseK: 130
                }
            },
            {
                culture: {
                    id: "luzerne-prev",
                    culture: "Luzerne",
                    rendement: 12.0,
                    semis: "2027-03-15",
                    recolte: "2027-09-30",
                    surface: 5
                },
                interculture: {
                    couvert: "Pas de couvert",
                    biomasse: 0,
                    semis: "",
                    destruction: ""
                },
                fumureFond: {
                    phosphateP: 40,
                    potasseK: 200
                }
            }
        ]
    }
};

export const resultatsScenarios: ResultatScenario[] = [
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
                chaulage: 0.0
            },
            bilanNet: 3.7
        },
        emissionsParCulture: [
            { culture: "Blé tendre d'hiver", emissions: 2.5, facteurEmissions: 0.33 },
            { culture: "Colza d'hiver", emissions: 1.7, facteurEmissions: 0.45 }
        ]
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
                chaulage: 0.4
            },
            bilanNet: 2.8
        },
        emissionsParCulture: [
            { culture: "Blé tendre d'hiver", emissions: 1.8, facteurEmissions: 0.23 },
            { culture: "Colza d'hiver", emissions: 1.0, facteurEmissions: 0.24 },
            { culture: "Luzerne", emissions: 0.3, facteurEmissions: 0.025 }
        ]
    }
];

export default scenarios;