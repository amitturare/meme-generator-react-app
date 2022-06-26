// Images
import logo from "../images/lul-face.png";

export default function Header() {
    return (
        <header>
            <img src={logo} alt="logo" />
            <h2>Meme Generator</h2>
        </header>
    );
}
