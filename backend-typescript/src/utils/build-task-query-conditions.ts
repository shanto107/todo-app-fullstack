import {
    asc,
    desc,
    eq,
    gte,
    ilike,
    inArray,
    isNotNull,
    isNull,
    lte,
    or,
    sql,
    SQL
} from "drizzle-orm";
import { TaskQuery } from "../modules/tasks/tasks.types.js";
import { tasks } from "../db/schema/tasks.js";
import setDate from "./set-date.js";

type TaskQueryParts = {
    where: SQL[];
    orderBy: SQL;
    page: number;
    limit: number;
    offset: number;
};

export function buildTaskQuery(query: TaskQuery): TaskQueryParts {
    const where: SQL[] = [];

    // buld task query filter conditions
    if (query.search) {
        where.push(
            or(
                ilike(tasks.title, `%${query.search}%`),
                ilike(tasks.description, `%${query.search}%`),
                sql`${tasks.id}::text ILIKE ${`%${query.search}%`}`
            )!
        )
    }
    if (query.status?.length) {
        where.push(
            inArray(tasks.status, query.status)
        );
    }
    if (query.priority) {
        where.push(
            eq(tasks.priority, query.priority)
        );
    }
    if (query.deadlineFrom) {
        where.push(
            gte(tasks.deadline, setDate("from", query.deadlineFrom))
        );
    }
    if (query.deadlineTo) {
        where.push(
            lte(tasks.deadline, setDate("to", query.deadlineTo))
        );
    }
    where.push(
        query.deleted ? isNotNull(tasks.deletedAt) : isNull(tasks.deletedAt)
    )

    // build task query sorting conditions
    const sortColumns = {
        createdAt: tasks.createdAt,
        updatedAt: tasks.updatedAt,
        deletedAt: tasks.deletedAt,
        deadline: tasks.deadline,
    } as const;
    const sortcolumn = query.sortBy ? sortColumns[query.sortBy] : tasks.createdAt;
    const orderBy = query.sortDirection === "asc" ? asc(sortcolumn) : desc(sortcolumn);

    // build pagination
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const offset = (page - 1) * limit;

    return {
        where,
        orderBy,
        page,
        limit,
        offset
    };
}

