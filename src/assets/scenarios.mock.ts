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

// Scénarios vides par défaut
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