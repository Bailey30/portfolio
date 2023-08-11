export type ProjectT = { name: string; tools: string[]; role: string };

export type ProjectData = ProjectT[];

export const data: ProjectData = [
    {
        name: "Call me",
        tools: ["TypeScript", "React", "Redux", "SCSS", "Stripe"],
        role: "Front end",
    },
    {
        name: "F12 Performance",
        tools: ["TypeScript", "React", "AutoTrader API", "Node", "SQL"],
        role: "Full stack",
    },
    {
        name: "eco4u",
        tools: [
            "TypeScript",
            "React",
            "Redux",
            "Node",
            "SQL",
            "Styled Components",
        ],
        role: "Full stack",
    },
    {
        name: "Pinnacle",
        tools: ["Typescript", "React", "Redux", "Styled Components"],
        role: "Front end",
    },
];
