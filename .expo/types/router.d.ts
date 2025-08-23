/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(onboarding)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(onboarding)'}/screen2` | `/screen2`; params?: Router.UnknownInputParams; } | { pathname: `${'/(onboarding)'}/screen3` | `/screen3`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(onboarding)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(onboarding)'}/screen2` | `/screen2`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(onboarding)'}/screen3` | `/screen3`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(onboarding)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(onboarding)'}/screen2${`?${string}` | `#${string}` | ''}` | `/screen2${`?${string}` | `#${string}` | ''}` | `${'/(onboarding)'}/screen3${`?${string}` | `#${string}` | ''}` | `/screen3${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(onboarding)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(onboarding)'}/screen2` | `/screen2`; params?: Router.UnknownInputParams; } | { pathname: `${'/(onboarding)'}/screen3` | `/screen3`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}` | `/`; params?: Router.UnknownInputParams; } | `/+not-found${`?${string}` | `#${string}` | ''}` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
    }
  }
}
