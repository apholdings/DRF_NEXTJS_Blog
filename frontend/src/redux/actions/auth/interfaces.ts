export interface IRegisterProps {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  re_password: string;
}

export interface IActivationProps {
  uid: string | null;
  token: string | null;
}

export interface IResendActivationProps {
  email: string;
}

export interface IForgotPasswordProps {
  email: string;
}

export interface IForgotPasswordConfirmProps {
  new_password: string;
  re_new_password: string;
  uid: string | null;
  token: string | null;
}

export interface ILoginProps {
  email: string;
  password: string;
}
