import { ClipboardService } from "../ClipboardService.js";
import clipboard from "clipboardy";
export class ClipboardServiceClipboardy implements ClipboardService {
    async copyToClipboard(text: string): Promise<void> {
        await clipboard.write(text);
    }
}