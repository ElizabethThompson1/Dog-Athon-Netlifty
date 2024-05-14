import sanityClient from "@sanity/client";

import dotenv from "dotenv";

const client = sanityClient({
    projectId: process.env.PROJECT_ID,
    dataset: process.env.DATASET,
    useCdn: false,
    token: process.env.TOKEN,
});

export default client;

