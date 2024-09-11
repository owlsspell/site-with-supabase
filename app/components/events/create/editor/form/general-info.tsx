import React, { useState } from 'react'
import ContainerHoc from '../container-hoc'
import SwiperGalery from '.././sections/swiper-galery';
import EventTitle from '.././sections/event-title';
import EventDateAndLocation from '.././sections/event-date-and-location';
import AboutEvent from '.././sections/about-event';
import EventCategory from '.././sections/event-category';
import { ValidationErrors } from 'final-form';

interface GeneralInfoTypes {
    changeVisibility: (field: string, value: boolean) => void;
    isOpened: {
        image: boolean;
        overview: boolean;
        dateAndLocation: boolean;
        about: boolean;
        categories: boolean;
    };
    categories: CategoryType[];
    touched: { [key: string]: boolean; } | undefined;
    errors: ValidationErrors
}

export default function GeneralInfo({ changeVisibility, isOpened, categories, touched, errors }: GeneralInfoTypes) {
    const [image, changeImage] = useState<null | File>(null)

    return (
        <>
            <ContainerHoc classes="editor_picture" field="image" touched={touched?.image} errors={errors?.image} image={image} isOpened={false} changeVisibility={changeVisibility}>
                <SwiperGalery image={image} changeImage={changeImage} />
            </ContainerHoc>
            <ContainerHoc field="overview" touched={touched?.title || touched?.summary} errors={errors?.overview} isOpened={isOpened.overview} changeVisibility={changeVisibility}>
                <EventTitle isOpened={isOpened.overview} />
            </ContainerHoc>
            <ContainerHoc field="dateAndLocation" touched={touched?.startDate || touched?.startTime || touched?.endDate || touched?.endTime || touched?.location || touched?.isOnline} errors={errors?.dateAndLocation} isOpened={isOpened.dateAndLocation} changeVisibility={changeVisibility}>
                <EventDateAndLocation isOpened={isOpened.dateAndLocation} />
            </ContainerHoc>
            <ContainerHoc field="categories" touched={touched?.category || touched?.subcategory || touched?.format || touched?.language} errors={errors?.categories} isOpened={isOpened.categories} changeVisibility={changeVisibility}>
                <EventCategory isOpened={isOpened.categories} categories={categories} />
            </ContainerHoc>
            <ContainerHoc classes="rich_text" field="about" touched={touched?.about} errors={errors?.about} isOpened={isOpened.about} changeVisibility={changeVisibility}>
                <AboutEvent isOpened={isOpened.about} />
            </ContainerHoc></>
    )
}
