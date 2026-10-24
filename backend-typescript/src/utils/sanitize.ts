import sanitizeHtml from "sanitize-html";
import { BadRequestError } from "../middlewares/error-handler.js";

export function sanitizeText(type: "title" | "description", text: string) {
    const maxLength = type === "title" ? 256 : 1000;

    if (type === "title") {
        const sanitizedTitle = sanitizeHtml(text, { allowedTags: [] }).trim().replace(/\s+/g, " ");
        if (sanitizedTitle.length > maxLength) {
            throw new BadRequestError("Title too long!");
        }
        if (sanitizedTitle.length < 1) {
            throw new BadRequestError("Invalid Title!")
        }
        return sanitizedTitle;
    }

    const sanitizedDescription = sanitizeHtml(text, {
        allowedTags: [
            "p", "strong", "em", "code", "pre",
            "h2", "h3", "h4",
            "ul", "ol", "li",
            "blockquote",
            "a",
            "br",
        ],
        allowedAttributes: {
            "a": ["href", "target", "rel"],
            "p": ["style", "class"],
            "h2": ["style", "class"],
            "h3": ["style", "class"],
            "h4": ["style", "class"],
            "li": ["data-type", "data-checked"],
            "ul": ["data-type"],
        },
        allowedStyles: {
            "p": { "text-align": [/^(left|center|right|justify)$/] },
            "h2": { "text-align": [/^(left|center|right|justify)$/] },
            "h3": { "text-align": [/^(left|center|right|justify)$/] },
            "h4": { "text-align": [/^(left|center|right|justify)$/] },
        },
    }).trim().replace(/[ \t]+/g, " ");
    if (sanitizedDescription.length > maxLength) {
        throw new BadRequestError("Description too long!");
    }
    return sanitizedDescription;
}