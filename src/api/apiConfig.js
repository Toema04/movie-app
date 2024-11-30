const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'c194d654ce22af0a0ad508a280d9e8f7',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;