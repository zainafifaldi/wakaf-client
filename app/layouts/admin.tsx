import { ReactNode, useState } from 'react';
import {
  ChakraProvider,
  ComponentDefaultProps,
  Portal,
	useDisclosure,
} from '@chakra-ui/react';
import Sidebar from 'components/PuritySidebar';
import MainPanel from 'components/Layout/Purity/MainPanel';
import NavbarAdmin from 'components/Navbar/NavbarAdmin';
import NavLink from 'components/NavLink';
import theme from 'theme/purity/theme'
import routes from '../../routes/admin';
import { useRouter } from "next/router";
import Footer from 'components/Footer/PurityFooter';
import PanelContent from 'components/Layout/Purity/PanelContent';
import PanelContainer from 'components/Layout/Purity/PanelContainer';

const logoText = 'PONDOK SAIF AL-ULUM';
// const logoText = 'Pondok Saif Al-Ulum';
const sidebarVariant = 'transparent';
// const sidebarVariant = 'opaque';
const fixedTopbar = false;

interface LayoutProps extends ComponentDefaultProps {
	children?: ReactNode;
}

export default function Layout({
	children,
	...rest
}: LayoutProps) {
	const router = useRouter();
	const getRoute = () => {
		return router.pathname !== '/admin/full-screen-maps';
	};
	const getActiveRoute = (routes) => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(routes[i].views);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (routes[i].category) {
				let categoryActiveRoute = getActiveRoute(routes[i].views);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				if (router.pathname === (routes[i].layout + routes[i].path)) {
					return routes[i].name;
				}
			}
		}
		return activeRoute;
	};
	// This changes navbar state(fixed or not)
	const getActiveNavbar = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbar(routes[i].views);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (router.pathname === (routes[i].layout + routes[i].path)) {
					if (routes[i].secondaryNavbar) {
						return routes[i].secondaryNavbar;
					}
				}
			}
		}
		return activeNavbar;
	};
	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === '/admin') {
				return <NavLink href={prop.layout + prop.path} component={prop.component} key={key}></NavLink>;
			} else {
				return null;
			}
		});
	};

  return (
    <ChakraProvider
      theme={theme}
      // resetCss={false}
    >
			<Sidebar
				routes={routes}
				logoText={logoText}
				sidebarVariant={sidebarVariant}
				display='none'
				{...rest}
			/>
			<MainPanel
				w={{
					base: '100%',
					xl: 'calc(100% - 275px)'
				}}>
				<Portal>
					<NavbarAdmin
						logoText={logoText}
						brandText={getActiveRoute(routes)}
						secondary={getActiveNavbar(routes)}
						fixed={fixedTopbar}
						routes={routes}
						{...rest}
					/>
				</Portal>

				{getRoute() ? (
					<PanelContent>
						<PanelContainer>

							{ children }

						</PanelContainer>
					</PanelContent>
				) : null}
				<Footer />
			</MainPanel>
		</ChakraProvider>
  );
}
