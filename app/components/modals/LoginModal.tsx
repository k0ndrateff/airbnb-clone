"use client";

import React, {useCallback, useState} from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {useRouter} from "next/navigation";

const LoginModal:React.FC = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn('credentials', {...data, redirect: false})
            .then((callback) => {
                setIsLoading(false);

                if (callback?.ok) {
                    toast.success('Вы успешно вошли!');
                    router.refresh();
                    loginModal.onClose();
                }

                if (callback?.error) {
                    toast.error(callback.error);
                }
            });
    };

    const toggleModal = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className={'flex flex-col gap-4'}>
            <Heading  title={'Добро пожаловать домой'} subtitle={'Войдите в свой аккаунт!'} />
            <Input id={'email'} label={'Электропочта'} disabled={isLoading} register={register} errors={errors} required />
            <Input id={'password'} type={'password'} label={'Пароль'} disabled={isLoading} register={register} errors={errors} required />
        </div>
    );

    const footerContent = (
        <div className={'flex flex-col gap-4 mt-3'}>
            <hr />
            <Button outline label={'Войти через Гугл'} icon={FcGoogle} onClick={() => signIn('google')} />
            <Button outline label={'Войти через Гитхаб'} icon={AiFillGithub} onClick={() => signIn('github')} />
            <div className={'text-neutral-500 text-center mt-4 font-light'}>
                <div className={'justify-center flex flex-row items-center gap-2'}>
                    <div>
                        Первый раз на AirPnP?
                    </div>
                    <div className={'text-neutral-800 cursor-pointer hover:underline'} onClick={toggleModal}>
                        Создайте аккаунт
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal disabled={isLoading}
               isOpen={loginModal.isOpen}
               title={'Вход'}
               actionLabel={'Продолжить'}
               onClose={loginModal.onClose}
               onSubmit={handleSubmit(onSubmit)}
               body={bodyContent}
               footer={footerContent}
        />
    );
};
export default LoginModal;