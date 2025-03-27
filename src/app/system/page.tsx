import { LogoutButton } from '@/components/LogoutButton';
import { auth } from '../../auth';

const System = async () => {
    const session = await auth();
    const user = session?.user;

    return (
        <div>
            <h1 className="mb-2">System</h1>
            <h2 className="mb-3">Hi {user?.role}</h2>
            <LogoutButton />
        </div>
    );
};

export default System;
