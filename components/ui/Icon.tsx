import { NameIcon, PropsIcon } from "../../interfaces"

import { AiOutlineCloseCircle, AiOutlineCreditCard, AiOutlineDelete, AiOutlineMan, AiOutlineMenu, AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser, AiOutlineWoman } from "react-icons/ai";

export const Icon = ({ name, ...props }: PropsIcon): JSX.Element => {

    const selectedIcon: { [key in NameIcon]: JSX.Element } = {
        'men': <AiOutlineMan {...props} />,
        'women': <AiOutlineWoman {...props} />,
        'kid': <AiOutlineUser {...props} />,
        'cart': <AiOutlineShoppingCart {...props} />,
        'menu': <AiOutlineMenu {...props} />,
        'search': <AiOutlineSearch {...props} />,
        'plus': <AiOutlinePlusCircle {...props} />,
        'less': <AiOutlineMinusCircle {...props} />,
        'close': <AiOutlineCloseCircle {...props} />,
        'delete': <AiOutlineDelete {...props} />,
        'credit': <AiOutlineCreditCard {...props} />,
    }


    return selectedIcon[name] ?? null
}