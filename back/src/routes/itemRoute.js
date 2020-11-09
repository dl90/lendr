import express from 'express'
import ItemController from '../controller/ItemController.js'
import authCheck from '../middleware/authCheck.js'

const router = express.Router()
router.use(authCheck)

export default function () {
  /**
   * @api {post} /item/get                  Get item
   * @apiName GetItem
   * @apiGroup Item
   *
   * @apiParam {number} itemID
   *
   * @apiSuccess (200) {json}               Item
   * @apiError (400) {}                     Incorrect itemID or get failed
   */
  router.post('/get', async (req, res) => {
    const item = await ItemController.getItemByItemID(req.body.itemID)
    item
      ? res.json(item)
      : res.sendStatus(400)
  })

  /**
   * @api {get} /item/get                   Get all items that belongs to user
   * @apiName GetItems
   * @apiGroup Item
   *
   * @apiSuccess (200) {json}               [Items]
   * @apiError (400) {}                     Get failed
   */
  router.get('/get', async (req, res) => {
    const items = await ItemController.getItemsByUserID(req.user.id)
    items
      ? res.json(items)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /item/get-status           Get all items that belongs to user with status
   * @apiName GetItems
   * @apiGroup Item
   *
   * @apiParam {0|1} itemStatus
   *
   * @apiSuccess (200) {json}               [Items]
   * @apiError (400) {}                     Get failed
   */
  router.post('/get-status', async (req, res) => {
    const items = await ItemController.getItemsByUserIDWithStatus(req.user.id, req.body.itemStatus)
    items
      ? res.json(items)
      : res.sendStatus(400)
  })

  /**
   * @api {put} /item/create                Create item and store in db
   * @apiName PutCreateItem
   * @apiGroup Item
   *
   * @apiParam {string} itemName
   * @apiParam {string} itemCondition
   * @apiParam {number} itemAge (months)
   *
   * @apiSuccess (200) {json}               Item ID
   * @apiError (400) {}                     Incorrect params || create failed
   */
  router.put('/create', async (req, res) => {
    const { itemName, itemCondition, itemAge } = req.body
    const itemID = await ItemController.createItem(req.user.id, itemName, itemCondition, itemAge)
    itemID
      ? res.json({ itemID })
      : res.sendStatus(400)
  })

  /**
   * @api {delete} /item/delete             Delete item from db
   * @apiName DeleteItem
   * @apiGroup Item
   *
   * @apiParam {number} itemID
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || delete failed
   */
  router.delete('/delete', async (req, res) => {
    await ItemController.deleteItem(req.user.id, req.body.itemID)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /item/name                Update item name in db
   * @apiName PatchItemName
   * @apiGroup Item
   *
   * @apiParam {number} itemID
   * @apiParam {number} itemName
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || update failed
   */
  router.patch('/name', async (req, res) => {
    await ItemController.updateItemName(req.user.id, req.body.itemID, req.body.itemName)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /item/condition           Update item condition in db
   * @apiName PatchItemCondition
   * @apiGroup Item
   *
   * @apiParam {number} itemID
   * @apiParam {number} itemCondition
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect params || update failed
   */
  router.patch('/condition', async (req, res) => {
    await ItemController.updateItemCondition(req.user.id, req.body.itemID, req.body.itemCondition)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /item/age                 Update item age in db
   * @apiName PatchItemAge
   * @apiGroup Item
   *
   * @apiParam {number} itemID
   * @apiParam {number} itemAge
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect itemID or update failed
   */
  router.patch('/age', async (req, res) => {
    await ItemController.updateItemAge(req.user.id, req.body.itemID, req.body.itemAge)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /item/status              Update item status in db
   * @apiName PatchItemStatus
   * @apiGroup Item
   *
   * @apiParam {number} itemID
   * @apiParam {string} itemStatus
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect itemID or update failed
   */
  router.patch('/status', async (req, res) => {
    await ItemController.updateItemStatus(req.user.id, req.body.itemID, req.body.itemStatus)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /item/update-all          Update all item fields in db
   * @apiName PatchItemUpdateAll
   * @apiGroup Item
   *
   * @apiParam {number} itemID
   * @apiParam {string} itemName
   * @apiParam {string} itemCondition
   * @apiParam {number} itemAge (months)
   * @apiParam {number} itemStatus
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect itemID or update failed
   */
  router.patch('/update-all', async (req, res) => {
    const { itemID, itemName, itemCondition, itemAge, itemStatus } = req.body
    await ItemController.updateAllItemFields(req.user.id, itemID, itemName, itemCondition, itemAge, itemStatus)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  return router
}
