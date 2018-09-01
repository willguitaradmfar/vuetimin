import axios from 'axios'

import faker from 'faker'

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
                        total: range.substring(range.indexOf('/') + 1, range.length),
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

const randomError = () => {
    const n = Math.round(Math.random() * 10)

    if(n > 7){
        return new Error(`Mensagem de erro nesta ação`)
    }
}

const mock = () => {
    return {
        GET_LIST(reference, args, cb) {
            console.log(
                `GET_LIST /${reference}?${JSON.stringify(args)}`
            )

            return setTimeout(() => {
                cb(randomError(), {
                    total: 2000,
                    data: Array.apply(null, {
                        length: args.rowsPerPage
                    }).map(_ => ({
                        id: Math.round(Math.random() * 200000),
                        city: faker.fake("{{address.city}}"),
                        zipCode: faker.fake("{{address.zipCode}}"),
                        country: faker.fake("{{address.country}}"),
                        state: faker.fake("{{address.state}}"),
                        streetName: faker.fake("{{address.streetName}}"),
                        streetAddress: faker.fake("{{address.streetAddress}}"),
                        latitude: faker.fake("{{address.latitude}}"),
                        longitude: faker.fake("{{address.longitude}}"),
                        color: faker.fake("{{commerce.color}}"),
                        department: faker.fake("{{commerce.department}}"),
                        productName: faker.fake("{{commerce.productName}}"),
                        price: faker.fake("{{commerce.price}}"),
                        product: faker.fake("{{commerce.product}}"),
                        image: faker.fake("{{image.image}}"),
                        avatar: faker.fake("{{image.avatar}}"),
                        animals: faker.fake("{{image.animals}}"),
                        email: faker.fake("{{internet.email}}"),
                        ip: faker.fake("{{internet.ip}}"),
                        domainName: faker.fake("{{internet.domainName}}"),
                        mac: faker.fake("{{internet.mac}}"),
                        firstName: faker.fake("{{name.firstName}}"),
                        lastName: faker.fake("{{name.lastName}}"),
                        phoneNumber: faker.fake("{{phone.phoneNumber}}")
                    }))
                })
            }, 1000 * 1)

        },
        GET_ONE(reference, args, cb) {
            console.log(
                `GET_ONE /${reference}?${JSON.stringify(args)}`
            )
            return setTimeout(() => {
                cb(randomError(), {
                    id: Math.round(Math.random() * 200000),
                    city: faker.fake("{{address.city}}"),
                    zipCode: faker.fake("{{address.zipCode}}"),
                    country: faker.fake("{{address.country}}"),
                    state: faker.fake("{{address.state}}"),
                    streetName: faker.fake("{{address.streetName}}"),
                    streetAddress: faker.fake("{{address.streetAddress}}"),
                    latitude: faker.fake("{{address.latitude}}"),
                    longitude: faker.fake("{{address.longitude}}"),
                    color: faker.fake("{{commerce.color}}"),
                    department: faker.fake("{{commerce.department}}"),
                    productName: faker.fake("{{commerce.productName}}"),
                    price: faker.fake("{{commerce.price}}"),
                    product: faker.fake("{{commerce.product}}"),
                    image: faker.fake("{{image.image}}"),
                    avatar: faker.fake("{{image.avatar}}"),
                    animals: faker.fake("{{image.animals}}"),
                    email: faker.fake("{{internet.email}}"),
                    ip: faker.fake("{{internet.ip}}"),
                    domainName: faker.fake("{{internet.domainName}}"),
                    mac: faker.fake("{{internet.mac}}"),
                    firstName: faker.fake("{{name.firstName}}"),
                    lastName: faker.fake("{{name.lastName}}"),
                    phoneNumber: faker.fake("{{phone.phoneNumber}}")
                })
            }, 1000 * 1)
        },
        CREATE(reference, args, cb) {
            console.log(
                `CREATE /${reference}?${JSON.stringify(args)}`
            )

            return setTimeout(() => {
                cb(randomError(), {
                    id: Math.round(Math.random() * 200000),
                    city: faker.fake("{{address.city}}"),
                    zipCode: faker.fake("{{address.zipCode}}"),
                    country: faker.fake("{{address.country}}"),
                    state: faker.fake("{{address.state}}"),
                    streetName: faker.fake("{{address.streetName}}"),
                    streetAddress: faker.fake("{{address.streetAddress}}"),
                    latitude: faker.fake("{{address.latitude}}"),
                    longitude: faker.fake("{{address.longitude}}"),
                    color: faker.fake("{{commerce.color}}"),
                    department: faker.fake("{{commerce.department}}"),
                    productName: faker.fake("{{commerce.productName}}"),
                    price: faker.fake("{{commerce.price}}"),
                    product: faker.fake("{{commerce.product}}"),
                    image: faker.fake("{{image.image}}"),
                    avatar: faker.fake("{{image.avatar}}"),
                    animals: faker.fake("{{image.animals}}"),
                    email: faker.fake("{{internet.email}}"),
                    ip: faker.fake("{{internet.ip}}"),
                    domainName: faker.fake("{{internet.domainName}}"),
                    mac: faker.fake("{{internet.mac}}"),
                    firstName: faker.fake("{{name.firstName}}"),
                    lastName: faker.fake("{{name.lastName}}"),
                    phoneNumber: faker.fake("{{phone.phoneNumber}}")
                })
            }, 1000 * 1)
        },
        UPDATE(reference, args, cb) {
            console.log(
                `UPDATE /${reference}?${JSON.stringify(args)}`
            )

            return setTimeout(() => {
                cb(randomError(), {
                    id: Math.round(Math.random() * 200000),
                    city: faker.fake("{{address.city}}"),
                    zipCode: faker.fake("{{address.zipCode}}"),
                    country: faker.fake("{{address.country}}"),
                    state: faker.fake("{{address.state}}"),
                    streetName: faker.fake("{{address.streetName}}"),
                    streetAddress: faker.fake("{{address.streetAddress}}"),
                    latitude: faker.fake("{{address.latitude}}"),
                    longitude: faker.fake("{{address.longitude}}"),
                    color: faker.fake("{{commerce.color}}"),
                    department: faker.fake("{{commerce.department}}"),
                    productName: faker.fake("{{commerce.productName}}"),
                    price: faker.fake("{{commerce.price}}"),
                    product: faker.fake("{{commerce.product}}"),
                    image: faker.fake("{{image.image}}"),
                    avatar: faker.fake("{{image.avatar}}"),
                    animals: faker.fake("{{image.animals}}"),
                    email: faker.fake("{{internet.email}}"),
                    ip: faker.fake("{{internet.ip}}"),
                    domainName: faker.fake("{{internet.domainName}}"),
                    mac: faker.fake("{{internet.mac}}"),
                    firstName: faker.fake("{{name.firstName}}"),
                    lastName: faker.fake("{{name.lastName}}"),
                    phoneNumber: faker.fake("{{phone.phoneNumber}}")
                })
            }, 1000 * 1)
        },
        DELETE(reference, args, cb) {
            console.log(
                `DELETE /${reference}?${JSON.stringify(args)}`
            )

            return setTimeout(() => {
                cb(randomError(), {
                    id: Math.round(Math.random() * 200000),
                    city: faker.fake("{{address.city}}"),
                    zipCode: faker.fake("{{address.zipCode}}"),
                    country: faker.fake("{{address.country}}"),
                    state: faker.fake("{{address.state}}"),
                    streetName: faker.fake("{{address.streetName}}"),
                    streetAddress: faker.fake("{{address.streetAddress}}"),
                    latitude: faker.fake("{{address.latitude}}"),
                    longitude: faker.fake("{{address.longitude}}"),
                    color: faker.fake("{{commerce.color}}"),
                    department: faker.fake("{{commerce.department}}"),
                    productName: faker.fake("{{commerce.productName}}"),
                    price: faker.fake("{{commerce.price}}"),
                    product: faker.fake("{{commerce.product}}"),
                    image: faker.fake("{{image.image}}"),
                    avatar: faker.fake("{{image.avatar}}"),
                    animals: faker.fake("{{image.animals}}"),
                    email: faker.fake("{{internet.email}}"),
                    ip: faker.fake("{{internet.ip}}"),
                    domainName: faker.fake("{{internet.domainName}}"),
                    mac: faker.fake("{{internet.mac}}"),
                    firstName: faker.fake("{{name.firstName}}"),
                    lastName: faker.fake("{{name.lastName}}"),
                    phoneNumber: faker.fake("{{phone.phoneNumber}}")
                })
            }, 1000 * 1)
        }
    }
}

export default {
    api,
    mock
}
