import { Button } from "./Button";

export function Nav() {
    return (
        <nav>
            <div className="container">
                <div className="nav-wrapper">
                    <a href="#">Logo</a>
                    <Button className="button-primary">Watched List</Button>
                    <Button className="button-secondary">Watched List</Button>
                </div>
            </div>
        </nav>
    );
}
