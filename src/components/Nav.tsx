import { Button } from "./Button";
import logo from "../assets/logo-dark.svg";

export function Nav() {
    return (
        <nav>
            <div className="container">
                <div className="nav-wrapper">
                    <a href="#" className="logo">
                        <img src={logo} alt="" />
                    </a>
                    <Button className="button-primary">Watched List</Button>
                </div>
            </div>
        </nav>
    );
}
