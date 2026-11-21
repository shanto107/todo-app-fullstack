import type { NextFunction, Request, Response } from "express";

import { attempt } from "#src/utils/helper-functions/attempt.js";
import { sendSuccess } from "#src/utils/helper-functions/http-response.js";

import { SUCCESS_CODES, successMessage } from "./profile.message.js";
import type { ProfileService } from "./profile.service.js";
import type {
    AuthenticatedProfileResponse,
    GetProfileRequest,
    UpdateProfileRequest,
} from "./profile.types.js";

export function createProfileControllers(service: ProfileService) {
    async function getProfileHandler(
        _req: GetProfileRequest,
        res: AuthenticatedProfileResponse,
        next: NextFunction,
    ) {
        const userId = res.locals.auth.user.id;

        const [profile, error] = await attempt(service.getProfile(userId));

        if (error) {
            return next(error);
        }

        sendSuccess(
            res,
            200,
            SUCCESS_CODES.PROFILE_FETCHED,
            successMessage.getProfile(),
            profile,
        );
    }

    async function updateProfileSettingsHandler(
        req: UpdateProfileRequest,
        res: AuthenticatedProfileResponse,
        next: NextFunction,
    ) {
        const userId = res.locals.auth.user.id;

        const [profile, error] = await attempt(
            service.updateProfileSettings(userId, req.body),
        );

        if (error) {
            next(error);
            return;
        }
        sendSuccess(
            res,
            200,
            SUCCESS_CODES.PROFILE_UPDATED,
            successMessage.updateProfile(),
            profile,
        );
    }

    async function getDesignationsHandler(
        _req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const [designations, error] = await attempt(service.getDesignations());

        if (error) {
            next(error);
            return;
        }

        sendSuccess(
            res,
            200,
            SUCCESS_CODES.DESIGNATIONS_FETCHED,
            successMessage.getDesignations(),
            designations,
        );
    }

    return {
        getProfileHandler,
        updateProfileSettingsHandler,
        getDesignationsHandler,
    };
}

export type ProfileControllers = ReturnType<typeof createProfileControllers>;
