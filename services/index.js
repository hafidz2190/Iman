function indexManager()
{
    return {
        userService: requireLocal('services/userService')
    };
}

module.exports = indexManager();