import express from 'express'
import ItemController from '../controller/ItemController.js'
import authCheck from '../middleware/authCheck.js'

const router = express.Router()
router.use(authCheck)

export default function () {
  /**
   * @api {post} /item/get                  Get item from db
   * @apiName GetItem
   * @apiGroup Item
   *
   * @apiParam {number} itemID              Item ID
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
   * @api {get} /item/get-multi             Get all items that belongs to user from db
   * @apiName GetItems
   * @apiGroup Item
   *
   * @apiSuccess (200) {json}               [Items]
   * @apiError (400) {}                     Get failed
   */
  router.get('/get-multi', async (req, res) => {
    const items = await ItemController.getItemsByUserID(req.user.id)
    items
      ? res.json(items)
      : res.sendStatus(400)
  })

  /**
   * @api {post} /item/get-multi            Get all items that belongs to user with status from db
   * @apiName GetItems
   * @apiGroup Item
   *
   * @apiParam {0|1} itemStatus             Item Status
   *
   * @apiSuccess (200) {json}               [Items]
   * @apiError (400) {}                     Get failed
   */
  router.post('/get-multi', async (req, res) => {
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
   * @apiParam {string} itemName            Item name
   * @apiParam {string} itemCondition       Item condition
   * @apiParam {number} itemAge             Item age (months)
   *
   * @apiSuccess (200) {json}               Item ID
   * @apiError (400) {}                     Incorrect params or create failed
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
   * @apiParam {number} itemID              Item ID
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect itemID or delete failed
   */
  router.delete('/delete', async (req, res) => {
    await ItemController.deleteItem(req.body.itemID)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /item/name                Update item name in db
   * @apiName PatchItemName
   * @apiGroup Item
   *
   * @apiParam {number} itemID              Item ID
   * @apiParam {number} itemName            Item name
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect itemID or update failed
   */
  router.patch('/name', async (req, res) => {
    await ItemController.updateItemName(req.body.itemID, req.body.itemName)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /item/condition           Update item condition in db
   * @apiName PatchItemCondition
   * @apiGroup Item
   *
   * @apiParam {number} itemID              Item ID
   * @apiParam {number} itemCondition       Item condition
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect itemID or update failed
   */
  router.patch('/condition', async (req, res) => {
    await ItemController.updateItemCondition(req.body.itemID, req.body.itemCondition)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /item/age                 Update item age in db
   * @apiName PatchItemAge
   * @apiGroup Item
   *
   * @apiParam {number} itemID              Item ID
   * @apiParam {number} itemAge             Item age
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect itemID or update failed
   */
  router.patch('/age', async (req, res) => {
    await ItemController.updateItemAge(req.body.itemID, req.body.itemAge)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /item/status              Update item status in db
   * @apiName PatchItemStatus
   * @apiGroup Item
   *
   * @apiParam {number} itemID              Item ID
   * @apiParam {number} itemStatus          Item status
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect itemID or update failed
   */
  router.patch('/status', async (req, res) => {
    await ItemController.updateItemStatus(req.body.itemID, req.body.itemStatus)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  /**
   * @api {patch} /item/update-all          Update all item fields in db
   * @apiName PatchItemUpdateAll
   * @apiGroup Item
   *
   * @apiParam {number} itemID              Item ID
   * @apiParam {string} itemName            Item name
   * @apiParam {string} itemCondition       Item condition
   * @apiParam {number} itemAge             Item age
   * @apiParam {number} itemStatus          Item status
   *
   * @apiSuccess (204) {}                   Success
   * @apiError (400) {}                     Incorrect itemID or update failed
   */
  router.patch('/update-all', async (req, res) => {
    const { itemID, itemName, itemCondition, itemAge, itemStatus } = req.body
    await ItemController.updateAllItemFields(itemID, itemName, itemCondition, itemAge, itemStatus)
      ? res.sendStatus(204)
      : res.sendStatus(400)
  })

  return router
}
