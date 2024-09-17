import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports.js";
Amplify.configure({
    ...awsExports,
    ssr: true,
    cookieStorage: {
        ...awsExports.cookieStorage,
        sameSite: 'none'
    },
});

export async function load({ page, fetch, session, context }) {
    return { props: {} };
}
