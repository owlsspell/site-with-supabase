import dayjs from "dayjs";
import Swal from "sweetalert2";

export const formatEventDuration = (start: string | null | undefined, end: string | null | undefined) => {
  if (!start || !end) return "";

  const ms = dayjs(end).diff(dayjs(start));
  const days = dayjs(end).diff(dayjs(start), "day");
  if (days === 1) return "1 day";

  const minutes = Math.round(ms / 1000 / 60);
  const hours = Math.round(minutes / 60);
  if (minutes === 60) return "1 hour";
  if (hours >= 24) return `${days} days`;
  if (minutes < 60) return `${minutes} min`;
  if (minutes % 60 === 0) return `${hours} hour`;
  return `${hours} hour ${minutes % 60} min`;
};

export const isSomeFieldFull = (event: any) => {
  if (!event) return;
  return Object.values(event).some((item: any) =>
    !!item ? item.length > 0 : false
  );
};

export const isClearField = (value: string | undefined) =>
  typeof value === "undefined" || !value ? true : value.length === 0;

export const getValueFromOption = (item: any) => (item ? item.label : null);

export const getValuesArrayFromOptions = (values: any) =>
  values ? values.map((item: any) => item.label) : null;

export const getOptionFromValue = (item: any) => ({ value: item, label: item });

export const getMultiOptionsFromValue = (values: any) =>
  values ? values.map((item: string) => ({ value: item, label: item })) : null;

export const handleError = () => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong! Try again",
  });
};
