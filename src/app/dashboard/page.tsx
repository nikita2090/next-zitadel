import { LogoutButton } from '@/components/LogoutButton';
import { auth } from '../../auth';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
    const session = await auth();
    const user = session?.user;

    console.log('page session', session);

    if (!session) {
        redirect('/');
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Hi {user?.role}</h2>
            <LogoutButton />
        </div>
    );
};

export default Dashboard;
