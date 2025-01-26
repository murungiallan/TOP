import "./styles.css";
import { greeting } from "./greeting";
import odinImage from "./odin.svg";
   
const image = document.createElement("img");
image.src = odinImage;
   
document.body.appendChild(image);
console.log(greeting);