export { addCorrida, cancelCorrida } from "./RequestAction";

export { fetchMotoqueiro } from "./MotoqueiroAction";

export { uiStartLoading, uiStopLoading } from "./UIAction";

export { signUp } from "./SignUpAction";

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
