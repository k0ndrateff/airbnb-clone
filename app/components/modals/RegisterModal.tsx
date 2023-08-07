"use client";

import React, {useState} from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {signIn} from "next-auth/react";

const RegisterModal:React.FC = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('Что-то пошло не так.');
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    const bodyContent = (
        <div className={'flex flex-col gap-4'}>
            <Heading  title={'Добро пожаловать на AirPnP'} subtitle={'Создайте аккаунт!'} />
            <Input id={'email'} label={'Электропочта'} disabled={isLoading} register={register} errors={errors} required />
            <Input id={'name'} label={'Имя'} disabled={isLoading} register={register} errors={errors} required />
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
                        Уже есть аккаунт?
                    </div>
                    <div className={'text-neutral-800 cursor-pointer hover:underline'} onClick={registerModal.onClose}>
                        Войти
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal disabled={isLoading}
               isOpen={registerModal.isOpen}
               title={'Регистрация'}
               actionLabel={'Продолжить'}
               onClose={registerModal.onClose}
               onSubmit={handleSubmit(onSubmit)}
               body={bodyContent}
               footer={footerContent}
        />
    );
};
export default RegisterModal;