let customCRUD = require('../../../utils/custom-crud')
let app = require('../../../../server/server')

'use_strict';

module.exports = function (ThisModel) {
  //create Bieu Nhap Lieu Chi Tieu
  ThisModel.customCreate = async function (uid, ma, ten, qtDonViId, qtTinhId, qcHuyenId,qcXaId, tatCaNutCon, ghiChu) {
        const queryData = {
            uid: uid,
            ma: ma,
            ten: ten,
            qtDonViId: qtDonViId,
            qtTinhId: qtTinhId,
            qcHuyenId: qcHuyenId,
            qcXaId: qcXaId,
            tatCaNutCon: tatCaNutCon,
            ghiChu: ghiChu,
            updatedAt: new Date(),
            updatedBy: 0
          }
          return await customCRUD.create(ThisModel, queryData)
  }

  //list Bieu Nhap Lieu Chi Tieu
  ThisModel.customList = async function (queryData, page, pageSize) {
    return await customCRUD.list(ThisModel, queryData, page, pageSize)
  }

  //list deleted Bieu Nhap Lieu Chi Tieu
  ThisModel.customListDeleted = async function (queryData, page, pageSize) {
    return await customCRUD.listDeleted(ThisModel, queryData, page, pageSize)
  }

  //read Bieu Nhap Lieu Chi Tieu
  ThisModel.customRead = async function (id) {
    return await customCRUD.read(ThisModel, id)
  }

  //update Bieu Nhap Lieu Chi Tieu
  ThisModel.customUpdate = async function (id, ma, ten, qtDonViId, qtTinhId, qcHuyenId, qcXaId, tatCaNutCon, ghiChu, hieuLuc) {
        const queryData = {
            id: id,
            ma: ma,
            ten: ten,
            qtDonViId: qtDonViId,
            qtTinhId: qtTinhId,
            qcHuyenId: qcHuyenId,
            qcXaId: qcXaId,
            tatCaNutCon: tatCaNutCon,
            ghiChu: ghiChu,
            hieuLuc: hieuLuc,
            updatedAt: new Date(),
            updatedBy: 0
          }
          return await customCRUD.update(ThisModel, queryData)
  }

  //delete Bieu Nhap Lieu Chi Tieu 
  ThisModel.customDelete = async function (id) {
    return await customCRUD.delete(ThisModel, id)
  }

  // Restore Bieu Nhap Lieu Chi Tieu
  ThisModel.customRestore = async function (id) {
    return await customCRUD.restore(ThisModel, id)
  }

  //
  ThisModel.checkList = async function(qtDonViId){
    let queryData = {
      modelReferenedId: qtDonViId,
      referenedModel1: "qtDonViId",
      referenedModel2: "qtTinhId"
    }
    return await customCRUD.checkList(ThisModel, queryData)
  }

  ThisModel.newUpdate = async function(queryData){
    return await customCRUD.updateByList(ThisModel, queryData)
  }

  ThisModel.remoteMethod('customCreate',
    {
      http: { path: '/create', verb: 'post' },
      accepts: [
        { arg: 'uid', type: 'string', required: true },
        { arg: 'ma', type: 'string', required: true },
        { arg: 'ten', type: 'string' },
        { arg: 'qtDonViId', type: 'number' },
        { arg: 'qtTinhId', type: 'number' },
        { arg: 'qcHuyenId', type: 'number' },
        { arg: 'qcXaId', type: 'number' },
        { arg: 'tatCaNutCon', type: 'boolean' },
        { arg: 'ghiChu', type: 'string' }
      ],
      returns: {arg: 'data', type: 'object', root: true}
    }
  )

  ThisModel.remoteMethod('customList',
    {
      http: { verb: 'post', path: '/list' },
      accepts: [
        { arg: 'queryData', type: 'object' },
        { arg: 'page', type: 'number'},
        { arg: 'pageSize', type: 'number'}],
      returns: {arg: 'data', type: 'object', root: true}
    })

    ThisModel.remoteMethod('customListDeleted',
    {
      http: { verb: 'post', path: '/list_deleted' },
      accepts: [
        { arg: 'queryData', type: 'object' },
        { arg: 'page', type: 'number'},
        { arg: 'pageSize', type: 'number'}],
      returns: {arg: 'data', type: 'object', root: true}
    })

  ThisModel.remoteMethod('customRead',
    {
      http: { path: '/read', verb: 'post' },
      accepts: [
        { arg: 'id', type: 'number', required: true }],
      returns: {arg: 'data', type: 'object', root: true}
    },
  )

  ThisModel.remoteMethod('customUpdate',
    {
      http: { path: '/update', verb: 'post' },
      accepts: [
        { arg: 'id', type: 'number', required: true },
        { arg: 'ma', type: 'string' },
        { arg: 'ten', type: 'string' },
        { arg: 'qtDonViId', type: 'number' },
        { arg: 'qtTinhId', type: 'number' },
        { arg: 'qcHuyenId', type: 'string' },
        { arg: 'qcXaId', type: 'number' },
        { arg: 'tatCaNutCon', type: 'boolean' },
        { arg: 'ghiChu', type: 'number' },
        { arg: 'hieuLuc', type: 'boolean' }
      ],
      returns: {arg: 'data', type: 'object', root: true}
    },
  )

  ThisModel.remoteMethod('customDelete',
    {
      http: { path: '/delete', verb: 'post' },
      accepts: [
        { arg: 'id', type: ['number'], required: true }
      ],
      returns: {arg: 'data', type: 'object', root: true}
    },
  )

  ThisModel.remoteMethod('customRestore',
    {
      http: { path: '/restore', verb: 'post' },
      accepts: [
        { arg: 'id', type: ['number'], required: true }
      ],
      returns: {arg: 'data', type: 'object', root: true}
    },
  )

  ThisModel.remoteMethod('checkList',
    {
      http: { path: '/checkList', verb: 'post' },
      accepts: { arg: 'qtDonViId', type: 'number', required: true },
      returns: {arg: 'data', type: 'object', root: true}
    }
  )

  ThisModel.remoteMethod('newUpdate',
    {
      http: { path: '/newUpdate', verb: 'post' },
      accepts: { arg: 'queryData', type: ['object']},
      returns: {arg: 'data', type: 'object', root: true}
    }
  )
};