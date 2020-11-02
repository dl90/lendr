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
   * @api {post} /item/get-multi             Get all items that belongs to user with status from db
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
   * @api {post} /item/create               Create item and store in db
   * @apiName PostCreateItem
   * @apiGroup Item
   *
   * @apiParam {string} itemName            Item name
   * @apiParam {string} itemCondition       Item condition
   * @apiParam {number} itemAge             Item age (months)
   *
   * @apiSuccess (200) {json}               Item ID
   * @apiError (400) {}                     Incorrect params or create failed
   */
  router.post('/create', async (req, res) => {
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
   * @apiSuccess (200) {}                   Success
   * @apiError (400) {}                     Incorrect itemID or delete failed
   */
  router.delete('/delete', async (req, res) => {
    await ItemController.deleteItem(req.body.itemID)
      ? res.sendStatus(200)
      : res.sendStatus(400)
  })

  return router
}
