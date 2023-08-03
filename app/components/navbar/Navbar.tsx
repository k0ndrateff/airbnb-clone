"use client";

import Container from "@/app/components/Container";
import Logo from "@/app/components/navbar/Logo";
import Search from "@/app/components/navbar/Search";
import UserMenu from "@/app/components/navbar/UserMenu";

const Navbar = () => {
    return (
        <div className={'fixed w-full bg-white z-10 shadow-sm'}>
            <div className={'py-4 border-b-[1px]'}>
                <Container>
                    <div className={'flex flex-row items-center justify-between gap-3 md:gap-0'}>
                        <Logo />
                        <Search />
                        <UserMenu />
                    </div>
                </Container>
            </div>
        </div>
    );
};
export default Navbar;