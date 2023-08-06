"use client";

import {AiOutlineMenu} from "react-icons/ai";
import Avatar from "@/app/components/Avatar";
import React, {useCallback, useState} from "react";
import MenuItem from "@/app/components/navbar/MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {User} from "@prisma/client";
import {signOut} from "next-auth/react";

type UserMenuProps = {
    currentUser?: User | null;
}

const UserMenu:React.FC<UserMenuProps> = ({ currentUser }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className={'relative'}>
            <div className={'flex flex-row items-center gap-3'}>
                <div onClick={() => {}}
                     className={'hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100' +
                         ' transition cursor-pointer'}>
                    Ваш новый дом
                </div>
                <div onClick={toggleOpen} className={'p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex' +
                    ' flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'}>
                    <AiOutlineMenu />
                    <div className={'hidden md:block'}>
                        <Avatar />
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className={'absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0' +
                    ' top-12 text-sm'}>
                    <div className={'flex flex-col cursor-pointer'}>
                        {currentUser ? (
                            <>
                                <MenuItem onClick={() => {}} label={'Поездки'} />
                                <MenuItem onClick={() => {}} label={'Избранные места'} />
                                <MenuItem onClick={() => {}} label={'Бронирования'} />
                                <MenuItem onClick={() => {}} label={'Лоты'} />
                                <MenuItem onClick={() => {}} label={'Запинить дом'} />
                                <hr />
                                <MenuItem onClick={() => signOut()} label={'Выйти'} />
                            </>
                        ) : (
                            <>
                                <MenuItem onClick={loginModal.onOpen} label={'Войти'} />
                                <MenuItem onClick={registerModal.onOpen} label={'Зарегистрироваться'} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
export default UserMenu;