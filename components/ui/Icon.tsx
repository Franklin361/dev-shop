import { NameIcon, PropsIcon } from "../../interfaces"

import { AiOutlineAppstore, AiOutlineCaretDown, AiOutlineCaretUp, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineCreditCard, AiOutlineDelete, AiOutlineFile, AiOutlineFund, AiOutlineLogin, AiOutlineLogout, AiOutlineMan, AiOutlineMenu, AiOutlineMinusCircle, AiOutlinePlusCircle, AiOutlineReload, AiOutlineSearch, AiOutlineShoppingCart, AiOutlineSnippets, AiOutlineTag, AiOutlineTags, AiOutlineTeam, AiOutlineUser, AiOutlineWarning, AiOutlineWoman } from "react-icons/ai";

import { TbMoodKid } from 'react-icons/tb'

export const Icon = ({ name, ...props }: PropsIcon): JSX.Element => {

    const selectedIcon: { [key in NameIcon]: JSX.Element } = {
        'men': <AiOutlineMan {...props} />,
        'women': <AiOutlineWoman {...props} />,
        'kid': <TbMoodKid {...props} />,
        'cart': <AiOutlineShoppingCart {...props} />,
        'menu': <AiOutlineMenu {...props} />,
        'search': <AiOutlineSearch {...props} />,
        'plus': <AiOutlinePlusCircle {...props} />,
        'less': <AiOutlineMinusCircle {...props} />,
        'close': <AiOutlineCloseCircle {...props} />,
        'delete': <AiOutlineDelete {...props} />,
        'credit': <AiOutlineCreditCard {...props} />,
        'log-in': <AiOutlineLogin {...props} />,
        'log-out': <AiOutlineLogout {...props} />,
        'profile': <AiOutlineUser {...props} />,
        'order': <AiOutlineFile {...props} />,
        'orders': <AiOutlineSnippets {...props} />,
        'products': <AiOutlineTags {...props} />,
        'product': <AiOutlineTag {...props} />,
        'users': <AiOutlineTeam {...props} />,
        'check': <AiOutlineCheckCircle {...props} />,
        'reload': <AiOutlineReload {...props} />,
        'low': <AiOutlineFund {...props} />,
        'warning': <AiOutlineWarning {...props} />,
        'board': <AiOutlineAppstore {...props} />,
        'up': <AiOutlineCaretUp {...props} />,
        'down': <AiOutlineCaretDown {...props} />,

    }


    return selectedIcon[name] ?? null
}