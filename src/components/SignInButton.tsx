import { signIn } from '@/auth';

export function SignInButton() {
    return (
        <button
            type="submit"
            className="border border-solid border-white p-5"
            onClick={async () => {
                'use server';
                await signIn('zitadel', { redirectTo: '/dashboard' });
            }}
        >
            Signin with ZITADEL
        </button>
    );
}
