import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { SocketProvider } from '../context/customerSocket';
import Client from '../api/index';

const MainLayout = () => {

	const publicVapidKey = import.meta.env.VITE_PUBLIC_VAPI_KEY

	function urlBase64ToUint8Array(base64String: string) {
		const padding = '='.repeat((4 - base64String.length % 4) % 4);
		const base64 = (base64String + padding).replace(/\\-/g, '+').replace(/_/g, '/');
		const rawData = atob(base64);
		return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
	}

	if ('serviceWorker' in navigator && 'PushManager' in window) {
		navigator.serviceWorker.register('/ServiceWorker.js')
			.then(async (register: any) => {
				const sub = await register.pushManager.subscribe({
					userVisibleOnly: true,
					applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
				})

				await new Client().user.Subcription.post(sub)
			})

	}

	return (
		<SocketProvider role="customer">
			<div className=''>
				{/* Main content */}
				<div className=''>
					<Navbar />
					<main className='flex-1 overflow-auto scrollbar-hide pt-[115px] overflow-x-hidden'>
						<div className=''>
							<Outlet />
						</div>
					</main>
				</div>
			</div>
		</SocketProvider>
	);
};

export default MainLayout;
