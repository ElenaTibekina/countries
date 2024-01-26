import { gql } from "@apollo/client";

const GET_COUNTRIES_DATA_QUERY = gql`
    query {
        countries {
            name
            code
            awsRegion
            capital
            languages {
                code
                name
                native
            }
            currency
            emoji
        }
    }
`;

export default GET_COUNTRIES_DATA_QUERY;