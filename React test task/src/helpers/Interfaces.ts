export interface ILoginForm {
	email: string;
	password: string;
}


export interface IRegisterForm {
	person: number;
	name: string;
	surname: string;
	birthday: Date;
	email: string
	countree: number;
	password: string;
	repeatPassword:string;
	privacyPolicyAgree: boolean;
}
