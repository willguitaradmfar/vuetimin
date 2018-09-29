import axios from 'axios'

const get = () => {
    return axios
        .get(`http://localhost:9080/config.json`)
}

export default {
    get
}