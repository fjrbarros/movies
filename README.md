
# Movies

This is a ReactJS project with three main pages: Home, Movies, and Not Found. The project is published and you can access it 
[Here](https://fjr-movies.netlify.app/).


## Documentation

 - [Tools Used](#tools-used)
 - [Pages and Features](#pages-and-features)
    - [Home](#home)
    - [Movies](#movies)
    - [Not Found](#not-found)
 - [How to Run the Project](#how-to-run-the-project)
 - [Test Coverage](#test-coverage)
 - [Responsiveness](#responsiveness)

## Tools used
| Tool          | Specifically |
| ------------- | ------------- |
| @mui/material  | Components - UI  |
| @tanstack/react-query  | Monitor requests |
| react-router-dom | Route manipulation |
| @biomejs/biome | Code formatter |
| @testing-library/react and Jest | Test code |

## Pages and Features

#### Home

The Home page consists of four cards, each containing a table that renders data from an API. Each card is independent and has its own loading, error, and empty states.

![image](https://github.com/user-attachments/assets/c735c97c-1cfd-43cb-8297-236c11ae2461)


#### Movies

The Movies page contains a table that lists data from an API. This page has loading, error, and empty states, as well as pagination and filters on two columns: year and winner (yes/no).

![image](https://github.com/user-attachments/assets/7f47e63a-d7ab-4701-8e06-79b57b152963)


#### Not Found

The Not Found page displays a message indicating that the page was not found and a button that redirects to the Home page.

![image](https://github.com/user-attachments/assets/fd5f95fa-5674-493c-ab81-6104d39a4c58)



## How to Run the Project

PS: You need to have the [Nodejs](https://nodejs.org/en) library and the [Yarn](https://yarnpkg.com/) package manager installed.


Clone the repository

```bash
https://github.com/fjrbarros/movies.git
```

install dependencies
```bash
yarn install
```

execute the project
```bash
yarn dev
```

## Test Coverage
The project has 100% test coverage, ensuring the quality and reliability of the code.

![image](https://github.com/user-attachments/assets/4bbb0ebf-2a31-45b1-817a-f2c5d8953ab3)


## Responsiveness
The project is fully responsive, providing a good user experience on different devices and screen sizes.

![movies](https://github.com/user-attachments/assets/e8b62e91-78cd-4a5c-9e11-0a79a606abfe)
