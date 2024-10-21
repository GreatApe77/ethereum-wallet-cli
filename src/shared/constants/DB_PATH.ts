import path from "node:path"
import { getRootDir } from "../utils/get-root-dir.js"
export const DB_PATH = path.join(getRootDir(),"database","db.sqlite")