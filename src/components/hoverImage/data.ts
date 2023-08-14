import callme from "../../assets/images/projects/callme.png";
import f12 from "../../assets/images/projects/f12.png";
import eco from "../../assets/images/projects/eco.png";
import pinnacle from "../../assets/images/projects/pinnacle.png";
import evmet from "../../assets/images/projects/evmet.png";

interface Data {
    id: number;
    img: string;
}

export const data: Data[] = [
    {
        id: 1,
        img: callme,
    },
    {
        id: 2,
        img: f12,
    },
    { id: 3, img: evmet },
    {
        id: 4,
        img: eco,
    },
    {
        id: 5,
        img: pinnacle,
    },
];
