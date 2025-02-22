import path from 'path';
import {fileURLToPath} from 'url'
export const fod=()=>{
const __file = fileURLToPath(import.meta.url);
const __dirname = path.resolve(__file);
console.log(import.meta.url);
console.log("dir", __dirname);
console.log(path.join(__dirname, "../../"));
}