import { NameIcon, PropsIcon } from "../../interfaces"

import { AiOutlineMan, AiOutlineMenu, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser, AiOutlineWoman } from "react-icons/ai";

export const Icon = ({ name, ...props }: PropsIcon): JSX.Element => {

    const selectedIcon: { [key in NameIcon]: JSX.Element } = {
        'men': <AiOutlineMan {...props} />,
        'women': <AiOutlineWoman {...props} />,
        'kid': <AiOutlineUser {...props} />,
        'cart': <AiOutlineShoppingCart {...props} />,
        'menu': <AiOutlineMenu {...props} />,
        'search': <AiOutlineSearch {...props} />

    }


    return selectedIcon[name] ?? null
}