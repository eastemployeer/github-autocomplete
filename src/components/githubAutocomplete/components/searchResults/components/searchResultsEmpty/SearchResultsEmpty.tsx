import { AlertIcon } from '@primer/octicons-react';
import styles from './SearchResultsEmpty.module.scss';
import { classJoin } from '@/helpers/utils';

interface SearchResultsEmptyProps {
  className?: string;
}

export default function SearchResultsEmpty({ className }: SearchResultsEmptyProps) {
  return (
    <div className={classJoin(styles.SearchResultsEmpty, className)} data-testid="search-results-empty">
      <AlertIcon size={24} />
      <span>No results found</span>
    </div>
  );
}
