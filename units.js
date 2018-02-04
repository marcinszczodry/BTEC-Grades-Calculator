// units
// true - achieved / false - not achieved / null - no attempt
const units = [
    {
        id: 11,
        name: "System Analysis",

        assignments: [
            [
                { criteria: "P1", status: null },
                { criteria: "P2", status: null },
                { criteria: "P3", status: null },
                { criteria: "M1", status: null }
            ],
            [
                { criteria: "P4", status: null },
            ],
            [
                { criteria: "P5", status: null },
                { criteria: "P6", status: null },
                { criteria: "M2", status: null },
                { criteria: "M3", status: null },
                { criteria: "D1", status: null },
                { criteria: "D2", status: null },
            ]
        ]
    },
    {
        id: 16,
        name: "Procedural Programming",

        assignments: [
            [
                { criteria: "P1", status: true },
                { criteria: "P2", status: true },
                { criteria: "M1", status: true },
                { criteria: "D1", status: true }
            ],
            [
                { criteria: "P3", status: true },
                { criteria: "M2", status: true }
            ],
            [
                { criteria: "P4", status: true },
                { criteria: "P5", status: true },
                { criteria: "M6", status: true },
                { criteria: "M3", status: true },
                { criteria: "M4", status: true },
                { criteria: "D2", status: true },
            ]
        ]
    },
    {
        id: 20,
        name: "Client Side Customisation of Web Pages",

        assignments: [
            [
                { criteria: "P1", status: true },
                { criteria: "P2", status: true },
                { criteria: "M1", status: true }
            ],
            [
                { criteria: "P3", status: true },
                { criteria: "M2", status: true },
                { criteria: "D1", status: false }
            ],
            [
                { criteria: "P4", status: null },
                { criteria: "P5", status: null },
                { criteria: "P6", status: null },
                { criteria: "M3", status: null },
                { criteria: "D2", status: null },
            ]
        ]
    },
    {
        id: 23,
        name: "Human Computer Interaction",

        assignments: [
            [
                { criteria: "P1", status: true },
                { criteria: "D1", status: true }
            ],
            [
                { criteria: "P2", status: true },
                { criteria: "P3", status: true },
                { criteria: "M1", status: true },
                { criteria: "M2", status: true },
            ],
            [
                { criteria: "P4", status: null },
                { criteria: "P5", status: null },
                { criteria: "P6", status: null },
                { criteria: "M3", status: null },
                { criteria: "D2", status: null },
            ]
        ]
    },
    {
        id: 35,
        name: "Digital Graphics for Interactive Media",

        assignments: [
            [
                { criteria: "P1", status: true },
                { criteria: "M1", status: true },
                { criteria: "D1", status: true }
            ],
            [
                { criteria: "P2", status: true },
                { criteria: "M2", status: true },
                { criteria: "D2", status: true }
            ],
            [
                { criteria: "P3", status: null },
                { criteria: "M3", status: null },
                { criteria: "D3", status: null }
            ]
        ]
    }

];