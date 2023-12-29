import React, { useContext, useEffect, useState } from "react"


export let API_URl = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`
let AppContext = React.createContext()

let AppProvider = ({ children }) => {

    let [isloading, setIsloading] = useState(true)
    let [movie, setmovie] = useState([])
    let [isError, setIsError] = useState({ show: false, msg: '' })
    let [query, setquery] = useState('batman')
    let getMovies = async (url) => {
        setIsloading(true)
        try {
            let res = await fetch(url)
            let data = await res.json()
            console.log(data)
            if (data.Response === 'True') {
                setIsloading('false')
                setmovie(data.Search)

            }
            else {
                setIsError({
                    show: true,
                    msg: data.Error
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        let timeout = setTimeout(() => {
            getMovies(`${API_URl}&s=${query}`)
        }, 1000)

return  ()=>clearTimeout(timeout)
    }, [query])
    return <AppContext.Provider value={{ movie, isloading, isError, query, setquery }}>
        {children}
    </AppContext.Provider>
}


let useGlobalContext = () => {

    return useContext(AppContext)
}
export { AppContext, AppProvider, useGlobalContext }


