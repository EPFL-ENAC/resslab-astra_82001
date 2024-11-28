# ASTRA 82001 Calculation tool

La plublication de la documentation OFROU 82001 en 2024 a permis de définir un facteur unique d'actualisation des charges de trafic à utiliser pour l'évaluation structurelle des ponts existants. Lors d'un examen plus détaillé, et dans le but d'éviter des renforcements inutiles des ponts, il est possible d'utiliser des valeurs spécifiques pour les coefficients d'actualisation.

**Cet outil propose un accès simplifié et intuitif à ces coefficients d'actualisation.
-> https://astra-82001.epfl.ch**

## Contributors

- EPFL - RESSLAB : Alain Nussbaumer, Paola Miglietta
- EPFL - ENAC-IT4R : Pierre Guilbert, Charlie Weil
- OFROU : Dimitrios Papastergiou

## Tech stack

- Front-end : [VueJS](https://vuejs.org/), [nginx](https://enginx.io/), [Quasar](url)
- Deployment : [Kubernetes](https://kubernetes.io/)

## Usage

You can use Make with the following command:

        install: Install node dependencies
        install-build: Install node dependencies with npm ci
        build: Build the project (run prebuild before)
        dev: Run the project
        convert: Convert the data to json format
        docker-build: Build docker image locally
        docker-run: Run docker image locally on port 8080

### other commands on local for development:

- npm run lint
  - run eslint on the project
- npm run format
  - run prettier on the project

### Deployment

Development environemnt : https://astra-82001-dev.epfl.ch/
Production environment: https://astra-82001.epfl.ch/

### Data update

Data updates will be handled through pull requests updating [data.csv](https://github.com/EPFL-ENAC/resslab-astra_82001/blob/main/src/assets/data/data.csv)

### Internationalization update

Internationalization will be handled through pull requests updating [internationalization.csv](https://github.com/EPFL-ENAC/resslab-astra_82001/blob/main/src/assets/data/internationalization.csv)

### Report bugs and suggestions

Comments may be shared with developers through [GitHub issues](<[https://github.com/EPFL-ENAC/resslab-astra_82001/blob/main/src/assets/data/data.csv](https://github.com/EPFL-ENAC/resslab-astra_82001/issues)>)

## Status

Under active development. [Report bugs here](https://github.com/EPFL-ENAC/resslab-astra_82001/issues).

## Data graph

```mermaid
---
title: Type to Subtype
---
graph TD
        A[Box] --> S1{Stand}
        B[Twin] --> S1{Stand}
        B[Twin] --> S2{Conc}
        C[Multi] --> S1{Stand}
        D[Slab] --> S3{Short}
        D[Slab] --> S4{Long}
        E[DalleRoulem] --> S5{PorteAFaux}
        E[DalleRoulem] --> S6{DalleEntrePoutres}

```

```mermaid
---
title: Type to Width
---

graph TD
        A[Box] --> S1{width18}
        A[Box] --> S2{width12}
        B[Twin] --> S3{wid9}
        C[Multi] --> S4{Wid108}
        D[Slab] --> S3{Wid9}
        D[Slab] --> S1{Wid18}
        E[DalleRoulem-PorteAFaux] --> S6{Wid1_22', 'Wid2_33', 'Wid3_44', 'Wid4_56', 'Wid5_67', 'Wid6_78'}
        F[DalleRoulem-DalleEntrePoutres] --> S7{ 'Wid3',    'Wid7_5', 'Wid12}
```

```mermaid
---
title: Type to Span
---

graph TD
    %% Span
    %% Box -> 20,   30,   40,   50,   60,   70, 80
    %% Twin -> 20,   30,   40,   50,   60,   70, 80
    %% Multi -> 20,   30
    %% Slab -> 4, 6, 8, 10, 15, 20, 25, 30
    %% DalleRoulem --> 1.22, 2.33, 3.44,  4.56, 5.67, 6.78, 3,  7.5,   12

    A[Box] --> S1{'20,   30,   40,   50,   60,   70, 80'}
    B[Twin] --> S1{'20,   30,   40,   50,   60,   70, 80'}
    C[Multi] --> S2{'20,   30'}
    D[Slab] --> S3{'4, 6, 8, 10, 15, 20, 25, 30'}
```

```mermaid
---
title: Type to Support
---

graph TD
    %% Type to Support
    %% Box [ 'Simp' ]
    %% Twin [ 'Simp' ]
    %% Multi [ 'Simp' ]
    %% Slab [ 'Fixed', 'Semi' ]
    %% DalleRoulem [ 'SimpForM', 'SimpForV', 'SimpForMn', 'SimpForMp' ]

    A[Box] --> S1{Simp}
    B[Twin] --> S1{Simp}
    C[Multi] --> S1{Simp}
    D[Slab] --> S4{Fixed, Semi}
    E[DalleRoulem] --> S5{SimpForM, SimpForV, SimpForMn, SimpForMp}
```

```mermaid
---
title: Type to Layout
---

graph TD
    %% Layout
    %% Box -> [ 'Uni2L', 'Bi2L', 'Bi4L' ]
    %% Twin -> [ 'Uni2L', 'Bi2L' ]
    %% Multi -> [ 'Uni2L', 'Bi2L' ]
    %% Slab -> [ 'Uni2L', 'Bi2L', 'Bi4L' ]
    %% DalleRoulem --> [ 'Uni2L', 'Bi2L' ]

    A[Box] --> S1{UNI2L, BI2L, BI4L}
    B[Twin] --> S2{'Uni2L', 'Bi2L'}
    C[Multi] --> S2{'Uni2L', 'Bi2L'}
    D[Slab] --> S1{'Uni2L', 'Bi2L', 'Bi4L'}
    E[DalleRoulem] --> S2{'Uni2L', 'Bi2L'}
```

```mermaid
---
title: Type to AE
---

graph TD
    %% AE
    %% Box [ 'V', 'Mp', 'Mn' ]
    %% Twin [ 'V', 'Mp', 'Mn' ]
    %% Multi [ 'V', 'Mp', 'Mn' ]
    %% Slab [ 'V', 'Mp', 'Mn', 'MxMid', 'MxEdg' ]
    %% DalleRoulem [ 'M', 'V', 'Mn', 'Mp' ]

    A[Box] --> S1{'V', 'Mp', 'Mn'}
    B[Twin] --> S1{'V', 'Mp', 'Mn'}
    C[Multi] --> S1{'V', 'Mp', 'Mn'}
    D[Slab] --> S2{'V', 'Mp', 'Mn', 'MxMid', 'MxEdg'}
    E[DalleRoulem] --> S3{'M', 'V', 'Mn', 'Mp'}
```

```mermaid
---
title: Type to Trans
---
graph TD

    %% Trans
    %% Box [ 'p0' ]
    %% Twin [ 'p0' ]
    %% Multi [ 'P1', 'P2', 'P3' ]
    %% Slab [ 'p1', 'p2', 'p3' ]
    %% DalleRoulem [ 'AR0', 'AR2', 'BR1', 'PENC', 'SENC', 'SMPL' ]
    A[Box] --> S1{'p0'}
    B[Twin] --> S1{'p0'}
    C[Multi] --> S3{'P1', 'P2', 'P3'}
    D[Slab] --> S4{'p1', 'p2', 'p3'}
    E[DalleRoulem-PorteAFaux] --> S6{'AR0', 'AR2', 'BR1'}
    F[DalleRoulem-DalleEntrePoutres] --> S7{'PENC', 'SENC', 'SMPL'}

    %% Trans
    %% Box [ 'p0' ]
    %% Twin [ 'p0' ]
    %% Multi [ 'P1', 'P2', 'P3' ]
    %% Slab [ 'p1', 'p2', 'p3' ]
    %% DalleRoulem [ 'AR0', 'AR2', 'BR1', 'PENC', 'SENC', 'SMPL' ]

classDef ToUpgrade stroke:#000,stroke-width:1px,fill:#ffb3b3,font-size:20px
classDef Databases stroke:#000,stroke-width:1px,fill:#dfdffc,font-size:20px
classDef App stroke:#000,stroke-width:1px,fill:#c1fbc1,font-size:30px,padding:10px
```
