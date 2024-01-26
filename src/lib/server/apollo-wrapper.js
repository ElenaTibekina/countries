"use client";

import {
    ApolloLink,
    HttpLink,
} from "@apollo/client";
import {
    ApolloNextAppProvider,
    NextSSRInMemoryCache,
    NextSSRApolloClient,
    SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { onError } from '@apollo/client/link/error';


function makeClient() {
    const httpLink = new HttpLink({
        uri: "https://countries.trevorblades.com/",
    });

    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
                )
            );
        if (networkError) console.error(`[Network error]: ${networkError}`);
    });

    return new NextSSRApolloClient({
        cache: new NextSSRInMemoryCache(),
        link: ApolloLink.from([
            errorLink,
            typeof window === "undefined"
                ? new SSRMultipartLink({
                    stripDefer: true,
                })
                : httpLink,
        ]),
    });
}

export default function ApolloWrapper ({ children }) {
    return (
        <ApolloNextAppProvider makeClient={makeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}