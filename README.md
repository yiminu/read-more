# read-more

An application to help me organize and archive texts that I will repeatedly be reading.

## Setup instructions

0. Install the packages

    ```sh
    npm run install
    ```

1. Rename `.env.example` to `.env`

2. Initiate `dev` database

    ```sh
    npx prisma migrate dev --name init
    ```

3. Start the development server

    ```sh
    npm run dev
    ```
