import { LogoutButton } from '@/components/LogoutButton';
import { auth, UserRole } from '../../auth';
import Link from 'next/link';

const Dashboard = async () => {
    const session = await auth();
    const user = session?.user;

    return (
        <div className="flex flex-col">
            <h1 className="mb-2">Dashboard</h1>
            <h2 className="mb-3">Hi {user?.name}</h2>
            {user?.role === UserRole.admin && (
                <Link href="/system" className="mb-3 border border-solid border-white p-5 text-center">
                    System
                </Link>
            )}
            <LogoutButton />
        </div>
    );
};

export default Dashboard;
