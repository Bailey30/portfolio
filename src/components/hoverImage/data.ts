import callme from "../../assets/images/projects/callmelogo.png";
import f12 from "../../assets/images/projects/f12logo.png";
import eco from "../../assets/images/projects/eco4ulogo.png";
import pinnacle from "../../assets/images/projects/pinnaclelogo.png";
import evmet from "../../assets/images/projects/evmetlogo.png";

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
