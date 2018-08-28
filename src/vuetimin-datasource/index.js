import axios from 'axios'


const api = () => {
    const endpoint = "http://dev-octopus.devmania.com.br/api"
    return {
        GET_LIST(reference, args, cb) {
           
            axios
                .get(`${endpoint}/${reference}?filter=${JSON.stringify(args.filters)}&range=[${args.offset},${(args.offset) + args.rowsPerPage}]&sort=["${args.sortBy || 'id'}","${args.descending ? 'DESC' : 'ASC'}"]`, {
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTM1NDIyODYxLCJleHAiOjE1MzU0MjQ2NjF9.aRShjjtvHG-dO-5LuRFyOmmNllpaUj8QaiwO8Ll69pE'
                      }
                })
                .then(res => {
                    
                    const range = res.headers['content-range']
                    
                    return cb({
                        total: range.substring(range.indexOf('/')+1, range.length),
                        data: res.data
                    })
                })
        },
        GET_ONE(reference, args) {
            console.log(`GET_ONE ${endpoint}/${reference}`)
        },
        CREATE(reference, args) {
            console.log(`CREATE ${endpoint}/${reference}`)
        },
        UPDATE(reference, args) {
            console.log(`UPDATE ${endpoint}/${reference}`)
        },
        DELETE(reference, args) {
            console.log(`DELETE ${endpoint}/${reference}`)
        }
    }
}

const mock = () => {
    const endpoint = "http://localhost:3000/api"
    return {
        GET_LIST(reference, args, cb) {
            console.log(
                `GET_LIST ${endpoint}/${reference}?${JSON.stringify(args)}`
            )
            console.log(args)

            return setTimeout(() => {
                cb({
                    total: 2000,
                    data: Array.apply(null, {
                        length: args.rowsPerPage
                    }).map(_ => ({
                        id: Math.round(Math.random() * 200000),
                        value: false,
                        name: "Frozen Yogurt",
                        calories: Math.round(Math.random() * 200),
                        nnn: "teste",
                        fat: Math.round(Math.random() * 10),
                        carbs: Math.round(Math.random() * 50),
                        protein: Math.round(Math.random() * 5),
                        iron: "1%",
                        exists: false
                    }))
                })
            }, 1000 * 1)
        },
        GET_ONE(reference, args) {
            console.log(`GET_ONE ${endpoint}/${reference}`)
        },
        CREATE(reference, args) {
            console.log(`CREATE ${endpoint}/${reference}`)
        },
        UPDATE(reference, args) {
            console.log(`UPDATE ${endpoint}/${reference}`)
        },
        DELETE(reference, args) {
            console.log(`DELETE ${endpoint}/${reference}`)
        }
    }
}

export default {
    api,
    mock
}
