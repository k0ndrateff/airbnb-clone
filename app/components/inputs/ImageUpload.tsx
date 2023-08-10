"use client";

import React, {useCallback} from "react";
import { CldUploadWidget } from "next-cloudinary";
import Image from 'next/image';
import { TbPhoto } from 'react-icons/tb';

declare global {
    var cloudinary: any;
}

type ImageUploadProps = {
    onChange: (value: string) => void;
    value: string;
};

const ImageUpload:React.FC<ImageUploadProps> = ({ onChange, value }) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url);
    }, [onChange]);

    return (
        <CldUploadWidget onUpload={handleUpload}
                         uploadPreset={'phmstamf'}
                         options={{
                             maxFiles: 1
                         }}
        >
            {({ open }) => {
                return (
                    <div onClick={() => open?.()} className={'relative cursor-pointer hover:opacity-70 transition' +
                        ' border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center' +
                        ' gap-4 text-neutral-600'}>
                        <TbPhoto size={50} />
                        <div className={'font-semibold text-lg'}>
                            Нажмите, чтобы загрузить
                        </div>
                        {value && (
                            <div className={'absolute inset-0 w-full h-full'}>
                                <Image src={value} alt={'Загруженное изображение'} fill style={{ objectFit: 'cover' }} />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    );
};
export default ImageUpload;