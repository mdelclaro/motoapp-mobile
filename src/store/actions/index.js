export { addCorrida, cancelCorrida } from "./RequestAction";
export { uiStartLoading, uiStopLoading } from "./UIAction";
export { signUp } from "./SignUpAction";
export { addRating } from "./RatingAction";
export { updateMotoqueiros } from "./MotoqueirosAction";
export { updateInfo } from "./InfoAction";
export { getChats, sendMessage, setChats } from "./ChatAction";
export {
  tryAuth,
  authGetToken,
  authLogout,
  authAutoSignIn
} from "./AuthAction";
export {
  emailChanged,
  senhaChanged,
  nomeChanged,
  sobrenomeChanged,
  clearForm
} from "./FormAction";
