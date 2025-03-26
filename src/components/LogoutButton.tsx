import { signOut } from '@/auth';

export function LogoutButton() {
    return (
        <button
            type="submit"
            className="border border-solid border-white p-5"
            onClick={async () => {
                'use server';
                await signOut();
            }}
        >
            Logout
        </button>
    );
}
