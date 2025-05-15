import { AlertIcon } from '@primer/octicons-react';
import styles from './ErrorBox.module.scss';
import { classJoin } from '@/helpers/utils';

interface ErrorBoxProps {
  message: string;
  className?: string;
}

export default function ErrorBox({ message, className }: ErrorBoxProps) {
  return (
    <div className={classJoin(styles.ErrorBox, className)} data-testid="error-box">
      <AlertIcon size={24} className={styles.errorIcon} />
      <span className={styles.message}>{message}</span>
    </div>
  );
}
