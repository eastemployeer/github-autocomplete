import styles from './Loader.module.scss';
import { classJoin } from '@/helpers/utils';

interface LoaderProps {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div className={classJoin(styles.Loader, className)} data-testid="loader">
      <span className={styles.spinner} data-testid="loader-spinner" />
    </div>
  );
}
