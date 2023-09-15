import { AxiosError } from "axios";

export const getErrorMessage = (error?: unknown): string => {
  console.log({ error });
  let message = "Something went wrong, please try again";
  if (!error) return message;

  const errorMessages = ((error as AxiosError).response?.data as any)?.errors;

  message =
    Array.isArray(errorMessages) && errorMessages.length > 0
      ? errorMessages[0]
      : "Something went wrong, please try again";

  return message;
};
