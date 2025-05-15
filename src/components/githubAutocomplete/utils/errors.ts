
export const httpStatusErrorMessages: Record<number, string> = {
  400: "Invalid request to GitHub",
  401: "Additional GitHub authentication required.",
  403: "No access to the requested resource on GitHub. Try again in a few minutes.",
  404: "Requested resource not found on GitHub.",
  422: "Data is unprocessable by GitHub.",
  429: "Rate limit exceeded. Try again in a few minutes.",
  500: "Error occurred while fetching data from GitHub.",
  503: "GitHub is temporarily unavailable. Try again in a few minutes.",
};
