import axios, { Canceler, AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from "react-toastify";
import { ErrorResponse } from "../types/api/commons";
import { qsStringify } from './utils';

const CancelToken = axios.CancelToken;

interface RequestOptions<Req> extends Omit<AxiosRequestConfig<Req>, "cancelToken" | "env"> {
  search?: string | Req;
  cancelCb?: (cancel: Canceler) => void;
  multiPart?: boolean;
}

interface RequestJsonError<T> extends AxiosError<T> {
  cancelNotify: () => void;
}

export default async function requestJSON<Res = void, Req = never>({ url = "", search, cancelCb, data, headers, ...rest }: RequestOptions<Req> = {}): Promise<Res> {
  if(search && typeof search !== "string") search = qsStringify(search);
  if(search) url += search;
  
  try {
    const response = await axios({
      ...rest,
      data,
      headers,
      url,
      cancelToken: cancelCb ? new CancelToken(cancelCb) : undefined,
    });
    
    return response.data;
  } catch(err: any) {
    console.error(err);
    
    const error: RequestJsonError<ErrorResponse> = err;
    error.cancelNotify = () => {};
    
    if(error.response) {
      const jsonError = error?.response?.data;
      if(jsonError) {
        console.error(jsonError);

        let content: string | null = null;
        if(error.response.status === 500) {
          content = "Something went wrong on the server.";
        } else {
          content = error.response.data.message || "Something went wrong on the server.";
        }
        
        const toastTimeout = setTimeout(() => {
          const toastId = toast.error(content);
          error.cancelNotify = () => toast.dismiss(toastId);
        }, 0);
        
        error.cancelNotify = () => clearTimeout(toastTimeout);
      }
    }
    
    throw error;
  }
}
