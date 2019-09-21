module.exports = function(QTTacNhan) {
    const Promise = require('bluebird')

    QTTacNhan.createTacNhan = async function(uid, ma, ten, sysCapHanhChinhId, ghiChu){
        const tacNhanData = {
            uid: uid,
            ma: ma,
            ten: ten,
            sysCapHanhChinhId: sysCapHanhChinhId,
            ghiChu: ghiChu,
            hieuLuc: 1,
            xoa: 0
        }
        try {
            const data = await QTTacNhan.create(tacNhanData)
            return data
        } catch (err) {
            console.log('createQTTacNhan', err)
            throw err
        }
    }

    QTTacNhan.updateTacNhan = async function(id, ma, ten, sysCapHanhChinhId, ghiChu, hieuLuc){
        try {
            const tacNhan = await QTTacNhan.findById(id)
            if (tacNhan.xoa == 1){
                return null
            }
            const tacNhanData = {
                id: id,
                ma: ma,
                ten: ten,
                ghiChu: ghiChu,
                sysCapHanhChinhId: sysCapHanhChinhId,
                hieuLuc: hieuLuc
            }
            try {
                const data = await QTTacNhan.upsertWithWhere({id: TacNhanData.id}, tacNhanData)
                return data
            } catch (err) {
                console.log('updateQTTacNhan', err)
                throw err
            }
        } catch (err) {
            console.log('findTacNhan', err)
            throw err
        }
    }

    QTTacNhan.deleteTacNhan = async function(id){
        try {
            const data = await QTTacNhan.upsertWithWhere({id: id},{ xoa: true })
            return data
        } catch (err) {
            console.log('deleteQTTacNhan', err)
            throw err
        }
    }
    
    QTTacNhan.restoreTacNhan = async function(id){
        try {
            const data = await QTTacNhan.upsertWithWhere({id: id}, { xoa: false })
            return data
        } catch (err) {
            console.log('restoreQTTacNhan', err)
            throw err
        }
    }

    QTTacNhan.readTacNhan = async function(id){
        try {
            const data = await QTTacNhan.findById(id, {where: {xoa: false}})
            return data
        } catch (err) {
            console.log('readQTTacNhan', err)
            throw err
        }
    }

    QTTacNhan.listTacNhan = async function(queryData, page, pageSize){
        try {
            const [data, total] = await Promise.all([
              QTTacNhan.find({
                where: {xoa: 0},
                fields: {ma: true, ten: true, ghiChu: true, sysCapHanhChinhId: true, hieuLuc: true},
                include: ['SysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QTTacNhan.count({xoa: false})
            ])
            return {
              rows: data,
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listQTTacNhan', err)
            throw err
        }
    }

    QTTacNhan.listDeletedTacNhan = async function(queryData, page, pageSize){
        try {
            const [data, total] = await Promise.all([
              QTTacNhan.find({
                where: {xoa: 1},
                fields: {ma: true, ten: true, ghiChu: true, sysCapHanhChinhId: true, hieuLuc: true},
                include: ['SysCapHanhChinh'],
                limit: pageSize,
                skip: page
              }),
              QTTacNhan.count({xoa: true})
            ])
            return {
              rows: data,
              page: page,
              pageSize: pageSize,
              total: total
            }
        } catch (err) {
            console.log('listDeletedQTTacNhan', err)
            throw err
        }
    }

    QTTacNhan.remoteMethod(
        'createTacNhan', {
            http: {path: '/create', verb: 'post'},
            accepts: [
                {arg: 'uid', type: 'string', required: true},
                {arg: 'ma', type: 'string', required: true},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'sysCapHanhChinhId', type: 'number', required: false},
                {arg: 'ghiChu', type: 'string', required: false}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTTacNhan.remoteMethod(
        'updateTacNhan', {
            http: {path: '/update', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true},
                {arg: 'ma', type: 'string', required: false},
                {arg: 'ten', type: 'string', required: false},
                {arg: 'sysCapHanhChinhId', type: 'number', required: false},
                {arg: 'ghiChu', type: 'string', required: false},
                {arg: 'hieuLuc', type: 'number', required: false}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTTacNhan.remoteMethod(
        'deleteTacNhan', {
            http: {path: '/delete', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTTacNhan.remoteMethod(
        'restoreTacNhan', {
            http: {path: '/restore', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTTacNhan.remoteMethod(
        'readTacNhan', {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTTacNhan.remoteMethod(
        'listTacNhan', {
            http: {path: '/list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object', required: false},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )

    QTTacNhan.remoteMethod(
        'listDeletedTacNhan', {
            http: {path: '/deleted_list', verb: 'post'},
            accepts: [
                {arg: 'queryData', type: 'object', required: false},
                {arg: 'page', type: 'number', default: '0'},
                {arg: 'pageSize', type: 'number', default: '20'}
            ],
            returns: {arg: 'data', type: 'object'},
        },
    )
}