export const homePath = "/";
export const moviesPath = "/movies";
export const notFoundPath = "*";

export const homePageName = "Home";
export const moviesPageName = "Movies";

export const drawerWidth = 240;

const systemName = "movies-system";

export const localStorageKeys = {
  drawer: `${systemName}-drawer`,
};

export const errorPage = {
  code: 404,
  title: "Page not found",
  description:
    "Check that the URL is correct or click the button below to return",
  button: "Home page",
};

export const API_BASE_URL = "https://tools.outsera.com/backend-java/api/movies";
export const GET_MULTIPLE_WINNERS_KEY = "multiple_winners";
export const GET_STUDIOS_WITH_WINNERS_KEY = "studios_with_winners";
export const GET_WINNERS_BY_INTERVAL_KEY = "winners_by_interval";
export const GET_MOVIES_WINNERS_KEY = "movies_winners";

export const DEFAULT_LOADING_MESSAGE = "Loading data...";
export const DEFAULT_ERROR_MESSAGE =
  "An error occurred while loading the data.";
export const DEFAULT_EMPTY_MESSAGE = "There is no data to display.";

export const FIRST_PAGE = 0;
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_ROWS_PER_PAGE = [DEFAULT_PAGE_SIZE, 20, 50];
