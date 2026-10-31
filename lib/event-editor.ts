import dayjs from 'dayjs'
import supabase from '@/utils/supabase/client-supabase'
import { EventState } from '@/types/custom-types'
import { CreatedEventState } from '@/types/custom-types'
import {
    getMultiOptionsFromValue,
    getOptionFromValue,
    getValueFromOption,
    getValuesArrayFromOptions,
    isClearField,
} from '@/lib/functions'

export type EventEditorValues = EventState & {
    isOpened: {
        image: boolean
        overview: boolean
        dateAndLocation: boolean
        about: boolean
        categories: boolean
    }
}

export const createEventEditorInitialValues = (eventInfo: CreatedEventState) => ({
    ticketCurrency: { label: 'U.S. Dollar', value: 'U.S. Dollar' },
    isOpened: {
        image: false,
        overview: false,
        dateAndLocation: false,
        about: false,
        categories: false,
    },
    title: eventInfo.name,
    summary: eventInfo.description,
    about: eventInfo.text,
    location: eventInfo.location?.toLowerCase() === 'online' ? null : eventInfo.location,
    isOnline: !!(eventInfo.location?.toLowerCase() === 'online'),
    startDate: eventInfo.startDate,
    startTime: eventInfo.startTime,
    endDate: eventInfo.endDate,
    endTime: eventInfo.endTime,
    category: getOptionFromValue(eventInfo.category),
    subcategory: getMultiOptionsFromValue(eventInfo.subcategory),
    format: getOptionFromValue(eventInfo.format),
    language: getMultiOptionsFromValue(eventInfo.language),
})

export const validateEventEditor = (values: EventEditorValues, eventImage: CreatedEventState['image']) => {
    const errors: Record<string, boolean> = {}

    if (!values.image && !eventImage) errors.image = true
    if (isClearField(values.title) || isClearField(values.summary)) errors.overview = true
    if (
        isClearField(values.startDate) || isClearField(values.startTime) ||
        isClearField(values.endDate) || isClearField(values.endTime) ||
        !(values.isOnline || !isClearField(values.location))
    ) errors.dateAndLocation = true

    const timeStart = dayjs(`${values.startDate}${values.startTime}`).format('YYYY-MM-DD HH:mm:ss z')
    const timeEnd = dayjs(`${values.endDate}${values.endTime}`).format('YYYY-MM-DD HH:mm:ss z')
    if (dayjs(timeStart).unix() > dayjs(timeEnd).unix()) {
        errors.dateAndLocation = true
        errors.invalidTime = true
    }
    if (
        isClearField(getValueFromOption(values.category)) ||
        isClearField(getValueFromOption(values.format)) ||
        isClearField(getValuesArrayFromOptions(values.language))
    ) errors.categories = true
    if (isClearField(values.about)) errors.about = true

    return errors
}

export const saveEventEditor = async (values: EventEditorValues, eventId?: string | null) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User is not authenticated')

    const eventData = {
        name: values.title,
        description: values.summary,
        text: values.about,
        author_id: user.id,
        location: values.isOnline ? 'online' : values.location,
        timeStart: dayjs(`${values.startDate}${values.startTime}`).format('YYYY-MM-DD HH:mm:ss z'),
        timeEnd: dayjs(`${values.endDate}${values.endTime}`).format('YYYY-MM-DD HH:mm:ss z'),
        category: getValueFromOption(values.category),
        subcategory: getValuesArrayFromOptions(values.subcategory),
        format: getValueFromOption(values.format),
        language: getValuesArrayFromOptions(values.language),
    }

    const { data: savedEvents, error } = await supabase
        .from('events')
        .upsert(eventId ? { ...eventData, id: eventId } : eventData, { onConflict: 'id' })
        .select()
    if (error || !savedEvents?.length) throw error ?? new Error('Event was not saved')

    const savedEvent = savedEvents[0]
    const { data: uploadedImage, error: uploadError } = await supabase.storage
        .from('event_images')
        .upload(encodeURIComponent(`${savedEvent.id}/${savedEvent.id}`), values.image as Blob, { upsert: true })
    if (uploadError || !uploadedImage) throw uploadError ?? new Error('Event image was not uploaded')

    return {
        savedEvent,
        userId: user.id,
        uploadedImage,
        eventInfo: {
            id: savedEvent.id,
            image: values.image ? URL.createObjectURL(values.image as Blob) : (process.env.NEXT_PUBLIC_SUPABASE_STORAGE_PUBLIC_URL + uploadedImage.path),
            name: values.title,
            description: values.summary,
            text: values.about,
            author_id: user.id,
            location: values.isOnline ? 'online' : values.location,
            startDate: values.startDate,
            startTime: values.startTime,
            endDate: values.endDate,
            endTime: values.endTime,
            category: getValueFromOption(values.category),
            subcategory: getValuesArrayFromOptions(values.subcategory),
            format: getValueFromOption(values.format),
            language: getValuesArrayFromOptions(values.language),
            publish: savedEvent.publish,
        },
    }
}
