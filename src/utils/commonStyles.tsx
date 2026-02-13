import { StyleSheet } from "react-native";
import { moderateScale } from "./responsiveSize";
import colors from "./colors";

const commonStyles = StyleSheet.create({
  Font_FiveHund: {
    fontSize: moderateScale(14),
    color: colors.black,
    fontWeight: "500",
  },
  Font_FiveHund_18: {
    fontSize: moderateScale(18),
    color: colors.black,
    fontWeight: "500",
  },
  Font_SixHund:{
    fontSize: moderateScale(17),
    color: colors.black,
    fontWeight: "600",
  },
  Font_FourHund:{ 
    fontSize: moderateScale(13),
    color: colors.black,
    fontWeight: "400",
  },
});
export { commonStyles };
