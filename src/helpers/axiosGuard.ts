import axios, { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "@/types/api/commons";

interface AxiosErrorWithResponse<T> extends AxiosError<T> {
  response: AxiosResponse<T>;
}

export function isAxiosErrorWithResponse(error: unknown): error is AxiosErrorWithResponse<ErrorResponse> {
  return axios.isAxiosError(error) && (error as AxiosError<ErrorResponse>).response?.data !== undefined;
}
