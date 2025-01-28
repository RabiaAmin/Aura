import profile from "../assets/images/profile.png";
import thumbnail from "../assets/images/thumbnail.png";
import cards from "../assets/images/cards.png";
import path from "../assets/images/path.png";
import logo from "../assets/images/logo.png";
import logoSmall from "../assets/images/logo-small.png";
import empty from "../assets/images/empty.png";
import { ImageSourcePropType } from "react-native";


// Define a type for the exported object
const images: Record<string, ImageSourcePropType> = {
  profile: profile as ImageSourcePropType,
  thumbnail: thumbnail as ImageSourcePropType,
  cards: cards as ImageSourcePropType,
  path: path as ImageSourcePropType,
  logo: logo as ImageSourcePropType,
  logoSmall: logoSmall as ImageSourcePropType,
  empty: empty as ImageSourcePropType,
};

export default images;
