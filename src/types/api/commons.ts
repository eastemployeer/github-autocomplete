export interface ErrorResponse {
    status: string;
    timestamp: string | null;
    message: string | null;
    debugMessage: string | null;
    subErrors: string | null;
    code?: number;
  }
  
  