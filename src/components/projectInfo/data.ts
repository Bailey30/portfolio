import evmet from "../../assets/images/evmet.gif";
import pinnacle from "../../assets/images/pinnacle.gif";
import f12 from "../../assets/images/f12.gif";
import eco4u from "../../assets/images/eco4u.gif";
import callme from "../../assets/images/callme.gif";

export type Data = {
    [key: string]: {
        img: string;
        tools: string[];
        role: string;
        name: string;
        link: string;
        date: string;
    };
};

export const data: Data = {
    Evmet: {
        name: "Evmet",
        img: evmet,
        tools: ["TypeScript", "React", "Styled Components"],
        role: "Front end development",
        link: "https://www.evmetltd.com/",
        date: "OPOP Media, 2022",
    },
    F12Performance: {
        name: "F12 Performance",
        img: f12,
        tools: [
            "TypeScript",
            "React",
            "AutoTrader API",
            "Node",
            "SQL",
            "Styled Components",
        ],
        role: "Full stack development",
        link: "https://www.f12performance.co.uk/",
        date: "OPOP Media, 2022",
    },
    Callme: {
        img: callme,
        name: "Call me",
        tools: [
            "TypeScript",
            "React",
            "Redux",
            "SCSS",
            "Stripe",
            "amazon-cognito-identity-js",
        ],
        role: "Front end development",
        link: "https://call-me.vip/",
        date: "OPOP Media, 2023",
    },
    eco4u: {
        img: eco4u,
        name: "eco4u",
        tools: [
            "TypeScript",
            "React",
            "Redux",
            "Node",
            "SQL",
            "Styled Components",
        ],
        role: "Full stack development",
        link: "https://eco4-u.co.uk",
        date: "OPOP Media, 2022",
    },
    Pinnacle: {
        img: pinnacle,
        name: "Pinnacle",
        tools: ["Typescript", "React", "Redux", "Styled Components"],
        role: "Front end development",
        link: "https://pinnacle-lifestyle.com/",
        date: "OPOP Media, 2022",
    },
};
