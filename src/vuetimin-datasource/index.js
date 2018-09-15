import axios from 'axios'

import faker from 'faker'

const randomError = () => {
    const n = Math.round(Math.random() * 10)

    if (n > 9.5) {
        return new Error(`Mensagem de erro nesta ação`)
    }
}

const getDataFaker = () => {
    const fakers = {}

    const fn = (faker, fk, _fk, __fk) => {

        if (fk && _fk && __fk && faker[fk][_fk][__fk] && typeof faker[fk][_fk][__fk] === 'function') {
            fakers[`${fk}_${_fk}_${__fk}`] = faker[fk][_fk][__fk]()
            return true
        } else if (fk && _fk && faker[fk][_fk] && typeof faker[fk][_fk] === 'function') {
            fakers[`${fk}_${_fk}`] = faker[fk][_fk]()
            return true
        } else if (fk && faker[fk] && typeof faker[fk] === 'function') {
            fakers[`${fk}`] = faker[fk]()
            return true
        }
    }

    for (let fk in faker) {
        if (fn(faker, fk)) continue
        for (let _fk in faker[fk]) {
            if (fn(faker, fk, _fk)) continue
            for (let __fk in faker[fk][_fk]) {
                if (fn(faker, fk, _fk, __fk)) continue
            }
        }
    }
    return fakers
}

const mock = () => {
    return {
        GET_LIST(reference, args, cb) {
            console.log(
                `GET_LIST /${reference}?${JSON.stringify(args, null, '\t')}`
            )
            return setTimeout(() => {
                cb(randomError(), {
                    total: 2000,
                    data: Array.apply(null, {
                        length: args.rowsPerPage
                    }).map(_ => ({
                        id: Math.round(Math.random() * 200000),
                        ...getDataFaker()
                    }))
                })
            }, 1000 * 1)

        },
        GET_ONE(reference, args, cb) {
            console.log(
                `GET_ONE /${reference}?${JSON.stringify(args, null, '\t')}`
            )
            return setTimeout(() => {
                cb(randomError(), {
                    id: Math.round(Math.random() * 200000),
                        ...getDataFaker()
                })
            }, 1000 * 1)
        },
        CREATE(reference, args, cb) {
            console.log(
                `CREATE /${reference}?${JSON.stringify(args, null, '\t')}`
            )

            return setTimeout(() => {
                cb(randomError(), {
                    id: Math.round(Math.random() * 200000),
                        ...getDataFaker()
                })
            }, 1000 * 1)
        },
        UPDATE(reference, args, cb) {
            console.log(
                `UPDATE /${reference}?${JSON.stringify(args, null, '\t')}`
            )

            return setTimeout(() => {
                cb(randomError(), {
                    id: Math.round(Math.random() * 200000),
                        ...getDataFaker()
                })
            }, 1000 * 1)
        },
        DELETE(reference, args, cb) {
            console.log(
                `DELETE /${reference}?${JSON.stringify(args, null, '\t')}`
            )

            return setTimeout(() => {
                cb(randomError(), {
                    id: Math.round(Math.random() * 200000),
                        ...getDataFaker()
                })
            }, 1000 * 1)
        }
    }
}

export default {
    mock
}
