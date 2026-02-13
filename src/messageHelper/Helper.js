import { showMessage } from 'react-native-flash-message';
import colors from '../utils/colors';
import { moderateScale } from '../utils/responsiveSize';

const showError = (message) => {
     showMessage({
         type: "danger",
         icon: 'danger',
         message,
         titleStyle: {
            color: colors.white,
            fontSize : moderateScale(14)            
        },
     })
 }
 
 const showSuccess = (message) => {
     showMessage({
         type: "success",
         icon: 'success',
         message,
         titleStyle: {
            color: colors.white,
            fontSize : moderateScale(14)            
        },
     })
 }

 export {
    showError,
    showSuccess
};