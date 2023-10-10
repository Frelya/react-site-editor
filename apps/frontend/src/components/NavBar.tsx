import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Link,
    Switch,
    Spacer
} from '@nextui-org/react';
import { Icon } from '@components/Decorators';

const NavBar: React.FunctionComponent = () => {
    return (
        <Navbar isBordered className="justify-evenly">
            <NavbarContent justify="start">
                <NavbarContent justify="center">
                    <NavbarBrand as={Link} href="/">
                        <h1 className="text-foreground font-bold">RSE</h1>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Link color="foreground" href="#" underline="hover">
                            Features
                        </Link>
                    </NavbarItem>
                    <Spacer x="3" />
                    <NavbarItem isActive>
                        <Link href="#" aria-current="page">
                            Components
                        </Link>
                    </NavbarItem>
                    <Spacer x="3" />
                    <NavbarItem>
                        <Link
                            isExternal
                            showAnchorIcon
                            color="foreground"
                            underline="hover"
                            href="https://github.com/frelya/react-site-editor/">
                            Github
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button
                            as={Link}
                            color="default"
                            href="#"
                            startContent={<Icon name="heart" className="text-[#f5417f]" />}>
                            Sponsor
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Switch size="sm" color="primary" />
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button as={Link} color="primary" href="#" variant="flat">
                            Login
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="#">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </NavbarContent>
        </Navbar>
    );
};

export default NavBar;
