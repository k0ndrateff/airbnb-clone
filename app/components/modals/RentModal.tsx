"use client";

import Modal from "@/app/components/modals/Modal";
import useRentModal from "@/app/hooks/useRentModal";
import {useMemo, useState} from "react";
import Heading from "@/app/components/Heading";
import {categories} from "@/app/components/navbar/Categories";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import CountrySelect from "@/app/components/inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "@/app/components/inputs/Counter";
import ImageUpload from "@/app/components/inputs/ImageUpload";
import Input from "@/app/components/inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";

enum STEPS {
    CATEGORY,
    LOCATION,
    INFO,
    IMAGES,
    DESCRIPTION,
    PRICE
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();

    const [step, setStep] = useState<STEPS>(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('@/app/components/Map'), {
        ssr: false
    }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
           shouldDirty: true,
           shouldTouch: true,
           shouldValidate: true
        });
    };

    const onBack = () => {
      setStep((value) => value - 1);
    };

    const onNext = () => {
      setStep((value) => value + 1);
    };
    
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
      if (step !== STEPS.PRICE) return onNext();

      setIsLoading(true);
      axios.post('/api/listings', data)
          .then(() => {
              toast.success('Листинг создан!');
              router.refresh();
              reset();
              setStep(STEPS.CATEGORY);
              rentModal.onClose();
          })
          .catch(() => {
             toast.error('Что-то пошло не так.');
          })
          .finally(() => {
             setIsLoading(false);
          });
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Создать';
        }

        return 'Далее';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Назад';
    }, [step]);

    let bodyContent = (
        <div className={'flex flex-col gap-8'}>
            <Heading title={'Что из этого лучше всего описывает ваше жильё?'}
                     subtitle={'Выберите категорию'}
            />
            <div className={'grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto'}>
                {categories.map((item) => (
                    <div key={item.english} className={'col-span-1'}>
                        <CategoryInput onClick={(category) => setCustomValue('category', category)}
                                       selected={category === item.english}
                                       label={item.label}
                                       english={item.english}
                                       icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
          <div className={'flex flex-col gap-8'}>
              <Heading title={'Где находится жильё?'} subtitle={'Помогите гостям найти вас!'} />
              <CountrySelect onChange={(value) => setCustomValue('location', value)} value={location} />
              <Map center={location?.latlng} />
          </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className={'flex flex-col gap-8'}>
                <Heading title={'Расскажите самое главное о вашем жилье'} subtitle={'Какие удобства у вас есть?'} />
                <Counter title={'Гости'}
                         subtitle={'Сколько гостей разрешено заселять?'}
                         value={guestCount}
                         onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter title={'Жилые комнаты'}
                         subtitle={'Сколько комнат в вашем жилье?'}
                         value={roomCount}
                         onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter title={'Ванные комнаты'}
                         subtitle={'Сколько санузлов в вашем жилье?'}
                         value={bathroomCount}
                         onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        );
    }

    if (step === STEPS.IMAGES) {
        bodyContent = (
          <div className={'flex flex-col gap-8'}>
                <Heading title={'Добавьте фотографии'} subtitle={'Покажите гостям, как выглядит ваше жильё'} />
                <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
          </div>
        );
    }

    if (step === STEPS.DESCRIPTION) {
        bodyContent = (
          <div className={'flex flex-col gap-8'}>
              <Heading title={'Как бы вы описали ваше жильё?'} subtitle={'Лаконичное описание привлечет гостей'} />
              <Input id={'title'} label={'Название'} register={register} errors={errors} disabled={isLoading} required />
              <hr />
              <Input id={'description'} label={'Описание'} register={register} errors={errors} disabled={isLoading} required />
          </div>
        );
    }

    if (step === STEPS.PRICE) {
        bodyContent = (
          <div className={'flex flex-col gap-8'}>
              <Heading title={'Теперь установите цену'} subtitle={'Сколько стоит жильё за ночь?'} />
              <Input id={'price'} label={'Цена за ночь'} register={register} errors={errors} type={'number'}
                     disabled={isLoading} formatPrice required
              />
          </div>
        );
    }

    return (
        <Modal title={'Создание листинга'}
               body={bodyContent}
               isOpen={rentModal.isOpen}
               onClose={rentModal.onClose}
               onSubmit={handleSubmit(onSubmit)}
               actionLabel={actionLabel}
               secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
               secondaryActionLabel={secondaryActionLabel}
        />
    );
};
export default RentModal;