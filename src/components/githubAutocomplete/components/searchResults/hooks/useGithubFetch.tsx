import { useEffect, useState } from "react";
import { GithubFetchType, GithubSearchRequest, GithubSearchResponse } from "./types/useGithubFetch";
import requestJSON from "@/helpers/requestJSON";
import useAsyncCallback from "@/hooks/useAsyncCallback";
import { httpStatusErrorMessages } from "@/components/githubAutocomplete/utils/errors";


interface GithubFetchOptions<T> {
  type: T;
  search: GithubSearchRequest;
  enabled: boolean;
}

export default function useGithubFetch<T extends GithubFetchType>(options: GithubFetchOptions<T>) {
  const [data, setData] = useState<GithubSearchResponse[T] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [wrapped, loading] = useAsyncCallback(async (options: GithubFetchOptions<T>) => {
    try {
      const response = await requestJSON<GithubSearchResponse[T], GithubSearchRequest>({
        url: `https://api.github.com/search/${options.type}`,
        search: options.search,
      });
      setData(response);
      setError(null);
    } catch(err: any) {
      if("cancelNotify" in (err as any)) (err as any).cancelNotify();
      setError(httpStatusErrorMessages[err.response?.status] || httpStatusErrorMessages[500]);
    }
  }, [options.search.q]);

  useEffect(() => {
    if(!options.enabled) return setData(null);
    wrapped(options);
  }, [options.enabled, options.search.q]);
  
  return { data, loading, error } as const;
}
