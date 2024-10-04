import Swal from "sweetalert2";

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
