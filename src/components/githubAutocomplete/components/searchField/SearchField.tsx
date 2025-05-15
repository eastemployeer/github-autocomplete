import { useCallback, useRef, useState } from 'react';
import { XCircleIcon, SearchIcon } from '@primer/octicons-react';
import { useDebounceCallback } from 'usehooks-ts';
import styles from './SearchField.module.scss';

interface SearchFieldProps {
  onChange: (value: string) => void;
}

export default function SearchField({ onChange }: SearchFieldProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [controlledValue, setControlledValue] = useState<string>('');
  
  const onChangeDebounced = useDebounceCallback(useCallback((value: string) => onChange(value), [onChange]), 350);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setControlledValue(value);
    onChangeDebounced(value);
  }, []);

  const handleClear = useCallback(() => {
    setControlledValue('');
    onChangeDebounced('');
    ref.current?.focus();
  }, []);

  const handleSearchIconClick = useCallback(() => ref.current?.focus(), []);

  let clearButton = <></>;
  if(controlledValue && controlledValue.length > 0) {
    clearButton = (
      <button className={styles.clearButton} onClick={handleClear} data-testid="search-clear-button">
        <XCircleIcon size={16} />
      </button>
    );
  }

  return (
    <div className={styles.SearchField} data-testid="search-field">
      <span onClick={handleSearchIconClick} className={styles.searchIcon} data-testid="search-icon"><SearchIcon size={16} /></span>
      <input ref={ref} type="text" className={styles.searchInput} value={controlledValue} onChange={handleChange} data-testid="search-input" />
      {clearButton}
    </div>
  );
}
