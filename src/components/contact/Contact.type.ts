export type ContactProps = {
  contact: {
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
    id: string;
    isFavorite?: boolean;
  };
  navigation: { addListener: (arg: string, argTwo: () => void) => void };
  isFromFavorites?: boolean;
};
