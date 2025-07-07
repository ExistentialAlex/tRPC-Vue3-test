export const paginate = (dataset, page, limit = 25, search, sort) => {
    const start = (page - 1) * limit;
    const end = page * limit;
    if (search) {
        console.log(`Searching for: '${search}'`);
    }
    if (sort && sort.length > 0) {
        console.log(`Sorting by: ${JSON.stringify(sort)}`);
    }
    return {
        results: dataset.slice(start, end), // The results for the current page.
        count: dataset.length, // The maximum number of records
        page, // The current page
        ...(end < dataset.length && { next: page + 1 }), // Add `next` if there is a next page
        ...(start > 0 && { prev: page - 1 }), // Add `prev` if there was a previous page
    };
};
