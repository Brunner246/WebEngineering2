export const sessionUserSettings = (req, res, next) => {
    const userSettings = req.session?.userSettings || {orderBy: 'title', orderDirection: -1, darkMode: false};
    const {orderBy, orderDirection, darkMode} = req.query;

    if (orderBy) {
        userSettings.orderBy = orderBy;
    }
    if (orderDirection) {
        userSettings.orderDirection = orderDirection;
    }
    if (darkMode) {
        userSettings.darkMode = { darkMode: darkMode === 'true'};
    }
    req.userSettings = req.session.userSettings = userSettings;
    next();
};
