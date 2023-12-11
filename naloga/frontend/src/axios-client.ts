import axios from "axios";

// Ustvari instanco axios klienta z osnovnim URL-jem za API pot.
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Interceptor za zahteve: Dodajanje avtorizacijskega žetona v glavo zahteve.
axiosClient.interceptors.request.use((config) => {
    // Pridobi shranjeni žeton iz lokalnega pomnilnika (localStorage).
    const token = localStorage.getItem('ACCESS_TOKEN')
    // Dodajte avtorizacijski žeton v glavo zahteve.
    config.headers.Authorization = `Bearer ${token}`

    return config;
})

// Interceptor za odgovore: Preverjanje odgovora in morebitno odstranjevanje žetona.
axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    try {

        const { response } = error;

        if (response.status === 401) {
            // Če je odgovor s statusom 401, odstrani žeton iz lokalnega pomnilnika.
            localStorage.removeItem('ACCESS_TOKEN')
        }
    } catch (error) {
        console.log(error)
    }


    throw error
})

// Izvoz axios klienta za uporabo v drugih delih vaše aplikacije.
export default axiosClient
