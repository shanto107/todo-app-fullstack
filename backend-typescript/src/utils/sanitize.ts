import sanitizeHtml from "sanitize-html";
import { BadRequestError } from "../middlewares/errorHandler.js";

export function sanitizeText(type: "title" | "description", text: string) {
    const maxLength = type === "title" ? 256 : 1000;

    if (type === "title") {
        const sanitizedTitle = sanitizeHtml(text, { allowedTags: [] }).trim().replace(/\s+/g, " ");
        if(sanitizedTitle.length > maxLength) {
            throw new BadRequestError("Title too long!");
        }
        if(sanitizedTitle.length < 1) {
            throw new BadRequestError("Invalid Title!")
        }
        return sanitizedTitle;
    }

    const sanitizedDescription = sanitizeHtml(text, {
        allowedTags: ["b", "i", "em", "strong", "code", "pre", "span"],
        allowedAttributes: {
            "span": ["style"]
        },
        allowedStyles: {
            "span": {
                "color": [/^#[0-9a-fA-F]{6}$/]
            }
        }
    }).trim().replace(/[ \t]+/g, " ");
    if(sanitizedDescription.length > maxLength) {
        throw new BadRequestError("Description too long!");
    }
    return sanitizedDescription;
}