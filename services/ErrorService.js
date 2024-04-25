const errorService = {
    handle: (error, res) => {
        if (process.env.NODE_ENV === 'development') {
            console.error(error);
            res.status(500).json({ message: error.message });
        } else if (process.env.NODE_ENV === 'production') {
            res.status(500).json({ message: 'Une erreur est survenue' });
        }
    }
}

module.exports = errorService;