import React from 'react'
import ContainerHoc from '../container-hoc'
import SwiperGalery from '.././sections/swiper-galery';
import EventTitle from '.././sections/event-title';
import EventDateAndLocation from '.././sections/event-date-and-location';
import AboutEvent from '.././sections/about-event';
import EventCategory from '.././sections/event-category';
import { ValidationErrors } from 'final-form';
import { EventState } from '@/types/custom-types';
interface GeneralInfoTypes {
    isOpened: {
        image: boolean;
        overview: boolean;
        dateAndLocation: boolean;
        about: boolean;
        categories: boolean;
    };
    categories: CategoryType[];
    values: EventState;
    touched: { [key: string]: boolean; } | undefined;
    errors: ValidationErrors
}

export default function GeneralInfo({ isOpened, categories, values, touched, errors }: GeneralInfoTypes) {
    return (
        <>
            <ContainerHoc classes="editor_picture" field="image" touched={touched?.image} errors={errors?.image} image={values.image}  >
                <SwiperGalery image={values.image} />
            </ContainerHoc>
            <ContainerHoc isOpened={isOpened.overview} field="overview" touched={touched?.title || touched?.summary} errors={errors?.overview} >
                <EventTitle isOpened={isOpened.overview} />
            </ContainerHoc>
            <ContainerHoc isOpened={isOpened.dateAndLocation} field="dateAndLocation" touched={touched?.startDate || touched?.startTime || touched?.endDate || touched?.endTime || touched?.location || touched?.isOnline} errors={errors?.dateAndLocation}>
                <EventDateAndLocation isOpened={isOpened.dateAndLocation} errors={errors} />
            </ContainerHoc>
            <ContainerHoc isOpened={isOpened.categories} field="categories" touched={touched?.category || touched?.subcategory || touched?.format || touched?.language} errors={errors?.categories}>
                <EventCategory isOpened={isOpened.categories} categories={categories} />
            </ContainerHoc>
            <ContainerHoc isOpened={isOpened.about} classes="rich_text" field="about" touched={touched?.about} errors={errors?.about}>
                <AboutEvent isOpened={isOpened.about} />
            </ContainerHoc></>
    )
}
