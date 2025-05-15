import type { HTMLAttributes } from "react";
import React, { useState } from 'react';
import { useBoolean } from "usehooks-ts";
import SearchField from './components/searchField/SearchField';
import SearchResults from './components/searchResults/SearchResults';
import styles from './GithubAutocomplete.module.scss';
import { classJoin } from '@/helpers/utils';

export default function GithubAutocomplete({ className, ...rest }: Omit<HTMLAttributes<HTMLDivElement>, 'onBlur' | 'onFocus'>) {
  const [value, setValue] = useState<string>('');
  const { value: isFocused, setTrue: onFocus, setFalse: onBlur } = useBoolean(false);
  
  return (
    <div className={classJoin(styles.GithubAutocomplete, className)} onFocus={onFocus} onBlur={onBlur} {...rest} data-testid="github-autocomplete">
      <SearchField onChange={setValue} />
      <div className={classJoin(styles.searchResultsContainer, isFocused && styles.visible)}>
        <SearchResults className={styles.searchResults} value={value} />
      </div>
    </div>
  );
}
