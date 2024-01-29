import prisma from "../config/prisma.js";

/**
 * Paginate function
 *
 * @param {string} model - Model name
 * @param {string} api_name - API name eg: http://localhost:3000/api/v1/task
 * @param {number} page - Page number
 * @param {object} where - Where condition
 * @param {number} select - Select condition
 * @returns {object} - Paginated data
 *
 */
export const paginate = async (model, api_name, page, conditions = {}, take = 9) => {
    const {where = {}, select = {}, orderBy = {}} = conditions;
    const totalItems = await prisma[model].count({where});
    const skip = (page - 1) * take;
    const totalPages = Math.ceil(totalItems / take);

    const query = {
        where: {
            ...where,
        },
        orderBy: {
            createdAt: "desc",
            ...orderBy,
        },
        skip,
        take,
    };

    if (Object.keys(select).length > 0) {
        query.select = select;
    }

    const items = await prisma[model].findMany(query);
    const items_in_page = items.length;

    return {
        count: totalItems,
        total_pages: totalPages,
        next_page: page < totalPages ? `${api_name}?page=${page + 1}` : null,
        previous_page: page > 1 ? `${api_name}?page=${page - 1}` : null,
        items_in_page,
        items,
    };
};
