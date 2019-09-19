let to = require('await-to-js').to;
'use_strict';

module.exports = function(QTTacNhanChucNangPhanMem) {
  const Promise = require('bluebird')
	  //create Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhanChucNangPhanMem.createQTTacNhanChucNangPhanMem = async function(uid, ma, ten,
      qtTacNhanId, qtChucNangPhanMemId, ghiChu
        ) {
        const qtTNCNPMdata = {
            uid: uid,
            ma: ma,
            ten: ten,
            qtTacNhanId: qtTacNhanId,
            qtChucNangPhanMemId: qtChucNangPhanMemId,
            createdAt: new Date(),
            ghiChu:ghiChu
        }
        try {
            const data = await QTTacNhanChucNangPhanMem.create(qtTNCNPMdata)
            return data
          } catch (err) {
            console.log('create QT_tac-nhan_chuc-nang-phan-mem', err)
            throw err
          }
    }

    //read Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhanChucNangPhanMem.readQTTacNhanChucNangPhanMem = async function(id) {
    	try {
            const data = await QTTacNhanChucNangPhanMem.findById(id, {
                where: {
                xoa: 0
                }
            });
            return data;
        } catch (err) {
            console.log('read QT_tac-nhan_chuc-nang-phan-mem', err)
            throw err
        }
    }

    //update Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhanChucNangPhanMem.updateQTTacNhanChucNangPhanMem = async function(id, ma, ten,
      qtTacNhanId, qtChucNangPhanMemId, ghiChu, hieuLuc) {

        const qtTacNhanChucNangPhanMemData = {
            id: id,
            ma: ma,
            ten: ten,
            qtTacNhanId: qtTacNhanId,
            qtChucNangPhanMemId: qtChucNangPhanMemId,
            ghiChu:ghiChu,
            updatedAt: new Date(),
            hieuLuc: hieuLuc
        }
        try {
            const data = await QTTacNhanChucNangPhanMem.upsertWithWhere(
              {
                id: QTTacNhanChucNangPhanMem.id
              },
              qtTacNhanChucNangPhanMemData
            )
            return data
          } catch (err) {
            console.log('update QT_tac-nhan_chuc-nang-phan-mem', err)
            throw err
          }
    }

    //delete Quan Tri Tac Nhan Chuc Nang Phan Mem --- change xoa 0 -> 1 
    QTTacNhanChucNangPhanMem.deleteQTTacNhanChucNangPhanMem = async function(id) {
    	try {
            const data = await QTTacNhanChucNangPhanMem.upsertWithWhere(
              {
                id: id
              },
              { xoa: 1 }
            )
            return data
          } catch (err) {
            console.log('delete QT_tac-nhan_chuc-nang-phan-mem', err)
            throw err
          }
    }

    //restore Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhanChucNangPhanMem.restoreQTTacNhanChucNangPhanMem = async function(id) {
        try {
            const data = await QTTacNhanChucNangPhanMem.upsertWithWhere(
              {
                id: id
              },
              { xoa: 0 }
            )
            return data
          } catch (err) {
            console.log('restore QT_tac-nhan_chuc-nang-phan-mem', err)
            throw err
          }
    }

    //list Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhanChucNangPhanMem.listQTTacNhanChucNangPhanMem = async function(page, pageSize) {
        try {
          const [data, total] = await Promise.all([
            QTTacNhanChucNangPhanMem.find({
              where: {
                xoa: 0
              },
              fields: {
                ten: true,
                noidung: true
              }
            }),
            QTTacNhanChucNangPhanMem.count({
              xoa: 0
            })
          ])
    
          return {
            rows: data,
            page: page,
            pageSize: pageSize,
            total: total
          }
        } catch (err) {
          console.log('list QT_tac-nhan_chuc-nang-phan-mem', err)
          throw err
        }
    }

    //list deleted Quan Tri Tac Nhan Chuc Nang Phan Mem
    QTTacNhanChucNangPhanMem.listdeletedQTTacNhanChucNangPhanMem = async function(page, pageSize) {
      try {
        const [data, total] = await Promise.all([
          QTTacNhanChucNangPhanMem.find({
            where: {
              xoa: 1
            },
            fields: {
              ten: true,
              noidung: true
            }
          }),
          QTTacNhanChucNangPhanMem.count({
            xoa: 1
          })
        ])
  
        return {
          rows: data,
          page: page,
          pageSize: pageSize,
          total: total
        }
      } catch (err) {
        console.log('list deleted QT_tac-nhan_chuc-nang-phan-mem', err)
        throw err
      }
    }

    QTTacNhanChucNangPhanMem.remoteMethod('createQTTacNhanChucNangPhanMem', 
      {
        http: {path: '/create', verb: 'post'},
        accepts: [
            {arg: 'uid', type: 'string', required: true},
            {arg: 'ma', type: 'string', required: true},
            {arg: 'ten', type: 'string'},
            {arg: 'qtTacNhanId', type: 'number'},
            {arg: 'qtChucNangPhanMemId', type: 'number'},
            {arg: 'ghiChu', type: 'string'}
        ],
        returns: { arg: 'data' },
      },
    )

    QTTacNhanChucNangPhanMem.remoteMethod('readQTTacNhanChucNangPhanMem', 
      {
            http: {path: '/read', verb: 'post'},
            accepts: [
                {arg: 'id', type: 'number', required: true}
            ],
            returns: { arg: 'data' },
      },
    )

    QTTacNhanChucNangPhanMem.remoteMethod('updateQTTacNhanChucNangPhanMem', 
      {
        http: {path: '/update', verb: 'post'},
        accepts: [
          {arg: 'id', type: 'number', required: true},
          {arg: 'ma', type: 'string', required: true},
          {arg: 'ten', type: 'string'},
          {arg: 'qtTacNhanId', type: 'number'},
          {arg: 'qtChucNangPhanMemId', type: 'number'},
          {arg: 'ghiChu', type: 'string'},
          {arg: 'hieuLuc', type: 'boolean'}
      ],
        returns: { arg: 'data' },
      },
    )

    QTTacNhanChucNangPhanMem.remoteMethod('deleteQTTacNhanChucNangPhanMem', 
      {
        http: {path: '/delete', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        returns: { arg: 'data' },
      },
    )

    QTTacNhanChucNangPhanMem.remoteMethod('restoreQTTacNhanChucNangPhanMem', 
      {
        http: {path: '/restore', verb: 'post'},
        accepts: [
            {arg: 'id', type: 'number', required: true}
        ],
        returns: { arg: 'data' },
      }
    )
    
    QTTacNhanChucNangPhanMem.remoteMethod('listQTTacNhanChucNangPhanMem',
      {
        http: { verb: 'post', path: '/list' },
        accepts: [
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' },
      }
    )

    QTTacNhanChucNangPhanMem.remoteMethod('listdeletedQTTacNhanChucNangPhanMem',
      {
        http: { verb: 'post', path: '/deleted_list' },
        accepts: [
          { arg: 'page', type: 'number', default: '0'},
          { arg: 'pageSize', type: 'number', default: '20'}],
        returns: { arg: 'data' },
      }
    )
};