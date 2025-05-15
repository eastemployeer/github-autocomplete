import styles from './SearchDisabledBox.module.scss';
import { classJoin } from '@/helpers/utils';

interface SearchDisabledBoxProps {
  className?: string;
}

export default function SearchDisabledBox({ className }: SearchDisabledBoxProps) {
  return (
    <div className={classJoin(styles.SearchDisabledBox, className)} data-testid="search-disabled-box">
      Minimal chars number to initialize search is 3
    </div>
  );
}
