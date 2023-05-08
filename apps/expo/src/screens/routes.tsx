import type { DetailsScreenProps } from './Details'

export type RootStackParams = {
  Home: undefined;
  Details: DetailsScreenProps;
}

// declare global {
//   namespace ReactNavigation {
//     interface RootParamList extends RootStackParams { } 
//   }
// }
