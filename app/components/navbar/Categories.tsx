"use client";

import Container from "@/app/components/Container";
import {TbBeach, TbMountain, TbPool} from "react-icons/tb";
import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland,
    GiWindmill
} from "react-icons/gi";
import {MdOutlineVilla} from "react-icons/md";
import CategoryBox from "@/app/components/CategoryBox";
import {usePathname, useSearchParams} from "next/navigation";
import {FaSkiing} from "react-icons/fa";
import {BsSnow} from "react-icons/bs";
import {IoDiamond} from "react-icons/io5";

export const categories = [
    { label: 'Пляжи', icon: TbBeach, description: 'Дома вблизи пляжей', english: 'beach' },
    { label: 'Мельницы', icon: GiWindmill, description: 'Неподалёку есть ветряные мельницы', english: 'windmill' },
    { label: 'Модерн', icon: MdOutlineVilla, description: 'Дома в современном стиле', english: 'modern' },
    { label: 'За городом', icon: TbMountain, description: 'Чтобы выбраться из городской суеты', english: 'countryside' },
    { label: 'Бассейны', icon: TbPool, description: 'Дома с бассейнами', english: 'pools' },
    { label: 'Острова', icon: GiIsland, description: 'Дома на острове', english: 'islands' },
    { label: 'Озёра', icon: GiBoatFishing, description: 'Дома недалеко от водоёмов', english: 'lake' },
    { label: 'Лыжные курорты', icon: FaSkiing, description: 'Здесь катаются на лыжах', english: 'skiing' },
    { label: 'Замки', icon: GiCastle, description: 'Средневековые и современные замки', english: 'castles' },
    { label: 'Кемпинг', icon: GiForestCamp, description: 'Отдых на природе', english: 'camping' },
    { label: 'Арктика', icon: BsSnow, description: 'Холодные регионы', english: 'arctic' },
    { label: 'Пещеры', icon: GiCaveEntrance, description: 'Дома в пещере', english: 'cave' },
    { label: 'Пустыни', icon: GiCactus, description: 'Дома в пустыне', english: 'desert' },
    { label: 'Фермы', icon: GiBarn, description: 'Дома на ферме', english: 'barn' },
    { label: 'Люкс', icon: IoDiamond, description: 'Премиальные дома', english: 'lux' },
];

const Categories = () => {
    const params = useSearchParams();
    const pathname = usePathname();

    const category = params?.get('category');
    const isMainPage = pathname === '/';

    if (!isMainPage) return null;

    return (
        <Container>
            <div className={'pt-4 flex flex-row items-center justify-between overflow-x-auto'}>
                {categories.map((item) => (
                    <CategoryBox key={item.label}
                                 label={item.label}
                                 selected={category === item.english}
                                 icon={item.icon}
                                 englishLabel={item.english}
                    />
                ))}
            </div>
        </Container>
    );
};
export default Categories;