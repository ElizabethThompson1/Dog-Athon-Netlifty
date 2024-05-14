import sanityClient from "@sanity/client";


export const client = sanityClient({
  projectId: "onbfebw8",
  dataset: "production",
  useCdn: true,
  apiVersion: '2022-09-14',
  token: "sklRlD8PtM82qntztjtqHca9PI928KrC9Dd2RRFxL9eI6ni4Pg2sjDB44GnShKt2qGWEaUc42t8L5lxPEVuhdHCo4jC8h38DuQlJY5jRpRIf9SOhutRSf5Pehs02ciy9kCO5CuIJnggFMpga3GYZCxzDVoFqB8B3PXJiWMPhM1FxG3bJgtBK",
});